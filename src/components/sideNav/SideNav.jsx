import React, { useEffect } from "react";
import "./SideNav.css";
import customerLogo from "../../static/images/customerLogo.svg";
import designLogo from "../../static/images/designLogo.svg";
import packedLogo from "../../static/images/packedLogo.svg";
import unpackedLogo from "../../static/images/unpackedLogo.svg";
import { useHistory } from "react-router";
import { getCookie } from "../../utils/cookies";
import {
  loginUser,
  logoutUser,
} from "../../redux/authentication/authenticationActions";
import { useDispatch } from "react-redux";

function SideNav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userRole = getCookie("role");
  useEffect(() => {
    getCookie("accessToken").length > 0
      ? dispatch(loginUser())
      : dispatch(logoutUser());
  }, [dispatch]);

  return (
    <nav className="sidenav-container">
      <div className="sidenav-title">الكارز</div>
      {userRole === "Montage Admin" && (
        <>
          <div
            className="sidenav-tabs"
            onClick={() => history.push("/admin/customers")}
          >
            <img
              src={customerLogo}
              alt="customer"
              className="sidenav-tab-img"
            />
            <div className="sidenav-tab-label">عملاء</div>
          </div>
          <div
            className="sidenav-tabs"
            onClick={() => history.push("/designs")}
          >
            <img src={designLogo} alt="design" className="sidenav-tab-img" />
            <div className="sidenav-tab-label">تصميمات</div>
          </div>
        </>
      )}
      {userRole === "Montage Printer" && (
        <>
          <div
            className="sidenav-tabs"
            onClick={() => history.push("/orders/unpacked")}
          >
            <img
              src={unpackedLogo}
              alt="customer"
              className="sidenav-tab-img"
            />
            <div className="sidenav-tab-label">طلبات مغلفة</div>
          </div>
          <div
            className="sidenav-tabs"
            onClick={() => history.push("/orders/packed")}
          >
            <img src={packedLogo} alt="design" className="sidenav-tab-img" />
            <div className="sidenav-tab-label">طلبات غير مغلفة</div>
          </div>
        </>
      )}
      <div
        className="sidenav-logout-container"
        onClick={() => history.push("/logout")}
      >
        <button className="sidenav-logout-button">تسجيل الخروج</button>
      </div>
    </nav>
  );
}

export default SideNav;
