import {combineReducers} from 'redux'
import {reducer as networkReducer} from './network'
import { LOGIN, create, SHARE, update, remove, list, NOTIFY, EVENT } from '../types';

const shareReducer = combineReducers({
    create:networkReducer(create(SHARE)),
    update:networkReducer(update(SHARE)),
    delete:networkReducer(remove(SHARE)),
    list:networkReducer(list(SHARE)),
})

const eventReducer = combineReducers({
    create:networkReducer(create(EVENT)),
    update:networkReducer(update(EVENT)),
    delete:networkReducer(remove(EVENT)),
    list:networkReducer(list(EVENT)),
})
export default combineReducers({
    login:networkReducer(LOGIN),
    share:shareReducer,
    notify:networkReducer(NOTIFY),
    event:eventReducer
})