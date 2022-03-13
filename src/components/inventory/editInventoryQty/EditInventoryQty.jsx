import React, { useEffect, useState } from "react";
import "./EditInventoryQty.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRawMaterials } from "../../../redux/rawMaterial/rawMaterialActions";
import EditInventoryQtyRow from "./EditInventoryQtyRow";
import AppButton from "../../common/button/Button";
import { useHistory } from "react-router-dom";
import { openModal } from "../../../redux/modal/modalActions";
import { editRawMaterialQty } from "../../../redux/rawMaterial/rawMaterialActions";
import { omniSearch } from "../../../helpers/searchUtility";
import AppInput from "../../common/input/Input";

function EditInventoryQty() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { rawMaterial } = useSelector((state) => state);

  const [submit, setSubmit] = useState(false);
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    Object.keys(rawMaterial.error).length !== 0 &&
      dispatch(
        openModal(
          <h3 style={{ padding: "5px 20px 5px 20px" }}>
            حدث خطأ ما يرجى المحاولة فى وقت لاحق
          </h3>
        )
      );
    setSubmit(false);
    setIsFirstSubmit(true);
  }, [rawMaterial.error, dispatch]);

  useEffect(() => {
    if (rawMaterial.editQtyRequests === 0) {
      dispatch(fetchRawMaterials());
      setSubmit(false);
    }
  }, [rawMaterial.editQtyRequests, dispatch]);

  useEffect(() => {
    if (
      !isFirstSubmit &&
      Object.keys(rawMaterial.error).length === 0 &&
      rawMaterial.editQtyRequests === 0
    ) {
      dispatch(
        openModal(
          <h3 style={{ padding: "5px 20px 5px 20px" }}>
            تم تعديل كميات المواد الخام بنجاح
          </h3>
        )
      );
      setIsFirstSubmit(true);
      history.push("/Inventory");
    }
  }, [isFirstSubmit, rawMaterial.error, dispatch, rawMaterial.editQtyRequests]);

  return (
    <div className="edit-raw-material-qty-container">
      <div className="edit-raw-material-qty-header">
        تعديل كميات المواد الخام
      </div>
      <div className="edit-raw-material-qty-search-container">
        <div className="edit-raw-material-qty-search-label">بحث</div>
        <AppInput
          type="text"
          placeholder="بحث"
          inputClassName="edit-raw-material-qty-search-input"
          InputProps={{ disableUnderline: true }}
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
      </div>
      <div className="underline"></div>
      <div className="edit-raw-materials-qty-table-container">
        <div className="edit-raw-materials-qty-table-row">
          <div className="edit-raw-materials-qty-table-header-first">الاسم</div>
          <div className="edit-raw-materials-qty-table-header">
            الكمية الحالية
          </div>
          <div className="edit-raw-materials-qty-table-header">
            الكمية النهائية
          </div>
          <div className="edit-raw-materials-qty-table-header-last">
            الكمية الإضافية
          </div>
        </div>
        {!rawMaterial.isLoading &&
          omniSearch(rawMaterial.rawMaterials, searchPhrase).map((item) => (
            <EditInventoryQtyRow
              rawMaterial={item}
              submit={submit}
              key={item.id}
            />
          ))}
      </div>
      <div className="edit-raw-materials-qty-actions-container">
        <div className="edit-raw-materials-qty-actions-subcontainer">
          <AppButton
            className="edit-raw-materials-qty-cancel"
            onClick={() => history.push("/Inventory")}
            text="إلغاء"
          />
        </div>
        <div className="edit-raw-materials-qty-actions-subcontainer">
          <AppButton
            className="edit-raw-materials-qty-submit"
            onClick={() => {
              setSubmit(true);
              setIsFirstSubmit(false);
              dispatch(editRawMaterialQty(-rawMaterial.editQtyRequests));
            }}
            text="حفظ"
          />
        </div>
      </div>
    </div>
  );
}

export default EditInventoryQty;
