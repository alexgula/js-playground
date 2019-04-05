import "./index.less";

import * as React from "react";
import * as ReactDOM from "react-dom";

const message = "Hello, world!";

console.log(message);

ReactDOM.render(
  <p className="message">{message}</p>,
  document.getElementById("app")
);
