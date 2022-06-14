import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import Table from "../common/Table/Table";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import { createRowAction } from "../common/Table/tableHelper";
import AppButton from '../common/button/Button';

import "./OrdersByMontages.css"

export default function OrdersByMontage() {
    const [orders, setOrders] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const location = useLocation();

    useEffect(() => {
        let url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.orders.getOrdersByMontageId;

        restHelper
            .getRequest(url + id)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });
    }, []);

    const navigateToDetails = (orderId) => {
        const location = { pathname: "/order/" + orderId };
        history.push(location);
    };

    const navigateToNewOrder = () => {
        const location = { pathname: `/admin/montage/${id}/order/new` }
        history.push(location)
    }

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
        }
    ];

    return (
        <>
            <div className='montage-container'>
            <div className="montage-header">Customer: {location.state?.customerName}</div>
            <div className="montage-header-montage">Montage: {location.state?.montageName}</div>
                <div className="montage-new-order">
                    <AppButton onClick={navigateToNewOrder} text={"اضافه"} />
                </div>
                <div className='montages-container'>
                    <Table
                        rows={orders}
                        headers={headers}
                        rowActions={[
                            createRowAction("التفاصيل", orderId => { navigateToDetails(orderId) })
                        ]}
                    />
                </div>
            </div>
        </>
    )
}
