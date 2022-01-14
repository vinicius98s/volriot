import React from "react";
import ReactDOM from "react-dom";
import { setAppElement } from "react-modal";

import App from "./App";

setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
