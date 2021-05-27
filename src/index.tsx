import React from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";

import PageRoot from "./page";

render(<PageRoot />, document.querySelector("main"));
// @ts-ignore
if (import.meta.hot) import.meta.hot.accept();
