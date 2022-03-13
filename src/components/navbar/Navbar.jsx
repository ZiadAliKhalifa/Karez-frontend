import React, { useEffect } from "react";
import "./Navbar.css";
import zanobiaLogo from "../../static/images/zanobia-logo.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNavTab } from "../../redux/navbar/navbarActions";
import { navtabs } from "../../consts/navTabs";
import { types } from "../../consts/types";
import Button from "../common/button/Button";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { activeTab } = useSelector((state) => state.navbar);

  //Set active tab according to pathname on rendering of the navbar
  useEffect(() => {
    if (window.location.pathname.slice(0, 7) === "/orders") {
      dispatch(setActiveNavTab(navtabs.ORDERS));
    } else if (window.location.pathname.slice(0, 10) === "/inventory") {
      dispatch(setActiveNavTab(navtabs.INVENTORY));
    } else if (window.location.pathname.slice(0, 7) === "/recipe") {
      dispatch(setActiveNavTab(navtabs.RECIPE));
    }
  }, [dispatch]);

  return (
    <div
      className={activeTab === navtabs.LOGIN ? "nav-hidden" : "nav-container"}
    >
      <div className="nav-subcontainer">
        <div className="nav-img-container">
          <img src={zanobiaLogo} alt="" />
        </div>
        <ul className="nav-list-container">
          <div className="nav-dropdown">
            <li
              id="nav-list-orders"
              className={
                activeTab === navtabs.ORDERS
                  ? "nav-list-tab nav-tab-active"
                  : "nav-list-tab"
              }
            >
              <div className="nav-list-tab-text">الطلبات</div>
            </li>
            <div className="nav-dropdown-content">
              <div
                className="nav-dropdown-content-option"
                onClick={() => {
                  dispatch(setActiveNavTab(navtabs.ORDERS));
                  history.push({ pathname: "/orders", state: types.PREPARATION });

                }}
              >
                التحضيرات
              </div>
              <div
                className="nav-dropdown-content-option"
                onClick={() => {
                  dispatch(setActiveNavTab(navtabs.ORDERS));
                  history.push({ pathname: "/orders", state: types.FINISH });
                }}
              >
                التفنيشات
              </div>
            </div>
          </div>
          <div className="nav-dropdown">
            <li
              className={
                activeTab === navtabs.RECIPE
                  ? "nav-list-tab nav-tab-active"
                  : "nav-list-tab"
              }
            >
              <div className="nav-list-tab-text">الوصفات</div>
            </li>
            <div className="nav-dropdown-content">
              <div
                className="nav-dropdown-content-option"
                onClick={() => {
                  dispatch(setActiveNavTab(navtabs.RECIPE));
                  history.push({ pathname: "/recipe", state: types.PREPARATION });
                }}
              >
                التحضيرات
              </div>
              <div
                className="nav-dropdown-content-option"
                onClick={() => {
                  dispatch(setActiveNavTab(navtabs.RECIPE));
                  history.push({ pathname: "/recipe", state: types.FINISH });
                }}
              >
                التفنيشات
              </div>
            </div>
          </div>
          <li
            className={
              activeTab === navtabs.INVENTORY
                ? "nav-list-tab nav-tab-active"
                : "nav-list-tab"
            }
            onClick={() => {
              dispatch(setActiveNavTab(navtabs.INVENTORY));
              history.push("/inventory");
            }}
          >
            <div className="nav-list-tab-text">المواد الخام</div>
          </li>
        </ul>
        <div className="nav-auth-container">
          <Button
            id="nav_button"
            onClick={() => history.push("/logout")}
            btnClassName="nav-button"
            text="تسجيل الخروج
            "
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
