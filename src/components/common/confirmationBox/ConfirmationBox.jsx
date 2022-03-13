import React from "react";
import "./ConfirmationBox.css";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../redux/modal/modalActions";
import PropTypes from "prop-types";

function ConfirmationBox({
  msg,
  saveAction,
  saveText,
  discardText,
  saveBtnClass,
  discardBtnClass,
}) {
  const dispatch = useDispatch();

  return (
    <div className="confirmation-container">
      <div className="confirmation-msg">{msg}</div>
      <div className="confirmation-actions">
        <Button
          btnClassName={`close-btn ${discardBtnClass}`}
          onClick={() => {
            dispatch(closeModal());
          }}
          style={{ margin: "0 0 0 5px" }}
          text={discardText}
        />
        <Button
          className={`save-btn ${saveBtnClass}`}
          onClick={() => {
            saveAction();
            dispatch(closeModal());
          }}
          text={saveText}
        />
      </div>
    </div>
  );
}

ConfirmationBox.propTypes = {
  msg: PropTypes.string,
  saveBtnClass: PropTypes.string,
  discardBtnClass: PropTypes.string,
  saveText: PropTypes.string,
  discardText: PropTypes.string,
  saveAction: PropTypes.func,
};

ConfirmationBox.defaultProps = {
  msg: "",
  saveText: "اوافق",
  discardText: "الغاء",
  saveBtnClass: "",
  discardBtnClass: "",
  saveAction: () => {},
};

export default ConfirmationBox;
