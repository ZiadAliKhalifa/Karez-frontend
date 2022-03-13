// react router guards package docs
// https://www.npmjs.com/package/react-router-guards?activeTab=readme

import React, { useEffect } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { useDispatch } from "react-redux";

import GenericModal from "./components/common/modal/GenericModal";
import Login from "./components/authentication/login/Login";
import Logout from "./components/authentication/logout/Logout";
import { getCookie } from "./utils/cookies";
import SideNav from "./components/sideNav/SideNav";
import Table from "./components/common/Table/Table";
import Customer from "./Customer/Customer";

// This function should check if the JWT access token exists to avail guarded routes
// check if JWT exists
const requireLogin = (to, from, next) => {
  if (to.meta.auth === true) {
    if (getCookie("accessToken")) {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => { }, [dispatch]);

  return (
    <BrowserRouter>
      <GenericModal />
      <Customer />
      {/* we can have multiple GuardProvider wrappers with different validation functions */}
      <GuardProvider guards={[requireLogin]}>
        <Switch>
          <GuardedRoute path="/login" exact component={Login}></GuardedRoute>
          <GuardedRoute path="/logout" exact component={Logout}></GuardedRoute>
          <GuardedRoute
            path="/admin"
            exact
            //component={}
            meta={{ auth: true }}
          />
          <GuardedRoute
            path="/printer"
            exact
            //component={}
            meta={{ auth: true }}
          />
        </Switch>
      </GuardProvider>
    </BrowserRouter >
  );
};

export default Routes;
