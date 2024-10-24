import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

import "./assets/global.css";
import { App } from "./app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toast

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <App />
      <ToastContainer />
    {/* </React.StrictMode> */}
  </Provider>
);
