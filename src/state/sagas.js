import { takeLatest, all } from 'redux-saga/effects'

import { loginSaga } from './login/sagas';
import { createShareSaga,deleteShareSaga,listShareSaga,updateShareSaga } from './share/sagas';
import { request, LOGIN, create, SHARE, list, update, remove, NOTIFY, EVENT } from './types';
import { notify } from './notif/sagas';
import { createEventSaga, listEventSaga, updateEventSaga, deleteEventSaga } from './event/sagas';
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
      
  
      // some sagas receive extra parameters in addition to an action
    //   takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
    ])
  }