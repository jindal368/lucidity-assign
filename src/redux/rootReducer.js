import { combineReducers } from "redux";

import adminReducer from "./adminReducer.js";
import inventoryReducer from "./inventoryReducer";

const rootReducer = combineReducers({
  products: inventoryReducer,
  admin: adminReducer,
});

export default rootReducer;
