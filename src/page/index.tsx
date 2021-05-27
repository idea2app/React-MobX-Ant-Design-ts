import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import { HomePage } from "./Home";

export default () => (
  <HashRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
  </HashRouter>
);
