import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../../common/button/Button";
import Table from "../../common/Table/Table";
import ConfirmationBox from "../../common/confirmationBox/ConfirmationBox";

import { openModal } from "../../../redux/modal/modalActions";
import { fetchRawMaterials } from "../../../redux/rawMaterial/rawMaterialActions";
import { createMenuItem } from "../../common/menu/menuHelper";
import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";

import "./DisplayInventory.css";

function DisplayInventory() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { rawMaterial } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const tableHeaders = [
    {
      key: "critical_quantity",
      name: "الحد الأدنى للكمية",
    },
    {
      key: "minimum_quantity",
      name: "الحد الأدنى للكمية",
    },
    {
      key: "quantity",
      name: "الكمية",
    },
    {
      key: "price",
      name: "السعر",
    },
    {
      key: "name",
      name: "اسم",
    },
  ];

  const errorDispatcher = (
    message = "حدث خطأ ما يرجى المحاولة فى وقت لاحق"
  ) => {
    dispatch(
      openModal(<h3 style={{ padding: "5px 20px 5px 20px" }}>{message}</h3>)
    );
  };

  const deleteInventoryItem = async (rowData) => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.inventory.deleteItem.replace("{id}", rowData.id);
    const result = await restHelper.deleteRequest(url);
    if (result.status === 200) {
      dispatch(fetchRawMaterials());
    } else errorDispatcher();
  };

  const confirmDeleteInventoryItem = (rowData) => {
    dispatch(
      openModal(
        <ConfirmationBox
          msg={` هل أنت متأكد أنك تريد الحذف ${rowData.name}`}
          saveAction={() => {
            deleteInventoryItem(rowData);
          }}
        />
      )
    );
  };

  const editInventoryItem = (rowData) => {
    history.push({ pathname: "/inventory/add", state: rowData });
  };

  return (
    <div className="display-inventory-conatiner">
      <div className="display-inventory-header">المواد الخام</div>
      <div className="display-inventory-action-buttons-container">
        <div className="display-inventory-action-button">
          <Button
            text="إضافة مادة خام جديدة"
            onClick={() => history.push("/inventory/add")}
          ></Button>
        </div>
        <div className="display-inventory-action-button">
          <Button
            text="تعديل كميات المواد الخام"
            onClick={() => history.push("/inventory/edit-qty")}
          ></Button>
        </div>
      </div>
      <div className="display-inventory-table-container">
        <Table
          tableHeight={"650px"}
          headers={tableHeaders}
          rows={rawMaterial.rawMaterials}
          searchable={true}
          datepicker={false}
          rowActions={[
            createMenuItem("تعديل", editInventoryItem, <EditIcon />),
            createMenuItem("حذف", confirmDeleteInventoryItem, <DeleteIcon />),
          ]}
        />
      </div>
    </div>
  );
}

export default DisplayInventory;
