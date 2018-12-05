import { takeLatest, all } from 'redux-saga/effects'

import { loginSaga } from './login/sagas';
import { createShareSaga,deleteShareSaga,listShareSaga,updateShareSaga } from './share/sagas';
import { request, LOGIN, create, SHARE, list, update, remove, NOTIFY } from './types';
import { notify } from './notif/sagas';
export default function * root () {
    yield all([
      // some sagas only receive an action
      takeLatest(request(LOGIN), loginSaga),
      takeLatest(request(create(SHARE)),createShareSaga),
      takeLatest(request(list(SHARE)),listShareSaga),
      takeLatest(request(update(SHARE)),updateShareSaga),
      takeLatest(request(remove(SHARE)),deleteShareSaga),
      takeLatest(request(NOTIFY),notify)
      
  
      // some sagas receive extra parameters in addition to an action
    //   takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
    ])
  }