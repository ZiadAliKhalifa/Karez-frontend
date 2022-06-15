import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import Table from "../common/Table/Table";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { createRowAction } from "../common/Table/tableHelper";

import AppButton from "../common/button/Button";

import "./CustomerDetails.css";

export default function CustomerDetails() {
  const [customer, setCustomer] = useState({});
  const [montages, setMontages] = useState([]);

  const { id, categoryId } = useParams();
  const history = useHistory();

  const navigteToNewMontage = () => {
    const location = {
      pathname: `/admin/montage/new`,
      state: {
        id: id,
        categoryId: categoryId,
      },
    };
    history.push(location);
  };

  useEffect(() => {
    // Get customer details
    let url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.customers.getCustomers;

    restHelper
      .getRequest(`${url}${id}`)
      .then((res) => {
        setCustomer({ ...res.data });
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });

    // Get customer orders
    url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.montages.getMontagebyCategory;

    restHelper
      .getRequest(`${url}${categoryId}`)
      .then((res) => {
        setMontages(res.data);
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  }, []);

  useEffect(() => {
    // Get customer orders
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.montages.getMontagebyCategory;

    restHelper
      .getRequest(`${url}${categoryId}`)
      .then((res) => {
        setMontages(res.data);
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  }, [customer]);

  const headers = [
    {
      key: "type",
      name: "النوع",
    },
    {
      key: "sub_code",
      name: "الرقم التعريفي",
    },
    {
      key: "job_name",
      name: "الاسم",
    },
  ];

  const navigateToDetails = (montageId) => {
    const location = {
      pathname: "/admin/montage/details/" + montageId ,
      state: {
        id: id,
        categoryId: categoryId,
      },
    };
    history.push(location);
  };
  // console.log(montageName)

  const navigateToListOfOrders = (montageId) => {
    const rowIndex = montages.findIndex(obj => obj.id === montageId)
    const location = { 
      pathname: "/admin/order/by-montage/" + montageId,
      state: {
        montageName: montages[rowIndex].job_name,
        customerName: customer.name,
    },};
    history.push(location);
  };

  return (
    <>
      <div className="montage-container">
        <div className="montage-header">{customer.name}</div>
        <div className="customers-new">
          <AppButton onClick={navigteToNewMontage} text={"اضافه مونتاج"} />
        </div>
        <div className="montage-customer-details">
          <div className="montage-customer-details-item">
            <div className="montage-customer-details-item-header">Code</div>
            <div className="montage-customer-details-item-data">
              {customer.code}
            </div>
          </div>
          <div className="montage-customer-details-item">
            <div className="montage-customer-details-item-header">
              Mobile Number
            </div>
            <div className="montage-customer-details-item-data">
              {customer.mobile_number}
            </div>
          </div>
          <div className="montage-customer-details-item">
            <div className="montage-customer-details-item-header">Address</div>
            <div className="montage-customer-details-item-data">
              {customer.address}
            </div>
          </div>
        </div>

        <div className="montages-container">
          <Table
            rows={montages}
            headers={headers}
            rowActions={[
              // createRowAction("اعادة الطلب", reorder),
              createRowAction("التفاصيل", (montageId) => {
                navigateToDetails(montageId);
              }),
              // createRowAction("edit", edit),
              createRowAction("الطلبات", (montageId) => {
                navigateToListOfOrders(montageId);
              }),
            ]}
          />
        </div>
      </div>
    </>
  );
}
