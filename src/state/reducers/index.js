import {combineReducers} from 'redux'
import {reducer as networkReducer} from './network'
import * as Types from '../types'
export default combineReducers({
    login:networkReducer(Types.LOGIN_REQUEST,Types.LOGIN_SUCCESS,Types.LOGIN_FAILURE)
})