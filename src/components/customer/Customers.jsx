import React, { useEffect, useState } from "react";

import Table from "../common/Table/Table";
import { createRowAction } from "../common/Table/tableHelper";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const history = useHistory();

  const navigateToCustomerDetails = (id) => {
    history.push("/customer/" + id);
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
      key: "name",
      name: "الاسم",
    },
    {
      key: "code",
      name: "الرقم التعريفي",
    },
    {
      key: "mobile_number",
      name: "رقم التليفون",
    },
    {
      key: "address",
      name: "العنوان",
    },
  ];


  return (
    <>
      <Table
        headers={headers}
        rows={customers}
        rowActions={[createRowAction("البيانات", navigateToCustomerDetails)]}
      />
    </>
  );
}
