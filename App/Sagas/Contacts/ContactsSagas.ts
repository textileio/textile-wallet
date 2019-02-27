import {
  call,
  put,
  take,
  takeLatest,
  takeEvery,
  cancelled,
  all,
  race,
  select
} from 'redux-saga/effects'
import { delay, eventChannel, END, Channel } from 'redux-saga'
import { ActionType, getType } from 'typesafe-actions'
import { Platform, PermissionsAndroid } from 'react-native'
import Contacts from 'react-native-contacts'
import Textile, {
  ContactInfo,
  ContactSearchEvent,
  pb,
  util
} from '@textile/react-native-sdk'
import Config from 'react-native-config'

import ContactsActions from '../../Redux/ContactsRedux'
import { getPeerId, getUsername } from '../../Redux/AccountSelectors'
import { composeMessage } from '../../NativeModules/MessageComposer'

export function * addFriends() {
  yield call(refreshContacts)
}

export function * refreshContacts() {
  try {
    const contactsResult: ReadonlyArray<ContactInfo> = yield call(Textile.contacts)
    yield put(ContactsActions.getContactsSuccess(contactsResult))

  } catch (error) {
    // skip for now
  }
}

export function * watchForAddContactRequests() {
  yield takeEvery(getType(ContactsActions.addContactRequest), handleAddContactRequest)
}

function * handleAddContactRequest(action: ActionType<typeof ContactsActions.addContactRequest>) {
  const { contact } = action.payload
  try {
    const contactInfo: ContactInfo = {
      id: contact.id,
      avatar: contact.avatar,
      address: contact.address,
      username: contact.username,
      inboxes: contact.inboxes,
      created: util.timestampToDate(contact.created).toISOString(),
      updated: util.timestampToDate(contact.updated).toISOString()
    }
    yield call(Textile.addContact, contactInfo)
    yield put(ContactsActions.addContactSuccess(contact))
    yield call(refreshContacts)
  } catch (error) {
    yield put(ContactsActions.addContactError(contact, error))
  }
}

function executeTextileSearch(searchString: string) {
  return eventChannel<ContactSearchEvent>((emitter) => {
    const query: pb.IContactQuery = {
      username: searchString,
      id: '',
      address: ''
    }
    const options: pb.IQueryOptions = {
      local: false,
      limit: 20,
      wait: 8,
      filter: pb.QueryOptions.FilterType.NO_FILTER,
      exclude: []
    }
    const handler = (event: ContactSearchEvent) => {
      if (event.type === 'complete') {
        emitter(END)
      } else if (event.type === 'error') {
        emitter(event)
        emitter(END)
      } else if (event.type === 'result') {
        emitter(event)
      }
    }
    Textile.searchContacts(query, options, handler)
    return () => {
      Textile.cancelSearchContacts()
    }
  })
}

function * searchTextile(searchString: string) {
  const channel: Channel<ContactSearchEvent> = yield call(executeTextileSearch, searchString)
  try {
    while (true) {
      const event: ContactSearchEvent = yield take(channel)
      if (event.type === 'result') {
        yield put(ContactsActions.searchResultTextile(event.contact))
      } else if (event.type === 'error') {
        yield put(ContactsActions.searchErrorTextile(event.error))
      }
    }
  } catch (error) {
    yield put(ContactsActions.searchErrorTextile(error))
  } finally {
    if (yield cancelled()) {
      channel.close()
    } else {
      yield put(ContactsActions.textileSearchComplete())
    }
  }
}

function * searchAddressBook(searchString: string) {
  try {
    const permissions = Platform.OS === 'ios' ? requestPermissionsIOS : requestPermissionsAndroid
    const result: 'undefined' | 'authorized' | 'denied' = yield call(permissions)
    if (result !== 'authorized') {
      return
    }
    const contacts: Contacts.Contact[] = yield call(getContactsMatching, searchString)
    const isCancelled = yield cancelled()
    if (!isCancelled) {
      yield put(ContactsActions.searchResultsAddressBook(contacts))
    }
  } catch (error) {
    yield put(ContactsActions.searchErrorAddressBook(error))
  }
}

function * executeSearchRequest(searchString: string) {
  yield put(ContactsActions.searchStarted())
  yield race({
    search: all([call(searchTextile, searchString), call(searchAddressBook, searchString)]),
    cancel: take(getType(ContactsActions.clearSearch))
  })
}

function * handleSearchRequest(action: ActionType<typeof ContactsActions.searchRequest>) {
  // debounce it, but cancel if we clear search
  const { debounce } = yield race({
    debounce: call(delay, 1000),
    cancel: take(getType(ContactsActions.clearSearch))
  })
  if (debounce) {
    yield call(executeSearchRequest, action.payload.searchString)
  }
}

export function * watchForSearchRequest() {
  yield takeLatest(getType(ContactsActions.searchRequest), handleSearchRequest)
}

export function * sendInviteMessage() {
  while (true) {
    const action: ActionType<typeof ContactsActions.authorInviteRequest> = yield take(getType(ContactsActions.authorInviteRequest))
    const { phoneNumbers } = action.payload.contact
    const iphone = phoneNumbers.find((number) => number.label.toLowerCase() === 'iphone')
    const mobile = phoneNumbers.find((number) => number.label.toLowerCase() === 'mobile')
    const home = phoneNumbers.find((number) => number.label.toLowerCase() === 'home')
    const work = phoneNumbers.find((number) => number.label.toLowerCase() === 'work')
    const sendTo = iphone || mobile || home || work
    if (sendTo) {
      const username: string | undefined = yield select(getUsername)
      const peerId: string | undefined = yield select(getPeerId)
      const url = Platform.OS === 'ios' ? Config.RN_IOS_STORE_LINK : Config.RN_ANDROID_STORE_LINK
      let message = `Join me on Textile Photos: ${url}`
      if (username) {
        message = `${message}\nMy username: ${username}`
      }
      if (peerId) {
        message = `${message}\nMy peer id snippet: ${peerId.substr(peerId.length - 8, 8)}`
      }
      yield call(composeMessage, sendTo.number, message)
    }
  }
}

async function requestPermissionsAndroid() {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    {
      title: 'Contacts',
      message: 'Authorizing access to your contacts makes it easy for you to invite others to Textile. None of you contact data is saved or transmitted in any way.'
    }
  )
  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    return 'authorized'
  } else {
    return 'denied'
  }
}

async function requestPermissionsIOS() {
  return new Promise<'undefined' |  'authorized' | 'denied'>((resolve, reject) => {
    Contacts.checkPermission((err, permission) => {
      if (err) {
        reject(err)
        return
      }
      if (permission === 'undefined') {
        Contacts.requestPermission((err, permission) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(permission)
          }
        })
      } else {
        resolve(permission)
      }
    })
  })
}

async function getContactsMatching(searchString: string) {
  return new Promise<Contacts.Contact[]>((resolve, reject) => {
    Contacts.getContactsMatchingString(searchString, (err, contacts) => {
      if (err) {
        reject(err)
        return
      }
      resolve(contacts)
    })
  })
}
