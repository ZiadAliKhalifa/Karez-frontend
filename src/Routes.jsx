// react router guards package docs
// https://www.npmjs.com/package/react-router-guards?activeTab=readme

import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import GenericModal from "./components/common/modal/GenericModal";
import Login from "./components/authentication/login/Login";
import Logout from "./components/authentication/logout/Logout";
import { getCookie } from "./utils/cookies";
import Customer from "./components/customer/Customer";
import ComponentWrapper from "./components/componentWrapper/ComponentWrapper";
import PackedOrders from "./components/packedOrders/PackedOrders";

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
  return (
    <BrowserRouter>
      <GenericModal />
      {/* we can have multiple GuardProvider wrappers with different validation functions */}
      <GuardProvider guards={[requireLogin]}>
        <Switch>
          <GuardedRoute path="/login" exact component={Login}></GuardedRoute>
          <GuardedRoute path="/logout" exact component={Logout}></GuardedRoute>
          <GuardedRoute path="/admin/customers" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <Customer />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/printer/packed" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <PackedOrders />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/printer/unpacked" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <PackedOrders />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute
            path="/printer"
            exact
            //component={}
            meta={{ auth: true }}
          />
        </Switch>
      </GuardProvider>
    </BrowserRouter>
  );
};

export default Routes;
