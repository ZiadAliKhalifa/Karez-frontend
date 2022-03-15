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

    const formData = {
        name: {
            label: 'الاسم',
            value: customer.name,
        },
        code: {
            label: 'الكود',
            value: customer.code,
        },
        mobile: {
            label: 'رقم التليفون',
            value: customer.mobile_number,
        },
        address: {
            label: 'العنوان',
            value: customer.address,
        },
    }

    return (
        <div className="new-customer-container">
            <div className="new-customer-header">عميل جديد</div>
            <div className="new-customer-fields">
                {Object.keys(formData).map(item =>
                    <div className="customer-input-container">
                        <div className="customer-input-label">{formData[`${item}`].label}</div>
                        <input
                            type="text"
                            className='customer-input'
                            value={formData[`${item}`].value}
                            onChange={(e) => handleChange(e.target.id, e.target.value)}
                        />
                    </div>
                )}
                <button className="customer-submit" onClick={handleSubmit}>اضافة</button>
            </div>
        </div>
    )
}
