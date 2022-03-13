import { OPEN_MODAL, CLOSE_MODAL } from "./modalTypes";

const initialState = {
  isOpen: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isOpen: true,
        content: action.payload,
      };

    case CLOSE_MODAL:
      return {
        isOpen: false,
      };

    default:
      return state;
  }
};

export default modalReducer;
