
import { call, put } from 'redux-saga/effects'
import { ApiNotif } from '../../services';
import { NOTIFY, success, failure } from '../types';


export function * notify (api, action) {
  const { data } = action
  const response = yield call(ApiNotif.notify, data);
  console.log('notify',response);
  if (response.ok) {
    yield put(performAction(response,success(NOTIFY)))
  } else {
    yield put(performAction(response,failure(NOTIFY)))
  }
}
