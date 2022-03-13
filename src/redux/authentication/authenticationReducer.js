import { LOGIN, LOGOUT } from "./authenticationTypes";

const initialState = {
  isLoggedIn: false,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default authenticationReducer;
