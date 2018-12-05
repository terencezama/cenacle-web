
import { call, put } from 'redux-saga/effects'
import { ApiNotif } from '../../services';
import { NOTIFY, success, failure } from '../types';
import { performAction } from '..';
/*

let message = {
      to:"/topics/all",
      data:{
        type:"notif",
        message:title,
        title:"Nouvelle Évenement"
      },
      priority:"high"
    }
    this.props.pnotify(message);
*/
const api = ApiNotif.create();

export function* notify(action) {
    console.log(action)
    const { payload } = action

    try{
        const response = yield call(api.notify, payload);
        console.log('notify_res', response);
        yield put(performAction(response, success(NOTIFY)))
    }catch(e){
        console.log('notify_err', e);
        yield put(performAction(e, failure(NOTIFY)))
    }

}
