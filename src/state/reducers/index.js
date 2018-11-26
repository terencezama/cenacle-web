import {combineReducers} from 'redux'
import {reducer as networkReducer} from './network'
import { LOGIN, create, SHARE, update, remove, list } from '../types';

export default combineReducers({
    login:networkReducer(LOGIN),
    createShare:networkReducer(create(SHARE)),
    updateShare:networkReducer(update(SHARE)),
    deleteShare:networkReducer(remove(SHARE)),
    listShare:networkReducer(list(SHARE)),
})