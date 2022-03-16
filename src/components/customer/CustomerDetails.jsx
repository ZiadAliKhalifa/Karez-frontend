import React, { useState, useEffect } from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom';

import Table from '../common/Table/Table';

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { createRowAction } from "../common/Table/tableHelper";

import AppButton from "../common/button/Button";

import "./CustomerDetails.css"

export default function CustomerDetails() {

    const [customer, setCustomer] = useState({})
    const [montages, setMontages] = useState([])

    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    
    const navigteToNewMontage = () => {
        history.push("/admin/montage/new");
      }

    useEffect(() => {

        // Get customer details
        let url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.customers.getCustomers;

        restHelper
            .getRequest(url + id)
            .then((res) => {
                setCustomer({ ...res.data })
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });

        // Get customer orders
        url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.montages.getMontagesByCustomerId;

        restHelper
            .getRequest(url + id)
            .then((res) => {
                console.log(res.data);
                setMontages(res.data)
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });
    }, [])

    useEffect(() => {
        // Get customer orders
        const url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.montages.getMontagesByCustomerId;

        restHelper
            .getRequest(url + id)
            .then((res) => {
                setMontages(res.data)
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });
    }, [customer])


    const headers = [
        {
            key: "sub_code",
            name: "الرقم التعريفي",
        },
        {
            key: "type",
            name: "النوع",
        },
        {
            key: "job_name",
            name: "الاسم",
        }
    ];

    const edit = (montageId) => {
        history.push(`/admin/montage/new/${montageId}`)
    }

    const reorder = (montageId) => {
        // API request to reorder
        const url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.montages.reorderMontageById;

        const data = {
            id: montageId
        }

        restHelper
            .postRequest(url, data)
            .then((res) => {
                // Hacky way to reset the orders for the customer
                setCustomer("")
                setCustomer(customer)
            })
            .catch((err) => {
                alert("لا يمكن اعادة الطلب");
            });
    }

    const navigateToDetails = () => {
        const location = { pathname: "/admin/montage/details/" + id }
        history.replace(location)
    }

    const navigateToListOfOrders = () => {
        const location = { pathname: "/admin/order/by-montage/" + id }
        history.replace(location)
    }

    return (
        <>
            <div className='montage-container'>
                <div className='montage-header'>{customer.name}</div>
                <div className="customers-new">
                    <AppButton onClick={navigteToNewMontage} text={"اضافه مونتاج"} />
                </div>
                <div className='montage-customer-details'>
                    <div className='montage-customer-details-item'>
                        <div className='montage-customer-details-item-header'>Code</div>
                        <div className='montage-customer-details-item-data'>{customer.code}</div>
                    </div>
                    <div className='montage-customer-details-item'>
                        <div className='montage-customer-details-item-header'>Mobile Number</div>
                        <div className='montage-customer-details-item-data'>{customer.mobile_number}</div>
                    </div>
                    <div className='montage-customer-details-item'>
                        <div className='montage-customer-details-item-header'>Address</div>
                        <div className='montage-customer-details-item-data'>{customer.address}</div>
                    </div>
                </div>

                <div className='montages-container'>
                    <Table
                        rows={montages}
                        headers={headers}
                        rowActions={[
                            createRowAction("اعادة الطلب", reorder),
                            createRowAction("التفاصيل", navigateToDetails),
                            createRowAction("الطلبات", navigateToListOfOrders),
                            createRowAction("edit", edit)
                        ]}
                    />
                </div>
            </div>
        </>
    )
}
