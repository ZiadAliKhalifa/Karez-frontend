import { OPEN_MODAL, CLOSE_MODAL } from "./modalTypes";

export const openModal = (content) => {
  return {
    type: OPEN_MODAL,
    //payload returns the modal content
    payload: <>{content}</>,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
    //payload returns the modal content
    payload: null,
  };
};
