import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Table from "../common/Table/Table";

import AppButton from "../common/button/Button";
import MontageCategoriesModal from "./MontageCategoriesModal";
import { openModal } from "../../redux/modal/modalActions";

import { createRowAction } from "../common/Table/tableHelper";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";

import { useDispatch } from "react-redux";

import "./Customers.css";

export default function Customers() {
  const dispatch = useDispatch();

  const [customers, setCustomers] = useState([]);

  const history = useHistory();

  const navigateToCustomerDetails = (id) => {
    dispatch(openModal(<MontageCategoriesModal customerId={id} />));
  };

  const navigteToNewCustomer = () => {
    history.push("/admin/customer/new");
  };

  useEffect(() => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.customers.getCustomers;

    restHelper
      .getRequest(url)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  }, []);

  // Table headers
  const headers = [
    {
      key: "mobile_number",
      name: "رقم التليفون",
    },
    {
      key: "address",
      name: "العنوان",
    },
    {
      key: "name",
      name: "الاسم",
    },
    {
      key: "code",
      name: "الرقم التعريفي",
    },
  ];

  return (
    <>
      <div className="customers-container">
        <div className="customers-header">العملاء</div>
        <div className="customers-new">
          <AppButton onClick={navigteToNewCustomer} text={"اضافه"} />
        </div>

        <Table
          headers={headers}
          rows={customers}
          rowActions={[createRowAction("البيانات", navigateToCustomerDetails)]}
        />
      </div>
    </>
  );
}
