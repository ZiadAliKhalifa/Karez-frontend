import React from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import "./input.css";
/**
 * input used as text, password, numeric component
 * @param {string} id: set if for each component created
 * @param {string} type: could be text, password or number by default text
 * @param {string} variant: could be outlined, filled or standard by default standard
 * @param {string} placeholder: text to be placed a place holder
 * @param {string} labelText: text that will be placed as label
 * @param {boolean} disabled: by default the input is not disabled = false
 * @param {boolean} required: state that the input is required by puting * next to label by default false
 * @param {boolean} multiline: by default false as the input will only have 1 line
 * @param {boolean} error: state if there is error in the input by default false
 * @param {string} helperText: text appears if there is error in the component
 * @param {number} maxRows: if the the component multiline prop is true then max rows allowed is maxRows number by default 1
 * @param {string} defaultValue: set the default value of the input on creation
 * @param {string} inputClassName: set className of the input
 * @param {string} value: value that is displayed on the input
 * @param {Function} onChange: called on every change happens on the input
 * @param {object} InputProps: object could be used to set the componet as read only and other uses
 */
function AppInput({
  id,
  type,
  variant,
  placeholder,
  labelText,
  disabled,
  required,
  multiline,
  error,
  helperText,
  rows,
  defaultValue,
  inputClassName,
  value,
  onChange,
  InputProps,
  ...restProps
}) {
  return (
    <TextField
      id={id}
      type={type}
      variant={variant}
      placeholder={placeholder}
      label={labelText}
      disabled={disabled}
      required={required}
      multiline={multiline}
      error={error}
      helperText={error ? helperText : ""}
      rows={multiline ? rows : 1}
      defaultValue={defaultValue}
      className={
        disabled
          ? `inputDefault ${inputClassName} inputDisabled` 
          : error ? `inputDefault ${inputClassName} inputError`
          : `inputDefault ${inputClassName}`
      }
      value={value}
      onChange={onChange}
      InputProps={InputProps}
      {...restProps}
    />
  );
}
AppInput.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  labelText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  maxRows: PropTypes.number,
  defaultValue: PropTypes.string,
  inputClassName: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  InputProps: PropTypes.object,
};

AppInput.defaultProps = {
  id: "",
  type: "text",
  variant: "standard",
  placeholder: "",
  labelText: "",
  disabled: false,
  required: false,
  multiline: false,
  error: false,
  helperText: "",
  maxRows: 1,
  inputClassName: "inputDefault",
  value: "",
  onChange: () => {},
  InputProps: {},
};

export default AppInput;
