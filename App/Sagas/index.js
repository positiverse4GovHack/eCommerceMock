import { takeLatest } from 'redux-saga'
/**
 * Author: Bartłomiej Klinger <bartlomiej.klinger@positiverse.com>
 */

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { requestConsent } from './ConsentRequestSaga'

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(RegisterTypes.REGISTER_CONSENTS_REQUEST, requestConsent),
  ]
}
