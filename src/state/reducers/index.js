import {combineReducers} from 'redux'
import {reducer as networkReducer} from './network'
import { LOGIN, create, SHARE, update, remove, list } from '../types';

const shareReducer = combineReducers({
    create:networkReducer(create(SHARE)),
    update:networkReducer(update(SHARE)),
    delete:networkReducer(remove(SHARE)),
    list:networkReducer(list(SHARE)),
})

export default combineReducers({
    login:networkReducer(LOGIN),
    share:shareReducer
})