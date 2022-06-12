import React, { useState } from "react";
import "./PackedOrders.css";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modal/modalActions";

function PackModal({ orderData, orderId, fetchUnPackedOrders }) {
  const dispatch = useDispatch();
  const [orderQuantity, setOrderQuantity] = useState("0");
  const [orderQuantityError, setOrderQuantityError] = useState("");

  const packOrderValidation = () => {
    let isValid = true;
    if (orderQuantity.length === 0) {
      setOrderQuantityError("هذه الخانة مطلوبه");
      isValid = false;
    } else if (parseInt(orderQuantity) <= 0) {
      setOrderQuantityError("الكمية يجب أن تكون 1 على الأقل");
      isValid = false;
    } else {
      setOrderQuantityError("");
    }

    return isValid;
  };

  const packOrderHandler = (orderId) => {
    let isValid = packOrderValidation();
    if (isValid) {
      const url =
        restHelper.getURLPrefix(appConfig.host) +
        appConfig.services.orders.packOrder;

      const data = {
        id: orderId,
        qunatity: parseInt(orderQuantity),
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
    }
  };
  return (
    <div className="packed-modal-container">
      <div className="packed-modal-title">
        {orderData?.montage_name} أدخل كمية طبع
      </div>
      <div className="packed-modal-input-container">
        <div className="packed-modal-input-label">الكمية</div>
        <input
          type="number"
          className="packed-modal-input"
          value={orderQuantity}
          onChange={(e) => setOrderQuantity(e.target.value)}
        />
        {orderQuantityError && (
          <div className="packed-modal-input-error">{orderQuantityError}</div>
        )}
      </div>
      <div
        className="pack-modal-submit-container"
        onClick={() => packOrderHandler(orderId)}
      >
        <div className="pack-modal-submit-button">تأكيد</div>
      </div>
    </div>
  );
}

export default PackModal;
