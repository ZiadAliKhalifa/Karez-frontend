import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Table from "../common/Table/Table";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { createRowAction } from "../common/Table/tableHelper";

export default function OrdersByMontage() {
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.getOrdersByMontageId;

    console.log(url);

    restHelper
      .getRequest(url + id)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  }, []);

  const navigateToDetails = () => {
    const location = { pathname: "/admin/order/details/" + id };
    history.replace(location);
  };

  const headers = [
    {
      key: "status",
      name: "الحاله",
    },
    {
      key: "submission_date",
      name: "التاريخ",
    },
    {
      key: "id",
      name: "الرقم التعريفي",
    },
  ];

  return (
    <>
      <div className="montage-container">
        <div className="montages-container">
          <Table
            rows={orders}
            headers={headers}
            rowActions={[createRowAction("التفاصيل", navigateToDetails)]}
          />
        </div>
      </div>
    </>
  );
}
