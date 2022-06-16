import React, { useEffect, useState } from "react";
import "./CanceledOrders.css";

import Table from "../common/Table/Table";
import { createRowAction } from "../common/Table/tableHelper";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { formatDateTime } from "../../utils/dateTime";

function CanceledOrders() {
  const history = useHistory();

  const [orders, setOrders] = useState([]);
  const [headers, setHeaders] = useState([]);

  const navigateToOrderDetails = (id) => {
    history.push("/order/" + id);
  };

  const fetchDeliveredOrders = () => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.canceledOrders;

    restHelper
      .getRequest(url)
      .then((res) => {
        setOrders(
          res.data.map((item) => {
            return {
              ...item,
              submission_date: formatDateTime(item.submission_date),
              packed_date: formatDateTime(item.packed_date),
              delivery_date: formatDateTime(item.delivery_date)
            };
          })
        );
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  };

  useEffect(() => {;
      setHeaders([
        {
          key: "delivery_date",
          name: "معاد التسليم"
        },
        {
          key: "delivery_quantity",
          name: "كمية التسليم"
        },
        {
          key: "status",
          name: "الحالة",
        },
        {
          key: "packed_date",
          name: "تاريخ التعبئة",
        },
        {
          key: "packed_quantity",
          name: "كمية التعبئة",
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
  }, []);

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  return (
    <>
      <Table
        headers={headers}
        rows={orders}
        rowActions={[
              createRowAction("البيانات", navigateToOrderDetails)
        ]
        }
      />
    </>
  );
}

export default CanceledOrders;
