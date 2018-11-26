// import firebase from 'firebase';
import {put} from 'redux-saga/effects'
import { performAction, Types } from '..';
import { firestore, client as firebase} from '../../lib/firebase';
import { CStorage } from '../../lib';
// import * as admin from 'firebase-admin';

export function* createShareSaga(action) {
    console.log('creating',action)
    const { payload: { values: {content,title}} } = action;

    // try {
    //     const result = yield firebase.auth().signInWithEmailAndPassword(email, password);
    //     yield put(performAction(result,Types.LOGIN_SUCCESS))
    // } catch (error) {
    //     yield put(performAction(error,Types.LOGIN_FAILURE))
    // }

    
    const env = CStorage.getItem('prod') ? 'prod':'qa';

    firestore.collection('cenacle').doc(env).collection('shares').add({
        title,
        content,
        date:new Date()

    })
    // db.collection('cenacle').doc('env').set({
    //     title:"cool"
    // })
}

export function* listShareSaga(action){

}

export function* deleteShareSaga(action){

}

export function* updateShareSaga(action){

}