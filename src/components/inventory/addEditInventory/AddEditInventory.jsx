import React, { useEffect, useState, useRef } from "react";
import "./AddEditInventory.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Input from "../../common/input/Input";
import AutoComplete from "../../common/autoComplete/AutoComplete";
import Button from "../../common/button/Button";
import appConfig from "../../../config.json";
import restHelper from "../../../helpers/RestHelper";

const AddInventory = (props) => {
  const rawData = {
    name: {
      value: "",
      valid: false,
      helperText: "",
      type: "text",
      error: false,
      touched: false,
      variant: "outlined",
      disabled: false,
    },
    description: {
      value: "",
      valid: true,
      helperText: "",
      type: "text",
      error: false,
      touched: false,
      variant: "outlined",
      multiline: true,
      rows: 8,
      disabled: false,
    },
    price: {
      value: "",
      valid: false,
      helperText: "",
      type: "number",
      error: false,
      touched: false,
      variant: "outlined",
      disabled: false,
    },
    quantity: {
      value: "",
      valid: false,
      helperText: "",
      type: "number",
      error: false,
      touched: false,
      variant: "outlined",
      disabled: false,
    },
    minimum_quantity: {
      value: "",
      valid: false,
      helperText: "",
      type: "number",
      error: false,
      touched: false,
      variant: "outlined",
      disabled: false,
    },
    critical_quantity: {
      value: "",
      valid: false,
      helperText: "",
      type: "number",
      error: false,
      touched: false,
      variant: "outlined",
      disabled: false,
    },
    unit_id: {
      value: null,
      valid: false,
      type: "dropDown",
      error: false,
      touched: false,
      variant: "outlined",
      disabled: false,
    },
  };

  const history = useHistory();
  const { general } = useSelector((state) => state);
  const [data, setData] = useState(rawData);
  const unitDictionary = useRef({});
  const allDataRef = useRef(data);
  const isEdit = useRef(false);

  useEffect(() => {
    if (general.unit.length !== 0) {
      createUniteDictionary();
      setStateOnEdit();
    }
  }, [general.unit]);

  const createUniteDictionary = () => {
    const unitDic = {};
    general.unit.forEach((unit) => {
      unitDic[unit.id] = unit;
    });
    unitDictionary.current = unitDic;
  };

  const setStateOnEdit = () => {
    if (props.location.state) {
      for (let key in props.location.state) {
        if (key !== "id") {
          setData((prevState) => ({
            ...prevState,
            [key === "units" ? "unit_id" : key]: {
              ...prevState[key],
              value:
                key === "units"
                  ? unitDictionary.current[props.location.state[key]]
                  : props.location.state[key],
              touched: true,
              valid: true,
              disabled: key === "name" ? true : false,
            },
          }));
          allDataRef.current = {
            ...allDataRef.current,
            [key === "units" ? "unit_id" : key]: {
              ...allDataRef.current[key],
              value:
                key === "units"
                  ? unitDictionary.current[props.location.state[key]]
                  : props.location.state[key],
              touched: true,
              valid: true,
              disabled: key === "name" ? true : false,
            },
          };
        }
      }
      isEdit.current = true;
    } else {
      setData(rawData);
      allDataRef.current = rawData;
      isEdit.current = false;
    }
  };

  const validateOnSave = () => {
    let valid = true;
    for (let key in allDataRef.current) {
      const helperTexts = `يجب ادخال ${spanHandler(key)}`;

      if (allDataRef.current[key].valid === false) {
        valid = false;
        setData((prevState) => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            error: true,
            touched: true,
            helperText: helperTexts,
          },
        }));
        allDataRef.current = {
          ...allDataRef.current,
          [key]: {
            ...allDataRef.current[key],
            error: true,
            touched: true,
            helperText: helperTexts,
          },
        };
      }
    }
    return valid;
  };

  const checkDropDownValidaty = (id) => {
    if (allDataRef.current[id].value === null) {
      setData((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          valid: false,
          error: true,
        },
      }));
      allDataRef.current = {
        ...allDataRef.current,
        [id]: {
          ...allDataRef.current[id],
          valid: false,
          error: true,
        },
      };
    } else {
      setData((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          valid: true,
          error: false,
        },
      }));
      allDataRef.current = {
        ...allDataRef.current,
        [id]: {
          ...allDataRef.current[id],
          valid: true,
          error: false,
        },
      };
    }
  };

  const checkValidity = (id) => {
    const helperTexts = `يجب ادخال ${spanHandler(id)}`;

    if (allDataRef.current[id].touched) {
      if (data[id].type === "text") {
        if (allDataRef.current[id].value?.trim() !== "") {
          setData((prevState) => ({
            ...prevState,
            [id]: {
              ...prevState[id],
              valid: true,
              error: false,
            },
          }));
          allDataRef.current = {
            ...allDataRef.current,
            [id]: {
              ...allDataRef.current[id],
              valid: true,
              error: false,
            },
          };
        } else {
          if (id === "description") {
            setData((prevState) => ({
              ...prevState,
              [id]: {
                ...prevState[id],
                error: false,
                helperText: helperTexts,
              },
            }));
            allDataRef.current = {
              ...allDataRef.current,
              [id]: {
                ...allDataRef.current[id],
                error: false,
                helperText: helperTexts,
              },
            };
          } else {
            setData((prevState) => ({
              ...prevState,
              [id]: {
                ...prevState[id],
                error: true,
                helperText: helperTexts,
                valid: false,
              },
            }));
            allDataRef.current = {
              ...allDataRef.current,
              [id]: {
                ...allDataRef.current[id],
                error: true,
                helperText: helperTexts,
                valid: false,
              },
            };
          }
        }
      }
      if (data[id].type === "number") {
        if (
          allDataRef.current[id].value.trim() >= 0 &&
          allDataRef.current[id].value.trim() !== ""
        ) {
          setData((prevState) => ({
            ...prevState,
            [id]: {
              ...prevState[id],
              valid: true,
              error: false,
            },
          }));
          allDataRef.current = {
            ...allDataRef.current,
            [id]: {
              ...allDataRef.current[id],
              valid: true,
              error: false,
            },
          };
        } else {
          setData((prevState) => ({
            ...prevState,
            [id]: {
              ...prevState[id],
              error: true,
              helperText: helperTexts,
              valid: false,
            },
          }));
          allDataRef.current = {
            ...allDataRef.current,
            [id]: {
              ...allDataRef.current[id],
              error: true,
              helperText: helperTexts,
              valid: false,
            },
          };
        }
      }
    }
  };
  const dropDownChangeHandler = (e, newValue, id) => {
    setData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        value: newValue,
        touched: true,
      },
    }));
    allDataRef.current = {
      ...allDataRef.current,
      [id]: {
        ...allDataRef.current[id],
        value: newValue,
        touched: true,
      },
    };
    checkDropDownValidaty(id);
  };

  const InputChangeHanlder = (event, id) => {
    setData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        value: event.target.value,
        touched: true,
      },
    }));
    allDataRef.current = {
      ...allDataRef.current,
      [id]: {
        ...allDataRef.current[id],
        value: event.target.value,
        touched: true,
      },
    };
    checkValidity(id);
  };

  const saveAction = async () => {
    const valid = validateOnSave();
    const urlData = {};
    if (valid) {
      for (let key in data) {
        switch (data[key].type) {
          case "text":
            urlData[key] = data[key].value;
            break;
          case "number":
            urlData[key] = Number(data[key].value);
            break;
          case "dropDown":
            urlData[key] = data[key].value.id;
            break;
          default:
            break;
        }
      }
      let url = "";
      let result = {};
      if (isEdit.current) {
        urlData["id"] = props.location.state["id"];
        url =
          restHelper.getURLPrefix(appConfig.host) +
          appConfig.services.inventory.editItem;
        result = await restHelper.putRequest(url, urlData);
      } else {
        url =
          restHelper.getURLPrefix(appConfig.host) +
          appConfig.services.inventory.addItem;
        result = await restHelper.postRequest(url, urlData);
      }
      if (result.status === 200 || result.status === 201)
        history.push("/Inventory");
    }
  };

  const spanHandler = (key) => {
    switch (key) {
      case "name":
        return "الاسم*";
      case "description":
        return "التفاصيل";
      case "price":
        return "السعر*";
      case "quantity":
        return "الكمية*";
      case "minimum_quantity":
        return "الحد الادني للكمية*";
      case "critical_quantity":
        return "الحد الخطر للكمية*";
      case "unit_id":
        return "وحدة القياس*";
      default:
    }
  };

  const stateArray = [];
  for (let key in data) {
    stateArray.push(key);
  }

  let form = (
    <form>
      {stateArray.map((key) => (
        <div key={key} className="form-conatiner">
          <span className="label-span">{spanHandler(key)}</span>
          <span className="input">
            {key === "unit_id" ? (
              <AutoComplete
                dropDownClassName="dropDownInputEdit"
                id={key}
                options={general.unit}
                value={allDataRef.current[key].value}
                error={allDataRef.current[key].error}
                disabled={allDataRef.current[key].disabled}
                onChange={(event, newValue) => {
                  dropDownChangeHandler(event, newValue, key);
                }}
              />
            ) : key === "description" ? (
              <Input
                inputClassName="inputedit"
                id={key}
                value={allDataRef.current[key].value}
                error={allDataRef.current[key].error}
                helperText={allDataRef.current[key].helperText}
                type={data[key].type}
                variant={data[key].variant}
                multiline={data[key].multiline}
                disabled={allDataRef.current[key].disabled}
                rows={data[key].rows}
                onChange={(event) => InputChangeHanlder(event, key)}
              />
            ) : (
              <Input
                inputClassName="inputedit"
                id={key}
                value={allDataRef.current[key].value}
                error={allDataRef.current[key].error}
                helperText={allDataRef.current[key].helperText}
                type={data[key].type}
                disabled={allDataRef.current[key].disabled}
                variant={data[key].variant}
                onChange={(event) => InputChangeHanlder(event, key)}
              />
            )}
          </span>
        </div>
      ))}
    </form>
  );

  return (
    <div className={"add-inventory-container"}>
      <h1 className={"container-header"}>اضافة مادة خام جديدة</h1>
      <div className={"input-container"}>
        {form}
        <div className="button">
          <Button
            btnClassName={"close-btn"}
            style={{ margin: "0 0 0 5px" }}
            onClick={() => history.push("/Inventory")}
            text="الغاء"
          />
          <Button
            onClick={() => {
              saveAction();
            }}
            className={"save-btn"}
            text="اضافة"
          />
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
