import React, { useState,useEffect } from "react";
import "./PackedOrders.css";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modal/modalActions";
import Autocomplete from "../common/autoComplete/AutoComplete";


function ChangeStatusModal({ orderData, orderId, fetchUnderProcessingOrders }) {
  const dispatch = useDispatch();
  const [orderChoices, setOrderChoices] = useState("");
  const [orderPackingQuantity, setOrderPackingQuantity] = useState("0");
  const [orderDeliveryQuantity, setOrderDeliveryQuantity] = useState("0");
  const [formData, setFormData] = useState({});



  useEffect(() => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.getOrderStatusChoices;
    const data = {
      id:orderId
    }
    restHelper
      .postRequest(url,data)
      .then((res) => {
        setOrderChoices(res.data.map((code) => code.status_choice));
      })
      .catch(function (error) {
        alert("برجاء اعادة المحاولة");
      });
  }, []);

  const handleChange = (text, key) => {
    let keys = "";
    if (key.indexOf("-") > 0) keys = key.substr(0, key.indexOf("-"));
    else keys = key;
    let newFormData = { ...formData };
    newFormData[keys] = text;
    setFormData(newFormData);
  };

  const changeOrderStatusHandler = (orderId,orderPackingQuantity,orderDeliveryQuantity) => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.updateOrderStatus;

    const data = {
      id: orderId,
      order_status: formData.order_status,
      order_packing_quantity: orderPackingQuantity,
      order_delivery_quantity: orderDeliveryQuantity
    };

    restHelper
      .postRequest(url, data)
      .then((res) => {
        dispatch(closeModal());
        fetchUnderProcessingOrders();
        alert("تم تغير الحالة بنجاح");
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  };
  
  console.log(formData.order_status)
  return (
    <div className="packed-modal-container">
      <div className="packed-modal-title">
        {orderData?.montage_name} تغير الحالة ل</div>
      <div className="packed-modal-input-label">Order Status</div>
      <div className="packed-modal-input-container">
        <div className="order-status-modal-auto-complete">
        <Autocomplete
            id="order_status"
            type="dropdown"
            options={orderChoices}
            dropDownClassName="input"
            value={formData.order_status}
            onChange={(e, newValue) => {
              handleChange(newValue, e.target.id);
            }}
          />
        </div>
        {formData.order_status == "Packed" &&(
          <>
          <div className="packed-modal-input-label">Order Packed Quantity</div>
          <input
          type="number"
          className="packed-modal-input"
          value={orderPackingQuantity}
          onChange={(e) => setOrderPackingQuantity(e.target.value)}
        />
        </>
        )}
        {formData.order_status == "Delivered" &&(
          <>
          <div className="packed-modal-input-label">Order Delivered Quantity</div>
          <input
          type="number"
          className="packed-modal-input"
          value={orderDeliveryQuantity}
          onChange={(e) => setOrderDeliveryQuantity(e.target.value)}
        />
        </>
        )}
      </div>
      <div
        className="pack-modal-submit-container"
        onClick={() => changeOrderStatusHandler(orderId,orderPackingQuantity,orderDeliveryQuantity)}
      >
        <div className="pack-modal-submit-button">تأكيد</div>
      </div>
    </div>
  );
}

export default ChangeStatusModal;
