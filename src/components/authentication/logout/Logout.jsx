import React, { useEffect } from "react";
import { getCookie, deleteCookie } from "../../../utils/cookies";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  useEffect(() => {
    if (getCookie("accessToken")) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      history.push("/login");
    }
    history.push("/login");
  });

  return <div></div>;
}
