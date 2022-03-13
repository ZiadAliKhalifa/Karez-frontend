import { SET_ACTIVE_NAV_TAB } from "./navbarTypes";

export const setActiveNavTab = (navTab) => {
  return {
    type: SET_ACTIVE_NAV_TAB,
    payload: navTab,
  };
};
