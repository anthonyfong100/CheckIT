// catalogs all reducer actions
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ShoppingReducer from './ShoppingReducer';
import AddFridgeReducer from './AddFridgeReducer';
import FridgeReducers from './FridgeReducer';
import AddShoppingReducer from './AddShoppingReducer';
import CameraReducer from './CameraReducer';

export default combineReducers({
    auth: AuthReducer,
    shoppingFoods: ShoppingReducer,
    addShoppingFoods: AddShoppingReducer,
    fridgeFoods: FridgeReducers,
    addFridgeFoods: AddFridgeReducer,
    camera: CameraReducer
})
