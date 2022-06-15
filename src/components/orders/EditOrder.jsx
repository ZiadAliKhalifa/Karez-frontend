import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AppInput from '../common/input/Input'
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "../common/autoComplete/AutoComplete";
import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";
import "./EditOrder.css"

import { FileUploadButton } from '../common/uploadButton/uploadButton';
import AddSkinaModal from "../montage/addMontage/AddSkinaModal";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/modalActions";
export default function EditOrder() {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({});
    const [skinaCodes, setSkinaCodes] = useState([]);
    const [files, setFiles] = useState([]);

    const history = useHistory();
    const { id } = useParams();

    //get skina codes
    useEffect(() => {
        const url =
          restHelper.getURLPrefix(appConfig.host) +
          appConfig.services.montages.getMontageSkinaCodes;
    
        restHelper
          .getRequest(url)
          .then((res) => {
            setSkinaCodes(res.data.map((code) => code.name));
          })
          .catch(function (error) {
            alert("برجاء اعادة المحاولة");
          });
      }, []);
    
    //get order details
    useEffect(() => {

        let url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.orders.getOrderDetails;

        restHelper
            .getRequest(url + id)
            .then((res) => {
                setFormData(res.data);
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });
    }, [id])

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
                setFormData({ ...res.data });
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });

    }, [])

    const addSkinaHandler = () => {
        dispatch(openModal(<AddSkinaModal setSkinaCodes={setSkinaCodes} />));
      };

    useEffect(() => {
        let newFormData = { ...formData }
        newFormData.roll_per_meter = ((parseFloat(formData.etgah_el_gar) + parseFloat(formData.gap)) * parseFloat(formData.label_per_roll)) / 100;
        setFormData(newFormData)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.label_per_roll])

    useEffect(() => {
        let newFormData = { ...formData }
        newFormData.job_per_meter = ((((parseFloat(formData.etgah_el_gar) + parseFloat(formData.gap))) * parseFloat(formData.quantity)) / parseFloat(formData.aps)) / 100
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
        form.append("montage_id", formData.montage);
        form.append("job_name", formData.job_name);
        form.append("type", formData.type);
        form.append("sub_code", formData.sub_code);
        form.append("skina_code", formData.skina_code);
        form.append("color", formData.color);
        form.append("darafel", formData.darafel);
        form.append("aps",formData.aps);
        form.append("gap", formData.gap);
        form.append("special_color", formData.special_color);
        form.append("tars_el_takser", formData.tars_el_takser);
        form.append("etgah_el_ard",formData.etgah_el_ard);
        form.append("etgah_el_gar", formData.etgah_el_gar);
        
        form.append("order_id", formData.id);
        form.append("quantity", formData.quantity);
        form.append("material_type", formData.material_type);
        form.append("lamination", formData.lamination);
        form.append("job_direction", formData.job_direction);
        form.append("job_per_meter", formData.job_per_meter);
        form.append("label_per_roll", formData.label_per_roll);
        form.append("roll_per_meter", formData.roll_per_meter);
        form.append("note", formData.note);
        form.append("po", files[0]);


        const url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.orders.editOrderAndMontage;

        const config = {
            headers: { "content-type": "multipart/form-data" },
            };

        restHelper
            .postRequest(url, form, config)
            .then((res) => {
                history.goBack()
            })
            .catch((err) => {
                alert("لم نتمكن من ادخال");
            });

    }

    const navigateToOrders = (id) => {
        const location = { pathname: `/admin/order/by-montage/${id}`
        ,state:{
            montageName:formData.job_name
        } }
        history.push(location)
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
                                value={formData.job_name}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">تفاصيل الشغلانة</div>
                                <AppInput
                                    id="type"
                                    inputClassName="input"
                                    InputProps={{ disableUnderline: true }}
                                    value={formData.type}
                                    onChange={(e) => handleChange(e.target.value, e.target.id)}
                                />
                        </div>
                        <div className="part">
                            <div className="inputs_label">كود السكينة</div>
                            <div className="skina-code-container">
                            <Autocomplete
                                id="skina_code"
                                type="dropdown"
                                options={skinaCodes}
                                dropDownClassName="input"
                                value={formData.skina_code}
                                onChange={(e, newValue) => {
                                handleChange(newValue, e.target.id);
                                }}
                            />
                            <AddIcon
                                className="skina-add-icon"
                                onClick={addSkinaHandler}
                            />
                            </div>
                        </div>
                        <div className="part">
                            <div className="inputs_label">APS</div>
                            <AppInput
                                id="aps"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.aps}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">عدد الالوان</div>
                            <AppInput
                                id="color"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.color}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">دارافيل</div>
                            <AppInput
                                id="darafel"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.darafel}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">كود فرعي</div>
                            <AppInput
                                id="sub_code"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.sub_code}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        </div>
                    <div className="column">
                        <div className="part">
                            <div className="inputs_label">اتجاه جر</div>
                            <AppInput
                                id="etgah_el_gar"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.etgah_el_gar}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">جاب</div>
                            <AppInput
                                id="gap"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.gap}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">اللون الخاص</div>
                            <AppInput
                                id="special_color"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.special_color}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">ترس التكسير</div>
                            <AppInput
                                id="tars_el_takser"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.tars_el_takser}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">اتجاه عرض</div>
                            <AppInput
                                id="etgah_el_ard"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={formData.etgah_el_ard}
                                onChange={(e) => handleChange(e.target.value, e.target.id)}
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
            <div className="submit_button_div">
                <button className="customer-submit" onClick={handleSubmit}>اضافة</button>
            </div>
        </div>
    )
}
