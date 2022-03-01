import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userReducer";
import { subscriptionPlansReducer } from "./subscriptionPlansReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer", "subscriptionPlansReducer"],
};

const rootReducer = combineReducers({ userReducer, subscriptionPlansReducer });

export default persistReducer(persistConfig, rootReducer);
