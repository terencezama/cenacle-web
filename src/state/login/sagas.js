import firebase from 'firebase';
import {put} from 'redux-saga/effects'
import { performAction, Types } from '..';


export function* loginSaga(action) {
    const { payload: { email, password } } = action;

    try {
        const result = yield firebase.auth().signInWithEmailAndPassword(email, password);
        yield put(performAction(result,Types.LOGIN_SUCCESS))
    } catch (error) {
        yield put(performAction(error,Types.LOGIN_FAILURE))
    }
}