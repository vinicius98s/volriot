import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { setAppElement } from "react-modal";

setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
