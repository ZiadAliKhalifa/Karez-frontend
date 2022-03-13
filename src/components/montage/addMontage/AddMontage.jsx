import React, { useState } from 'react'
import AppInput from '../../common/input/Input'

export default function AddMontage() {

    const [formData, setFormData] = useState({})

    const handleChange = (text, key) => {
        let newFormData = { ...formData };
        newFormData[key] = text;
        setFormData(newFormData);
    }

    return (
        <>
            <div>AddMontage</div>

            <AppInput
                id='jobName'
                labelText='Job name'
                value={formData.jobName}
                onChange={e => handleChange(e.target.value, e.target.id)}
            />

        </>
    )
}
