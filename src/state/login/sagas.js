import firebase from 'firebase';
import {put} from 'redux-saga/effects'
import { performAction, Types } from '..';
import { success, LOGIN, failure } from '../types';



export function* loginSaga(action) {
    const { payload: { email, password } } = action;

    try {
        const result = yield firebase.auth().signInWithEmailAndPassword(email, password);
        
        yield put(performAction(result,success(LOGIN)))
    } catch (error) {
        yield put(performAction(error,failure(LOGIN)))
    }
}