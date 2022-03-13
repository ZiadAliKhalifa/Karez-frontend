import React, { useEffect, useState } from "react";
import "./EditInventoryQty.css";
import { useDispatch } from "react-redux";
import {
  editRawMaterialById,
  editRawMaterialQty,
} from "../../../redux/rawMaterial/rawMaterialActions";
import AppInput from "../../common/input/Input";
import PropTypes from "prop-types";

function EditInventoryQtyRow({ rawMaterial, submit }) {
  const dispatch = useDispatch();

  const [initialRawMaterial] = useState(rawMaterial);
  const [addedValue, setAddedValue] = useState("0");
  const [toSubmit, setToSubmit] = useState(false);

  useEffect(() => {
    submit && setToSubmit(!submit);
  }, [submit]);

  useEffect(() => {
    submit && parseInt(addedValue) !== 0 && dispatch(editRawMaterialQty(1));
  }, [addedValue, dispatch, submit]);

  useEffect(() => {
    if (submit && !toSubmit && parseInt(addedValue) !== 0) {
      dispatch(
        editRawMaterialById(
          rawMaterial.id,
          parseInt(rawMaterial.price),
          parseInt(initialRawMaterial.quantity) + parseInt(addedValue),
          parseInt(rawMaterial.minimum_quantity),
          parseInt(rawMaterial.critical_quantity),
          rawMaterial.description
        )
      );
      setToSubmit(true);
    }
  }, [
    toSubmit,
    submit,
    addedValue,
    rawMaterial,
    dispatch,
    initialRawMaterial.quantity,
  ]);

  return (
    <div className="edit-raw-materials-qty-table-row">
      <div className="edit-raw-materials-qty-table-data-first">
        {rawMaterial.name}
      </div>
      <div className="edit-raw-materials-qty-table-data">
        {initialRawMaterial.quantity}
      </div>
      <div className="edit-raw-materials-qty-table-data">
        {parseInt(initialRawMaterial.quantity) + parseInt(addedValue)}
      </div>
      <div className="edit-raw-materials-qty-table-data-last">
        <AppInput
          type="number"
          inputClassName="edit-raw-materials-qty-input"
          InputProps={{ disableUnderline: true }}
          value={addedValue}
          onChange={(e) => {
            setAddedValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

EditInventoryQtyRow.propTypes = {
  rawMaterial: PropTypes.object,
  submit: PropTypes.bool,
};

export default EditInventoryQtyRow;
