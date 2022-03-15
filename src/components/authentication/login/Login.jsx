import React, { useState, useRef } from "react";
import "./login.css";
import karezLogo from "../../../static/images/karez_login.jpeg";
import { useDispatch } from "react-redux";
import AppInput from "../../common/input/Input";
import Button from "../../common/button/Button";
import { setCookie } from "../../../utils/cookies";
import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";
import { loginUser } from "../../../redux/authentication/authenticationActions";
import { useHistory } from "react-router";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const phoneError = useRef(false);
  const passwordError = useRef(false);

  const formValidation = (phone, password) => {
    if (phone === "") {
      phoneError.current = "This Feild is required";
    } else {
      phoneError.current = null;
    }

    if (password === "") {
      passwordError.current = "This Feild is required";
    } else {
      passwordError.current = null;
    }
    return passwordError.current === null && phoneError.current === null
      ? true
      : false;
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const data = { email: phone, password: password };

    const isValidated = formValidation(phone, password);

    if (isValidated) {
      const url =
        restHelper.getURLPrefix(appConfig.host) +
        appConfig.services.general.login;
      restHelper
        .postRequest(url, data)
        .then((res) => {
          setCookie("accessToken", res.data.access, 7);
          setCookie("refreshToken", res.data.refresh, 14);
          setCookie("role", res.data.role, 7);
          dispatch(loginUser());
          if (res.data.role === "Montage Admin") history.push("/admin/customers");
          else history.push("/printer");
        })
        .catch((err) => {
          alert("اسم المستخدم او كلمة المرور غير صحيحة , برجاء اعادة المحاولة");
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-main">
        <img className="login-logo-black" src={karezLogo} alt="" />
        <div className="login-form-container">
          <form onSubmit={loginSubmitHandler} id="login-form">
            <div className="login-phone-input-container">
              <div className="phone-password-input-label">اسم المستخدم</div>
              <AppInput
                type="text"
                inputClassName="phone-password-input"
                InputProps={{ disableUnderline: true }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="login-password-input-container">
              <div className="phone-password-input-label">كلمة المرور</div>
              <AppInput
                type="password"
                inputClassName="phone-password-input"
                InputProps={{ disableUnderline: true }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-button-container">
              <Button
                id="login_button"
                btnClassName="login-button"
                text="تسجيل الدخول"
                type="submit"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
