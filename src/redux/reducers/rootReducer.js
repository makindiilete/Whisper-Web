import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};

const rootReducer = combineReducers({ userReducer });

export default persistReducer(persistConfig, rootReducer);
