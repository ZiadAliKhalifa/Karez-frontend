import React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import "./Button.css";

function AppButton({
  id,
  text,
  variant,
  disabled,
  onClick,
  btnClassName,
  txtClassName,
  children,
  ...restProps
}) {
  return (
    <Button
      id={id}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      className={btnClassName}
      {...restProps}
    >
      {children ? (
        <span id={`child_${id}`} className={txtClassName}>
          {children}
        </span>
      ) : (
        <span>{text}</span>
      )}
    </Button>
  );
}
AppButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  btnClassName: PropTypes.string,
  txtClassName: PropTypes.string,
  children: PropTypes.object,
};

AppButton.defaultProps = {
  id: "",
  text: "",
  variant: "outlined",
  disabled: false,
  onClick: () => {},
  btnClassName: "btn",
};

export default AppButton;
