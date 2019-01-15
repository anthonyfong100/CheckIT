// catalogs all reducer actions
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

export default combineReducers({
    auth:AuthReducer
})
