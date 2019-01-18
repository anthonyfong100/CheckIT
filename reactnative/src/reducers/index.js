// catalogs all reducer actions
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ShoppingReducer from './ShoppingReducer';
import FridgeReducers from './FridgeReducers';

export default combineReducers({
    auth: AuthReducer,
    shoppingFoods: ShoppingReducer,
    fridgeFoods: FridgeReducers
})
