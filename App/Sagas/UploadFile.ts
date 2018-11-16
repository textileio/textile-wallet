import { call, put, select } from 'redux-saga/effects'
// @ts-ignore
import Upload from 'react-native-background-upload'
import Config from 'react-native-config'

import { bestCafeSession } from '../Services/CafeSessions'
import { CafeSession } from '../NativeModules/Textile'

export function * uploadFile (id: string, payloadPath: string) {
  const session: CafeSession | undefined = yield call(bestCafeSession)
  if (!session) {
    throw new Error('unable to get CafeSession')
  }
  yield call(
    Upload.startUpload,
    {
      customUploadId: id,
      path: payloadPath,
      url: session.http_addr + Config.RN_TEXTILE_CAFE_PIN_PATH, // TODO: Not sure about the formatting of http_addr
      method: 'POST',
      type: 'raw',
      headers: {
        'Authorization': `Bearer ${session.access}`,
        'Content-Type': 'application/gzip'
      }
    }
  )
}
