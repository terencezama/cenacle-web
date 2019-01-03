import { takeLatest, all } from 'redux-saga/effects'

import { loginSaga } from './login/sagas';
import { createShareSaga,deleteShareSaga,listShareSaga,updateShareSaga } from './share/sagas';
import { request, LOGIN, create, SHARE, list, update, remove, NOTIFY, EVENT, SUMMARY, VERSE } from './types';
import { notify } from './notif/sagas';
import { createEventSaga, listEventSaga, updateEventSaga, deleteEventSaga } from './event/sagas';
import { createSummarySaga, updateSummarySaga, deleteSummarySaga, listSummarySaga } from './summary/sagas';
import {listVerseSaga,updateVerseSaga} from './verse/sagas'
export default function * root () {
    yield all([
      // some sagas only receive an action
      takeLatest(request(LOGIN), loginSaga),

      takeLatest(request(create(SHARE)),createShareSaga),
      takeLatest(request(list(SHARE)),listShareSaga),
      takeLatest(request(update(SHARE)),updateShareSaga),
      takeLatest(request(remove(SHARE)),deleteShareSaga),

      takeLatest(request(NOTIFY),notify),

      takeLatest(request(create(EVENT)),createEventSaga),
      takeLatest(request(list(EVENT)),listEventSaga),
      takeLatest(request(update(EVENT)),updateEventSaga),
      takeLatest(request(remove(EVENT)),deleteEventSaga),
      
      takeLatest(request(create(SUMMARY)),createSummarySaga),
      takeLatest(request(list(SUMMARY)),listSummarySaga),
      takeLatest(request(update(SUMMARY)),updateSummarySaga),
      takeLatest(request(remove(SUMMARY)),deleteSummarySaga),

      takeLatest(request(list(VERSE)),listVerseSaga),
      takeLatest(request(update(VERSE)),updateVerseSaga),
    ])
  }