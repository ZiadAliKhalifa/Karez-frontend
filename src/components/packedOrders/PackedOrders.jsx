import React, { useEffect, useState } from "react";
import "./PackedOrders.css";

import Table from "../common/Table/Table";
import { createRowAction } from "../common/Table/tableHelper";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { formatDateTime } from "../../utils/dateTime";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/modalActions";
import PackModal from "./PackModal";

function PackedOrders() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isPacked, setIsPacked] = useState();
  const [orders, setOrders] = useState([]);
  const [headers, setHeaders] = useState([]);

  const navigateToOrderDetails = (id) => {
    history.push("/order/" + id);
  };

  const fetchPackedOrders = () => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.getPackedOrders;

    restHelper
      .getRequest(url)
      .then((res) => {
        setOrders(
          res.data.map((item) => {
            return {
              ...item,
              submission_date: formatDateTime(item.submission_date),
              packed_date: formatDateTime(item.packed_date),
            };
          })
        );
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  };

  const fetchUnPackedOrders = () => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.getUnPackedOrders;

    restHelper
      .getRequest(url)
      .then((res) => {
        setOrders(
          res.data.map((item) => {
            return {
              ...item,
              submission_date: formatDateTime(item.submission_date),
            };
          })
        );
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  };

  const deliveryHandler = (orderId) => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.deliverPackedOrder;

    const reqData = {
      id: orderId,
    };

    restHelper
      .postRequest(url, reqData)
      .then((res) => {
        fetchPackedOrders();
        alert("تم تأكيد الاستلام بنجاح");
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  };

  const dispatchPackedModal = (orderId) => {
    const orderData = orders.find((order) => order.id === orderId);
    dispatch(
      openModal(
        <PackModal
          orderData={orderData}
          orderId={orderId}
          fetchUnPackedOrders={fetchUnPackedOrders}
        />
      )
    );
  };

  useEffect(() => {
    if (location.pathname === "/printer/unpacked") {
      setIsPacked(false);
      setHeaders([
        {
          key: "status",
          name: "الحالة",
        },
        {
          key: "submission_date",
          name: "تاريخ التسجيل",
        },
        {
          key: "montage_name",
          name: "المونتاج",
        },
        {
          key: "customer_name",
          name: "العميل",
        },
        {
          key: "id",
          name: "الرقم التعريفي",
        },
      ]);
    } else {
      setIsPacked(true);
      setHeaders([
        {
          key: "status",
          name: "الحالة",
        },

        {
          key: "quantity",
          name: "الكمية",
        },
        {
          key: "packed_date",
          name: "تاريخ التعبئة",
        },
        {
          key: "submission_date",
          name: "تاريخ التسجيل",
        },
        {
          key: "montage_name",
          name: "المونتاج",
        },
        {
          key: "customer_name",
          name: "العميل",
        },
        {
          key: "id",
          name: "الرقم التعريفي",
        },
      ]);
    }
  }, [location.pathname]);

  useEffect(() => {
    isPacked ? fetchPackedOrders() : fetchUnPackedOrders();
  }, [isPacked]);

  return (
    <>
      <Table
        headers={headers}
        rows={orders}
        rowActions={
          isPacked
            ? [
              createRowAction("البيانات", navigateToOrderDetails),
              createRowAction("تأكيد الاستلام", deliveryHandler),
            ]
            : [
              createRowAction("البيانات", navigateToOrderDetails),
              createRowAction("تعبئة الطلب", dispatchPackedModal),
            ]
        }
      />
    </>
  );
}

export default PackedOrders;
