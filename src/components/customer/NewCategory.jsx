import React, { useState } from 'react'
import { useHistory,useLocation } from 'react-router-dom/cjs/react-router-dom.min';

// import AppButton from '../common/button/Button'
// import AppInput from '../common/input/Input'

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";

import "./NewCustomer.css"

export default function NewCategory() {

    const [category, setCategory] = useState({})

    const history = useHistory();
    const location = useLocation();

    const handleChange = (key, value) => {
        let newCategory = { ...category }
        newCategory[key] = value
        setCategory(newCategory)
        console.log(key);
        console.log(value);
    }

    const navigateToAllCustomers = () => {
        const location = { pathname: "/admin/customers" }
        history.push(location)
    }

    const handleSubmit = () => {
        if (
            category.name
        ) {
            const url =
                restHelper.getURLPrefix(appConfig.host) +
                appConfig.services.customers.newCategory;

            category.customerId = location?.state?.customerId
            
            restHelper
                .postRequest(url, category)
                .then((res) => {
                    navigateToAllCustomers()
                })
                .catch((err) => {
                    alert("لم نتمكن من ادخال العميل");
                });
        } else {
            alert('لم يتم ادخال كل المدخلات');
        }
    }

    const formData = {
        name: {
            label: 'الاسم',
            value: category.name,
        },
    }

    return (
        <div className="new-customer-container">
            <div className="new-customer-header">ملف جديد</div>
            <div className="new-customer-fields">
                {Object.keys(formData).map((item) =>
                    <div className="customer-input-container">
                        <div className="customer-input-label">{formData[`${item}`].label}</div>
                        <input
                            type="text"
                            id={item}
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
