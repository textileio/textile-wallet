/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/
import { call, put, select, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import UIActions from '../Redux/UIRedux'
import { ActionType, getType } from 'typesafe-actions'
import Config from 'react-native-config'
import DeepLink from '../Services/DeepLink'
import NavigationService from '../Services/NavigationService'
import { initializationSelectors } from '../features/initialization'
import AuthActions, { AuthSelectors } from '../Redux/AuthRedux'
import StartupActions, { startupSelectors } from '../Redux/StartupRedux'
import { logNewEvent } from './DeviceLogs'
import { cafesActions, cafesSelectors } from '../features/cafes'
import { NavigationActions } from 'react-navigation'
import { Cafe } from '@textile/js-types'
import { RootState } from '../Redux/Types'
import { showPrompt } from '../features/cafes/sagas'

export function* inviteAfterOnboard() {
  const invite = yield select(AuthSelectors.invite)
  if (invite) {
    // ensures this is the last of the knock-on effects of onboarding
    yield call(delay, 250)
    NavigationService.navigate('ThreadInvite', {
      ...DeepLink.getParams(invite.hash)
    })
  }
}

export function* routeThreadInvite(url: string, hash: string) {
  const reduxStarted: boolean = yield select(startupSelectors.started)
  if (!reduxStarted) {
    yield take(getType(StartupActions.startup))
  }
  // TODO: Tie this code to the new onboarding flow
  /* if (yield select(initializationSelectors.onboarded)) {
    NavigationService.navigate('ThreadInvite', { ...DeepLink.getParams(hash) })
  } else {
    // simply store the pending invite information to act on after onboarding success
    const data = DeepLink.getParams(hash)
    const code: string = data.referral as string
    const referral =
      code.toLowerCase() === Config.RN_TEMPORARY_REFERRAL.toLowerCase()
        ? code
        : undefined
    yield put(AuthActions.onboardWithInviteRequest(url, hash, referral))
  }*/
}

export function* routeCafeInvite(url: string, hash: string) {
  const reduxStarted: boolean = yield select(startupSelectors.started)
  if (!reduxStarted) {
    yield take(getType(StartupActions.startup))
  }
  // if (yield select(PreferencesSelectors.onboarded)) {
  const params = DeepLink.getParams(hash)
  if (params.token && params.url && params.peerId) {
    const cafes: Cafe[] = yield select((state: RootState) =>
      cafesSelectors.registeredCafes(state.cafes)
    )
    if (
      cafes.find(cafe => cafe.peer === params.peerId || cafe.url === params.url)
    ) {
      // no registration needed, silent ignore
      return
    }
    try {
      yield call(NavigationService.navigate, 'Cafes')
      yield call(
        showPrompt,
        'Storage Bot Invite',
        'If you continue, you will send encrypted copies of your groups to this service. Be sure the bot is run by someone you trust. If you already have a lot of photos, consider joining when connected to WiFi.'
      )
      yield put(
        cafesActions.registerCafe.request({
          url: params.url as string,
          peerId: params.peerId as string,
          token: params.token as string
        })
      )
    } catch (err) {
      // silent pass
    }
  }
  // }
}

export function* routeDeepLink(
  action: ActionType<typeof UIActions.routeDeepLinkRequest>
) {
  const { url } = action.payload
  if (!url) {
    return
  }
  try {
    // convert url scheme to standard url for parsing
    const scheme = Config.RN_URL_SCHEME
    const regexp = new RegExp(scheme + '://(www.)?textile.photos/')
    const standardUrl = url.replace(regexp, 'https://textile.photos/')
    const data = DeepLink.getData(standardUrl)
    if (data) {
      if (data.path === '/invites/device' && data.hash !== '') {
        // start pairing the new device
        // TODO: Something here when we support device pairing again
        // NavigationService.navigate('PairingView', { request: DeepLink.getParams(data.hash) })
      } else if (data.path === '/invites/new' && data.hash !== '') {
        yield call(routeThreadInvite, standardUrl, data.hash)
      } else if (data.path === '/invites/cafe' && data.hash !== '') {
        // allow custom cafe invites
        yield call(routeCafeInvite, standardUrl, data.hash)
      }
    }
  } catch (error) {
    yield call(logNewEvent, 'routeDeepLink', error.message, true)
  }
}
