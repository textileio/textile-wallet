import { combineReducers } from 'redux'
import { AsyncStorage } from 'react-native'
import {
  createMigrate,
  PersistConfig,
  MigrationManifest,
  persistReducer
} from 'redux-persist'

import { accountReducer } from '../features/account'
import { reducer as authReducer } from './AuthRedux'
import { contactsReducer } from '../features/contacts'
import { updatesReducer } from '../features/updates'
import { reducer as groupsReducer } from './GroupsRedux'
import { reducer as preferencesReducer } from './PreferencesRedux'
import { reducer as photoViewingReducer } from './PhotoViewingRedux'
import { reducer as threadsReducer } from './ThreadsRedux'
import { reducer as uiReducer } from './UIRedux'
import { reducer as startupReducer } from './StartupRedux'
import { reducer as deviceLogsReducer } from './DeviceLogsRedux'
import { reducer as textileEventsReducer } from './TextileEventsRedux'
import { groupReducer } from '../features/group'
import { cafesReducer } from '../features/cafes'
import { initializationReducer } from '../features/initialization'

const migrations: MigrationManifest = {
  0: persistedState => {
    const state = persistedState as any
    // Migration to add user preferences with option for verboseUi
    return {
      ...state,
      textile: {
        ...state.textile,
        preferences: {
          verboseUi: false
        },
        camera: {}
      }
    }
  },
  1: persistedState => {
    const state = persistedState as any
    // Migration to add remaining retry attempts to any persisted image data
    const updatedItems = state.textile.images.items.map((item: any) => {
      return { ...item, remainingUploadAttempts: 3 }
    })
    return {
      ...state,
      textile: {
        ...state.textile,
        images: {
          ...state.textile.images,
          items: updatedItems
        }
      }
    }
  },
  2: persistedState => {
    const state = persistedState as any
    const uris =
      state.textile.camera && state.textile.camera.processed
        ? state.textile.camera.processed
        : []
    const processed: { [key: string]: 'complete' } = {}
    for (const uri of uris) {
      processed[uri] = 'complete'
    }
    return {
      ...state,
      textile: {
        ...state.textile,
        camera: { processed }
      }
    }
  },
  3: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      textile: {
        ...state.textile,
        onboarded: false
      }
    }
  },
  4: persistedState => {
    const state = persistedState as any
    // Not migrating devices because we didn't previously have meaningful device data
    return {
      ...state,
      preferences: {
        onboarded: state.textile.onboarded,
        verboseUi: state.textile.preferences.verboseUi
      }
    }
  },
  5: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      cameraRoll: {
        ...state.cameraRoll,
        pendingShares: {}
      }
    }
  },
  6: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        tourScreens: {
          wallet: true
        }
      }
    }
  },
  7: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        tourScreens: {
          ...state.preferences.tourScreens,
          threads: true
        }
      }
    }
  },
  8: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        tourScreens: {
          ...state.preferences.tourScreens,
          feed: true,
          notifications: true,
          threads: true
        },
        services: {
          notifications: {
            status: false
          },
          photoAddedNotification: {
            status: true
          },
          receivedInviteNotification: {
            status: true
          },
          deviceAddedNotification: {
            status: false
          },
          commentAddedNotification: {
            status: false
          },
          likeAddedNotification: {
            status: false
          },
          peerJoinedNotification: {
            status: false
          },
          peerLeftNotification: {
            status: false
          },
          backgroundLocation: {
            status: false
          }
        }
      }
    }
  },
  9: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        storage: {
          autoPinPhotos: {
            status: false
          },
          storeHighRes: {
            status: false
          },
          deleteDeviceCopy: {
            status: false
          },
          enablePhotoBackup: {
            status: false
          },
          enableWalletBackup: {
            status: false
          }
        }
      }
    }
  },
  10: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        tourScreens: {
          ...state.preferences.tourScreens,
          threadView: true
        }
      }
    }
  },
  11: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        tourScreens: {
          ...state.preferences.tourScreens,
          location: true
        }
      }
    }
  },
  12: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        tourScreens: {
          ...state.preferences.tourScreens,
          threadsManager: true
        }
      }
    }
  },
  13: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        viewSettings: {
          selectedWalletTab: 'Photos'
        }
      }
    }
  },
  14: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        onboarded: false
      }
    }
  },
  15: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        services: {
          notifications: {
            status: state.preferences.services.notifications
          },
          backgroundLocation: {
            status: state.preferences.services.backgroundLocation
          },
          INVITE_RECEIVED: {
            status: true
          },
          ACCOUNT_PEER_JOINED: {
            status: true
          },
          PEER_JOINED: {
            status: true
          },
          PEER_LEFT: {
            status: true
          },
          FILES_ADDED: {
            status: true
          },
          COMMENT_ADDED: {
            status: true
          },
          LIKE_ADDED: {
            status: true
          }
        }
      }
    }
  },
  16: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        viewSettings: {
          selectedWalletTab: 'Groups'
        }
      }
    }
  },
  17: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      account: {
        ...state.account,
        initialized: state.preferences.onboarded
      }
    }
  },
  18: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      group: {
        ...state.group,
        addPhoto: state.processingImages.images
      }
    }
  },
  19: persistedState => {
    // Remove migration key from persisted state
    const state = persistedState as any
    const { migration, ...rest } = state
    return rest
  },
  20: persistedState => {
    const state = persistedState as any
    return {
      ...state,
      preferences: {
        ...state.preferences,
        verboseUiOptions: {
          nodeStateOverlay: true,
          nodeStateNotifications: true,
          nodeErrorNotifications: true
        }
      }
    }
  },
  21: persistedState => {
    const state = persistedState as any
    const { cameraRoll, group, uploadingImages, photos, ...rest } = state
    return rest
  },
  22: persistedState => {
    // remove cafeSessions persisted data from account key
    const state = persistedState as any
    const { cafeSessions, ...rest } = state.account
    return { ...state, account: rest }
  },
  23: persistedState => {
    const state = persistedState as any
    const { fileSync, ...rest } = state
    return rest
  },
  24: persistedState => {
    const state = persistedState as any
    const { onboarded, ...restPreferences } = state.preferences
    const { initialized, ...restAccount } = state.account
    return {
      ...state,
      account: restAccount,
      preferences: restPreferences,
      initialization: {
        onboarding: {
          completed: onboarded
        },
        instance: {
          state: 'initialized'
        }
      }
    }
  }
}

const persistConfig: PersistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  version: 24,
  whitelist: [
    'account',
    'preferences',
    'deviceLogs',
    'initialization',
    'groups'
  ],
  migrate: createMigrate(migrations, { debug: false }),
  debug: false
}

const rootReducer = combineReducers({
  auth: authReducer,
  contacts: contactsReducer,
  updates: updatesReducer,
  groups: groupsReducer,
  preferences: preferencesReducer,
  photoViewing: photoViewingReducer,
  threads: threadsReducer,
  ui: uiReducer,
  startup: startupReducer,
  deviceLogs: deviceLogsReducer,
  account: accountReducer,
  textile: textileEventsReducer,
  group: groupReducer,
  cafes: cafesReducer,
  initialization: initializationReducer
})

export default persistReducer(persistConfig, rootReducer)
