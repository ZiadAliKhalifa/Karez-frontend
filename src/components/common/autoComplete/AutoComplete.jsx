import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import "./AutoComplete.css";

function AppAutoComplete({
  id,
  disabled,
  labelText,
  variant,
  dropDownClassName,
  options,
  value,
  error,
  onChange,
  onClose,
  inputProps,
  ...restProps
}) {
  return (
    <Autocomplete
      id={id}
      disabled={disabled}
      className={`${
        error
          ? "autoCompleteError"
          : disabled
          ? "auto-complete-input-default inputDisabled"
          : "auto-complete-input-default"
      } ${dropDownClassName}`}
      options={options}
      value={value}
      error={error}
      onChange={(event, newValue) => {
        onChange(event, newValue);
      }}
      onClose={onClose}
      renderInput={(params) => (
        <TextField
          {...params}
          label={labelText}
          variant={variant}
          InputProps={{ ...params.InputProps, disableUnderline: true }}
        />
      )}
      {...restProps}
    />
  );
}
AppAutoComplete.propTypes = {
  id: PropTypes.string,
  labelText: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  dropDownClassName: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.object,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  inputProps: PropTypes.object,
};

AppAutoComplete.defaultProps = {
  id: "",
  labelText: "",
  variant: "standard",
  disabled: false,
  dropDownClassName: "",
  options: [],
  value: null,
  error: false,
  onChange: () => {},
  onClose: () => {},
};

export default AppAutoComplete;
