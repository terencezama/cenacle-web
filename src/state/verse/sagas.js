import { put } from 'redux-saga/effects'
import { performAction, Types } from '..';
import { firestore, client as firebase } from '../../lib/firebase';
import { CStorage } from '../../lib';
import { success, create, VERSE, failure, remove, update, list } from '../types';

const type = VERSE;
const collection = "verse";



export function* listVerseSaga(action) {
    console.log('listVerseSaga',action);

    const { payload: options } = action;
    const env = CStorage.getItem('prod') ? 'prod' : 'qa';
    let opts = options || {};
    opts.env = env;
    try {

        let result = undefined;

        result = firestore.collection('cenacle').doc(env).collection(collection).doc('text');

        result = yield result.get();
        if (!result.exists) {
            throw "id doesn't exists"
        }
        yield put(performAction(result.data(), success(list(type))))
    } catch (e) {
        console.log('error list', e)
        yield put(performAction({ e, opts }, failure(list(type))))
    }
}


export function* updateVerseSaga(action) {
    console.log('updating', action);
    const env = CStorage.getItem('prod') ? 'prod' : 'qa';
    const { payload: { values, extra } } = action;
    let opts = action.payload;
    opts.env = env;

    try {
        let result = firestore.collection('cenacle').doc(env).collection(collection).doc('text');
        result = yield result.update({ ...values })
        console.log('result:', result);
        yield put(performAction({ opts, extra }, success(update(type))))
    } catch (e) {
        console.log(e)
        yield put(performAction({ e, opts, extra }, failure(update(type))))
    }

}