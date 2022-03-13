import React, { useEffect, useRef, useState } from "react";
import "./DisplayOrders.css";

import EditIcon from "@mui/icons-material/Edit";
import Button from "../../common/button/Button";
import Table from "../../common/Table/Table";
import OrdersDetails from "../ordersDetails/OrdersDetails";

import { useHistory } from "react-router-dom";
import { convertIosFromateToDate } from "../../../helpers/generalUtility"
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByType } from "../../../redux/orders/ordersActions";
import { openModal } from "../../../redux/modal/modalActions";
import { createMenuItem } from "../../common/menu/menuHelper";

function DisplayOrders(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { orders, general } = useSelector((state) => state);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    dispatch(fetchOrdersByType(props.location.state));
  }, [props.location.state, dispatch]);

  useEffect(() => {
    const ordersArray = orders.orders.slice();
    ordersArray.forEach((order) => {
      order.type = order.type.name;
      order.date = convertIosFromateToDate(order.date);
      order.status = order.status.name
    });
    setOrdersData(ordersArray);
  }, [orders.orders]);

  const tableHeaders = [
    {
      key: "date",
      name: "التاريخ",
    },
    {
      key: "type",
      name: "نوع الطلبات",
    },
    {
    key: "status",
    name: "الحالة"
    }
  ];

  const editOrderItem = (rowData) => {
    history.push({
      pathname: `/orders/edit/${rowData.id}`,
      state: props.location.state,
    })
  };

  return (
    <div className="display-orders-conatiner">
      <div className="display-orders-header">الطلبات</div>
      <div className="display-orders-action-buttons-container">
        <div className="display-orders-action-button">
          <Button
            text="إضافة طلبات جديدة"
            onClick={() => history.push({
              pathname: "/orders/add",
              state: props.location.state,
            })}
          ></Button>
        </div>
      </div>
      <div className="display-orders-table-container">
        <Table
          headers={tableHeaders}
          rows={ordersData}
          tableHeight={"650px"}
          onRowClick={
            (rowData) =>
            dispatch(openModal(<OrdersDetails data={rowData} />))
          }
          rowActions={[
            createMenuItem("تعديل", editOrderItem, <EditIcon />),
          ]}
        />
      </div>
    </div>
  );
}

export default DisplayOrders;
