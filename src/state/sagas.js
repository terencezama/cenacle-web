import { takeLatest, all } from 'redux-saga/effects'

import { loginSaga } from './login/sagas';
import { createShareSaga,deleteShareSaga,listShareSaga,updateShareSaga } from './share/sagas';
import { request, LOGIN, create, SHARE } from './types';
export default function * root () {
    yield all([
      // some sagas only receive an action
      takeLatest(request(LOGIN), loginSaga),
      takeLatest(request(create(SHARE)),createShareSaga),
      
  
      // some sagas receive extra parameters in addition to an action
    //   takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
    ])
  }