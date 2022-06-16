import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AppInput from '../common/input/Input'

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";

import "./AddOrderForMontage.css"

import { FileUploadButton } from '../common/uploadButton/uploadButton';


export default function AddOrderForMontage() {

    const [montage, setMontage] = useState({})
    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState([]);

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        let url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.montages.getMontageById;

        restHelper
            .getRequest(url + id)
            .then((res) => {
                setMontage({ ...res.data });
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });

    }, [])

    //get most recent order if found by montage
    useEffect(() => {
        let url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.orders.getLatestOrderByMontage;

        const data = {
            montage_id:id
        }
        restHelper
            .postRequest(url,data)
            .then((res) => {
                res.data.quantity = 0
                res.data.job_per_meter = 0
                // res.data.label_per_roll = 0
                console.log(res.data)
                setFormData({ ...res.data });
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });

    }, [])

    useEffect(() => {
        let newFormData = { ...formData }
        newFormData.roll_per_meter = ((parseFloat(montage.etgah_el_gar) + parseFloat(montage.gap)) * parseFloat(formData.label_per_roll)) / 100;
        setFormData(newFormData)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.label_per_roll])

    useEffect(() => {
        let newFormData = { ...formData }
        newFormData.job_per_meter = ((((parseFloat(montage.etgah_el_gar) + parseFloat(montage.gap))) * parseFloat(formData.quantity)) / parseFloat(montage.aps)) / 100
        setFormData(newFormData)
    }, [formData.quantity])

    const handleFileUpdated = (file, id) => {
        let newFiles = [...files];
        newFiles[id] = file;
        setFiles(newFiles);
      };

    const handleChange = (text, key) => {
        let keys = "";
        if (key.indexOf("-") > 0) keys = key.substr(0, key.indexOf("-"));
        else keys = key;
        let newFormData = { ...formData };
        newFormData[keys] = text;
        setFormData(newFormData);
    };

    const handleSubmit = () => {
        // new order

        let form = new FormData()
        formData.montage_id = id;

        form.append("montage_id", id);
        form.append("po", files[0]);
  
        form.append("quantity", formData.quantity);
        form.append("material_type", formData.material_type);
        form.append("lamination", formData.lamination);
        form.append("job_direction", formData.job_direction);
        form.append("job_per_meter", formData.job_per_meter);
        form.append("label_per_roll", formData.label_per_roll);
        form.append("roll_per_meter", formData.roll_per_meter);
        form.append("note", formData.note);

        const url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.orders.newOrder;

        const config = {
            headers: { "content-type": "multipart/form-data" },
            };

        restHelper
            .postRequest(url, form, config)
            .then((res) => {
                navigateToOrders(id)
            })
            .catch((err) => {
                alert("لم نتمكن من ادخال");
            });

    }

    const navigateToOrders = (id) => {
        const location = { pathname: `/admin/order/by-montage/${id}`
        ,state:{
            montageName:montage.job_name
        } }
        history.push(location)
    }
    const handleback = () => {
        history.goBack()
      }
    return (
        <div className='main_container'>
            <div className="inputs_container">
            <div className='data-header'>
                    Montage Data
            </div>
                <div className="inputs_section">
                        <div className="column">
                        <div className="part">
                            <div className="inputs_label">إسم الشغلانة</div>
                            <AppInput
                                id="job_name"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.job_name}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">تفاصيل الشغلانة</div>
                            <AppInput
                                id="type"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.type}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">كود السكينة</div>
                            <AppInput
                                id="skina_code"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.skina_code}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">اتجاه عرض</div>
                            <AppInput
                                id="etgah_el_ard"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.etgah_el_ard}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">اتجاه جر</div>
                            <AppInput
                                id="etgah_el_gar"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.etgah_el_gar}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">APS</div>
                            <AppInput
                                id="aps"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.aps}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">عدد الالوان</div>
                            <AppInput
                                id="color"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.color}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">دارافيل</div>
                            <AppInput
                                id="darafel"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.darafel}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">كود فرعي</div>
                            <AppInput
                                id="sub_code"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.sub_code}
                            />
                        </div>
                        </div>
                    <div className="column">
                        <div className="part">
                            <div className="inputs_label">جاب</div>
                            <AppInput
                                id="gap"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.gap}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">اللون الخاص</div>
                            <AppInput
                                id="special_color"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.special_color}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">ترس التكسير</div>
                            <AppInput
                                id="tars_el_takser"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.tars_el_takser}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="inputs_container">
                <div className='data-header'>
                    Order Data
                </div>
                <div className='inputs_section'>
                    <div className='column'>
                        <div className="part">
                            <div className="inputs_label">كمية</div>
                            <AppInput
                                id="quantity"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.quantity}
                                type={"number"}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">Job/m</div>
                            <AppInput
                                id="job_per_meter"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true, disabled : true }}
                                value={formData.job_per_meter}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">إتجاه الشغلة</div>
                            <AppInput
                                id="job_direction"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.job_direction}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                    </div>
                    <div className='column'>
                    <div className="part">
                            <div className="inputs_label">نوع الخامة</div>
                            <AppInput
                                id="material_type"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.material_type}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">Lamination</div>
                            <AppInput
                                id="lamination"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.lamination}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                    </div>
                </div>
                <div className='inputs_section'>
                <div className="part-note">
                    <div className="inputs_label">Note</div>
                    <textarea id="note" onChange={(e) => handleChange(e.target.value, e.target.id)} value={formData.note}></textarea>
                </div>
                </div>
                <div className='data-header'>
                    Quantity Data
                </div>
                <div className='inputs_section'>
                    <div className='column'>
                        <div className="part">
                            <div className="inputs_label">Label/Rolls</div>
                            <AppInput
                                id="label_per_roll"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.label_per_roll}
                                type={"number"}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                    </div>
                    <div className='column'>
                        <div className="part">
                            <div className="inputs_label">Roll per meter</div>
                            <AppInput
                                id="roll_per_meter"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true, disabled: true }}
                                value={formData.roll_per_meter}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">PO</div>
                            <FileUploadButton
                                runParentFunction={(file) => handleFileUpdated(file, 0)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttons_container">
                <div className="submit_button_div">
                    <button className="customer-submit" onClick={handleSubmit}>اضافة</button>
                </div>
                <div className="submit_button_div">
                    <button className="customer-submit" onClick={handleback}>رجوع</button>
                </div>
            </div>
        </div>
    )
}
