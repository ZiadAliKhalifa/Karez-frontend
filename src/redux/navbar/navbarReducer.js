import { SET_ACTIVE_NAV_TAB } from "./navbarTypes";
import { navtabs } from "../../consts/navTabs";

const initialState = {
  activeTab: navtabs.HOME,
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_NAV_TAB:
      return {
        activeTab: action.payload,
      };

    default:
      return state;
  }
};

export default navbarReducer;
