// react router guards package docs
// https://www.npmjs.com/package/react-router-guards?activeTab=readme

import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import GenericModal from "./components/common/modal/GenericModal";
import Login from "./components/authentication/login/Login";
import Logout from "./components/authentication/logout/Logout";
import { getCookie } from "./utils/cookies";
import SideNav from "./components/sideNav/SideNav";
import { useSelector } from "react-redux";

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
  const { isLoggedIn } = useSelector((state) => state.authentication);
  return (
    <BrowserRouter>
      <GenericModal />
      {isLoggedIn && <SideNav />}
      {/* we can have multiple GuardProvider wrappers with different validation functions */}
      <GuardProvider guards={[requireLogin]}>
        <Switch>
          <GuardedRoute path="/login" exact component={Login}></GuardedRoute>
          <GuardedRoute path="/logout" exact component={Logout}></GuardedRoute>
        </Switch>
      </GuardProvider>
    </BrowserRouter>
  );
};

export default Routes;
