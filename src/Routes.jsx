// react router guards package docs
// https://www.npmjs.com/package/react-router-guards?activeTab=readme

import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import GenericModal from "./components/common/modal/GenericModal";
import Login from "./components/authentication/login/Login";
import Logout from "./components/authentication/logout/Logout";
import { getCookie } from "./utils/cookies";
import Customers from "./components/customer/Customers";
import ComponentWrapper from "./components/componentWrapper/ComponentWrapper";
import CustomerDetails from "./components/customer/CustomerDetails";
import OrdersByMontage from "./components/orders/OrdersByMontage";
import NewCustomer from "./components/customer/NewCustomer";

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
          <GuardedRoute path="/admin/customer/new" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <NewCustomer />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/admin/customer/:id?" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <CustomerDetails />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/admin/customers" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <Customers />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/admin/order/by-montage/:id?" meta={{ auth: true }}>
            <ComponentWrapper>
              <OrdersByMontage />
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
