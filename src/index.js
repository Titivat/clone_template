import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import LoginLayout from "layouts/Login/Login.js";
import RegisterLayout from "layouts/Register/Register.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <LoginLayout {...props} />} />
          <Route exact path="/register" render={(props) => <RegisterLayout {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);
