import React from "react";
import "./fonts/TTNorms/TTNorms-Bold.otf";
import "./fonts/TTNorms/TTNorms-Light.otf";
import "./fonts/TTNorms/TTNorms-Medium.otf";
import "./fonts/TTNorms/TTNorms-Regular.otf";
import "./fonts/TTNorms/TTNorms-Thin.otf";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/store/configureStore";
import { persistStore } from "redux-persist";

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
