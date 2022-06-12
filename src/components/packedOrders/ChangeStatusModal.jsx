import React, { useState } from "react";
import "./PackedOrders.css";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modal/modalActions";
import Autocomplete from "../common/autoComplete/AutoComplete";


function ChangeStatusModal({ orderData, orderId, fetchUnPackedOrders }) {
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState("");
  const [orderQuantity, setOrderQuantity] = useState("0");
  const [formData, setFormData] = useState({});

  const handleChange = (text, key) => {
    let keys = "";
    if (key.indexOf("-") > 0) keys = key.substr(0, key.indexOf("-"));
    else keys = key;
    let newFormData = { ...formData };
    newFormData[keys] = text.backend_label;
    setFormData(newFormData);
  };

  const changeOrderStatusHandler = (orderId) => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.packOrder;

    const data = {
      id: orderId,
      order_status: formData.order_status,
    };

    restHelper
      .postRequest(url, data)
      .then((res) => {
        dispatch(closeModal());
        fetchUnPackedOrders();
        alert("تم تعبئة الطلب بنجاح");
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  };
  
  const options = [
    { label: 'Cutting', backend_label: "cut" },
    { label: 'Printing', backend_label: "print" },
    { label: 'Packing', backend_label: "packed" },
    { label: 'Partial Delivery', backend_label: "partial_delivery" },
    { label: 'Delivered', backend_label: "delivered" }
  ];
  return (
    <div className="packed-modal-container">
      <div className="packed-modal-title">
        {orderData?.montage_name} أدخل كمية طبع
      </div>
      <div className="packed-modal-input-label">Order Status</div>
      <div className="packed-modal-input-container">
        <Autocomplete
            id="order_status"
            type="dropdown"
            options={options}
            dropDownClassName="input"
            onChange={(e, newValue) => {
              handleChange(newValue, e.target.id);
            }}
          />
        {formData.order_status == "packed" &&(
          <>
          <div className="packed-modal-input-label">Order Quantity</div>
          <input
          type="number"
          className="packed-modal-input"
          value={orderQuantity}
          onChange={(e) => setOrderQuantity(e.target.value)}
        />
        </>
        )}
      </div>
      <div
        className="pack-modal-submit-container"
        onClick={() => changeOrderStatusHandler(orderId)}
      >
        <div className="pack-modal-submit-button">تأكيد</div>
      </div>
    </div>
  );
}

export default ChangeStatusModal;
