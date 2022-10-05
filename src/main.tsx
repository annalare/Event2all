import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
