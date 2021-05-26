import React from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";
import Spin from "antd/es/spin";

render(
  <>
    <h1>Welcome to Snowpack!</h1>
    <Spin />
  </>,
  document.querySelector("main")
);
