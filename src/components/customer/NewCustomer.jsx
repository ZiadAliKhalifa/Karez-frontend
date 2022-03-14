import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import AppButton from '../common/button/Button'
import AppInput from '../common/input/Input'

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";

import "./NewCustomer.css"

export default function NewCustomer() {

    const [customer, setCustomer] = useState({})

    const history = useHistory();

    const handleChange = (key, value) => {
        let newCustomer = { ...customer }
        newCustomer[key] = value
        setCustomer(newCustomer)
    }

    const navigateToAllCustomers = () => {
        const location = { pathname: "/admin/customers" }
        history.replace(location)
    }

    const handleSubmit = () => {
        if (
            customer.name &&
            customer.code &&
            customer.mobile_number &&
            customer.address
        ) {
            const url =
                restHelper.getURLPrefix(appConfig.host) +
                appConfig.services.customers.newCustomer;

            restHelper
                .postRequest(url, customer)
                .then((res) => {
                    navigateToAllCustomers()
                })
                .catch((err) => {
                    alert("لم نتمكن من ادخال العميل");
                });
        } else {
            alert('لم يتم ادخال كل المدخلات')
        }
    }

    return (
        <div className="new-customer-container">
            <div className="new-customer-header">عميل جديد</div>
            <div className="new-customer-fields">
                <div className="customer-input">
                    <AppInput
                        labelText='الاسم'
                        id="name"
                        value={customer.name}
                        onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                </div>
                <div className="customer-input">
                    <AppInput
                        labelText='الكود'
                        id="code"
                        value={customer.code}
                        onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                </div>
                <div className="customer-input">
                    <AppInput
                        labelText='رقم التليفون'
                        id="mobile_number"
                        value={customer.mobile_number}
                        onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                </div>
                <div className="customer-input">
                    <AppInput
                        labelText='العنوان'
                        id="address"
                        value={customer.address}
                        onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                </div>

                <AppButton text={"اضافة"} onClick={handleSubmit} />
            </div>
        </div>
    )
}
