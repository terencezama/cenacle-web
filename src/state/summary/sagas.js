import { put } from 'redux-saga/effects'
import { performAction, Types } from '..';
import { firestore, client as firebase } from '../../lib/firebase';
import { CStorage } from '../../lib';
import { success, create, SUMMARY, failure, remove, update, list } from '../types';

const type = SUMMARY;
const collection = "summaries";

export function* createSummarySaga(action){
    const {payload:{values,extra}} = action;
    const env = CStorage.getItem('prod') ? 'prod' : 'qa';
    try{
        const result = yield firestore.collection('cenacle').doc(env).collection(collection).add({
            ...values,
            date: new Date()
        })
        yield put(performAction({result,extra},success(create(type))))
    }catch(e){
        yield put(performAction({ e, extra }, failure(create(type))))
    }
}

export function* listSummarySaga(action){
    console.log(action);
    
    const { payload: options, payload: { rowsPerPage, page, orderBy, order, search, id } } = action;
    const env = CStorage.getItem('prod') ? 'prod' : 'qa';
    let opts = options;
    opts.env = env;
    try {

        let result = undefined;
        let count = 0;
        let docs = [];
        if (id) {
            result = firestore.collection('cenacle').doc(env).collection(collection).doc(id);
            count = 1;
            result = yield result.get();
            if(!result.exists){
                throw "id doesn't exists"
            }
            docs.push({
                ...result.data(),
                id:id
            })
        } else {
            result = yield firestore.collection('cenacle').doc(env).collection(collection).orderBy(orderBy, order).get()
            count = result.size;
            let lindex = (page * rowsPerPage) - 1
            let last = result.docs[lindex];
            if(!search || search == ""){
                if (page == 0) {
                    result = firestore.collection('cenacle').doc(env).collection(collection)
                        .limit(rowsPerPage)
                        .orderBy(orderBy, order)
                } else {
                    result = firestore.collection('cenacle').doc(env).collection(collection)
                        .limit(rowsPerPage)
                        .orderBy(orderBy, order)
                        .startAfter(last)
                }
    
                result = yield result.get();
            }
            
            result.forEach(doc => {
                if (search && search != "") {
                    // result.startAt(search).endAt(search+'\uf8ff')
                    const data = doc.data();
                    if (data.desc.indexOf(search) !== -1) {
                        docs.push({
                            id: doc.id,
                            ...data,
                        })
                    }
                } else {
                    docs.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                }

            });
        }

        const response = { docs, opts, count };
        console.log('result:', response);
        yield put(performAction(response, success(list(type))))
    } catch (e) {
        console.log('error list',e)
        yield put(performAction({ e, opts }, failure(list(type))))
    }
}

export function* deleteSummarySaga(action){
    console.log('delete action',action);
    const {payload:{id}} = action;
    const env = CStorage.getItem('prod') ? 'prod' : 'qa';
    let opts = action.payload;
    try {
        let result = firestore.collection('cenacle').doc(env).collection(collection).doc(id);
        result = yield result.delete();
        console.log('result:', result);
        yield put(performAction({ ...opts }, success(remove(type))))
    } catch (e) {
        console.log(e)
        yield put(performAction({ e, opts }, failure(remove(type))))
    }

} 

export function* updateSummarySaga(action){
    console.log('updating', action);
    const env = CStorage.getItem('prod') ? 'prod' : 'qa';
    const { payload: { values: {update: updateId }, values, extra } } = action;
    let opts = action.payload;
    opts.env = env;
    console.log('update id', updateId)
    try {
        let result = firestore.collection('cenacle').doc(env).collection(collection).doc(updateId);
        result = yield result.update({ ...values })
        console.log('result:', result);
        yield put(performAction({ opts,extra }, success(update(type))))
    } catch (e) {
        console.log(e)
        yield put(performAction({ e, opts,extra }, failure(update(type))))
    }

}