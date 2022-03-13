import React from "react";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import "./CheckBox.css";

function AppCheckbox({
  id,
  disabled,
  labelText,
  defaultChecked,
  boxClassName,
  labelClassName,
  checked,
  onChange,
  ...restProps
}) {
  return (
    <>
      {labelText && <label className={labelClassName}>{labelText}</label>}
      <Checkbox
        id={id}
        disabled={disabled}
        defaultChecked={defaultChecked}
        className={`boxClass ${boxClassName}`}
        checked={checked}
        onChange={onChange}
        {...restProps}
      />
    </>
  );
}
AppCheckbox.propTypes = {
  id: PropTypes.string,
  labelText: PropTypes.string,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  boxClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.object,
};

AppCheckbox.defaultProps = {
  id: "",
  labelText: "",
  disabled: false,
  defaultChecked: false,
  boxClassName: "boxClass",
  labelClassName: "boxLabel",
  onChange: () => {},
};

export default AppCheckbox;
