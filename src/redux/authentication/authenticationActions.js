import { LOGIN, LOGOUT } from "./authenticationTypes";

export const loginUser = () => {
  return {
    type: LOGIN,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
