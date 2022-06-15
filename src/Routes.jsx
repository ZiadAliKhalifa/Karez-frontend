// react router guards package docs
// https://www.npmjs.com/package/react-router-guards?activeTab=readme

import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import GenericModal from "./components/common/modal/GenericModal";
import Login from "./components/authentication/login/Login";
import Logout from "./components/authentication/logout/Logout";
import { getCookie } from "./utils/cookies";
import AddMontage from "./components/montage/addMontage/AddMontage";
import Customers from "./components/customer/Customers";
import ComponentWrapper from "./components/componentWrapper/ComponentWrapper";
import PackedOrders from "./components/packedOrders/PackedOrders";
import CustomerDetails from "./components/customer/CustomerDetails";
import OrdersByMontage from "./components/orders/OrdersByMontage";
import NewCustomer from "./components/customer/NewCustomer";
// import NewCategory from "./components/customer/NewCategory";
import AddOrderForMontage from "./components/orders/AddOrderForMontage";
import MontageDetails from "./components/montage/montageDetails/MontageDetails";
import OrderDetails from "./components/orders/OrderDetails";
import NewCategory from "./components/customer/NewCategory";
import DeliveredOrders from "./components/packedOrders/DeliveredOrders";
import EditMontage from "./components/montage/editMontage/EditMontage";
import EditOrder from "./components/orders/EditOrder";
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
          <GuardedRoute path="/" exact component={Login}></GuardedRoute>
          <GuardedRoute path="/login" exact component={Login}></GuardedRoute>
          <GuardedRoute path="/logout" exact component={Logout}></GuardedRoute>
          <GuardedRoute path="/admin/customer/new" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <NewCustomer />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/admin/category/new" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <NewCategory />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute
            path="/admin/customer/:id?/montage-category/:categoryId?"
            exact
            meta={{ auth: true }}
          >
            <ComponentWrapper>
              <CustomerDetails />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/admin/customers" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <Customers />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute
            path="/admin/order/by-montage/:id?"
            meta={{ auth: true }}
          >
            <ComponentWrapper>
              <OrdersByMontage />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/order/delivered" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <DeliveredOrders />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/order/underprocessing" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <PackedOrders />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/admin/montage/new" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <AddMontage />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute
            path="/admin/montage/new/:id"
            exact
            meta={{ auth: true }}
          >
            <ComponentWrapper>
              <AddMontage />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute
            path="/admin/montage/edit/:id"
            exact
            meta={{ auth: true }}
          >
            <ComponentWrapper>
              <EditMontage />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute
            path="/admin/montage/:id?/order/new"
            exact
            meta={{ auth: true }}
          >
            <ComponentWrapper>
              <AddOrderForMontage />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute path="/order/:id?" exact meta={{ auth: true }}>
            <ComponentWrapper>
              <OrderDetails />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute
            path="/admin/montage/details/:id?"
            exact
            meta={{ auth: true }}
          >
            <ComponentWrapper>
              <MontageDetails />
            </ComponentWrapper>
          </GuardedRoute>
          <GuardedRoute
            path="/admin/edit/order/:id?"
            meta={{ auth: true }}
          >
            <ComponentWrapper>
              <EditOrder/>
            </ComponentWrapper>
          </GuardedRoute>
        </Switch>
      </GuardProvider>
    </BrowserRouter>
  );
};

export default Routes;
