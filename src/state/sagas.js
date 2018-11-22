import { takeLatest, all } from 'redux-saga/effects'
import * as Types from './types';
import { loginSaga } from './login/sagas';
export default function * root () {
    yield all([
      // some sagas only receive an action
      takeLatest(Types.LOGIN_REQUEST, loginSaga),
  
      // some sagas receive extra parameters in addition to an action
    //   takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
    ])
  }