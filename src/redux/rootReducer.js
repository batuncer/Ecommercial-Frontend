import { combineReducers } from "redux";
import productReducer from "./productSlice";
import generalSlice from "./generalSlice";

const rootReducer = combineReducers({
  products: productReducer,
  general: generalSlice,
});

export default rootReducer;
