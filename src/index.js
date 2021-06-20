import React from "react";
import ReactDOM from "react-dom";

import App from "./app.js";

function Main(props) {
  return <App />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
