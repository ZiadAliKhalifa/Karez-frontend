import React, { useEffect } from "react";
import { getCookie, deleteCookie } from "../../../utils/cookies";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/authentication/authenticationActions";

export default function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (getCookie("accessToken")) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      dispatch(logoutUser());
      history.push("/login");
    }
    history.push("/login");
  });

  return <div></div>;
}
