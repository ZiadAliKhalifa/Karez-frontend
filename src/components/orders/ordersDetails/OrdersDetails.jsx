/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./OrdersDetails.css";
import Table from "../../common/Table/Table";
import appConfig from "../../../config.json";
import restHelper from "../../../helpers/RestHelper";

const OrdersDetails = ({ data }) => {
  const tableHeaders = [
    {
      key: "quantity",
      name: "كمية",
    },
    {
      key: "recipe",
      name: "الوصفة",
    },
  ];

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    getOrdersData();
  }, []);

  const getOrdersData = async () => {
    const url = `${restHelper.getURLPrefix(
      appConfig.host
    )}${appConfig.services.orders.getItemsDetailsById.replace(
      "{id}",
      data.id
    )}`;
    const orderDetail = await restHelper.getRequest(url);

    if (orderDetail.status === 200) {
      orderDetail.data.data.forEach((detail) => {
        detail.recipe = detail.recipe?.name;
      });
      setOrderDetails(orderDetail.data.data);
    } else setOrderDetails([]);
  };

  return (
    <div className={"ordersDetails-container"}>
      <h1 className={"container-header"}>تفاصيل الطلب</h1>
      <hr className={"section-line"} />
      <div>
        <span className={"label"}>نوع الطلب: </span>
        <span className={"label-results"}>{data.type}</span>
      </div>
      <div>
        <span className={"label"}>التاريخ: </span>
        <span className={"label-results"}>{data.date}</span>
      </div>
      <hr className={"section-line"} />
      <div className={"table-section"}>
        <Table
          headers={tableHeaders}
          rows={orderDetails}
          tableHeight={"300px"}
          rowActions={false}
        />
      </div>
    </div>
  );
};

export default OrdersDetails;
