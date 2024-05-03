import { combineReducers } from "redux";
import productReducer from "./productSlice";
import generalSlice from "./generalSlice";
import userReducer from "./userSlice";
import cartSlice from "./cartSlice";
const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  general: generalSlice,
  cart: cartSlice,
});

export default rootReducer;
