import React from "react";
import { render } from "react-dom";
import "antd/dist/antd.css";
import message from "antd/es/message";

import PageRoot from "./page";

globalThis.addEventListener("unhandledrejection", ({ reason }) => {
  if (reason instanceof URIError) message.error(reason.message);
});

render(<PageRoot />, document.querySelector("main"));
// @ts-ignore
if (import.meta.hot) import.meta.hot.accept();
