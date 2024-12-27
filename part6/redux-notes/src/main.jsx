import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./reducers/filterReducer";
import noteReducer from "./reducers/noteReducer";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    notes: noteReducer,
  },
});

store.subscribe(() => console.log(store.getState()));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
