import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import AppInput from '../common/input/Input'

import { IMAGE_BASE_URL } from "../../consts/general.js"
import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";

export default function OrderDetails() {

    const [order, setOrder] = useState({})

    const { id } = useParams();

    useEffect(() => {

        let url =
            restHelper.getURLPrefix(appConfig.host) +
            appConfig.services.orders.getOrderDetails;

        restHelper
            .getRequest(url + id)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((err) => {
                alert("برجاء اعادة المحاولة");
            });
    }, [id])


    return (
        <div className='main_container'>
            <div className="inputs_container">
                <div className="header_lable">Montage Data</div>
                <div className="inputs_section">
                    <div>
                        <div className='column'>

                            <div className="part">
                                <div className="inputs_label">اسم مونتاج</div>
                                <AppInput
                                    id="job_name"
                                    inputClassName="input"
                                    InputProps={{ disableUnderline: true }}
                                    value={order.job_name}
                                />
                            </div>
                            <div className="part">
                                <div className="inputs_label">كود سكينا</div>
                                <AppInput
                                    id="skina_code"
                                    inputClassName="input"
                                    InputProps={{ disableUnderline: true }}
                                    value={order.skina_code}
                                />
                            </div>
                            <div className="part">
                                <div className="inputs_label">APS</div>
                                <AppInput
                                    id="aps"
                                    inputClassName="input"
                                    InputProps={{ disableUnderline: true }}
                                    value={order.aps}
                                />
                            </div>
                            <div className="part">
                                <div className="inputs_label">اللون</div>
                                <AppInput
                                    id="color"
                                    inputClassName="input"
                                    InputProps={{ disableUnderline: true }}
                                    value={order.color}
                                />
                            </div>
                            <div className="part">
                                <div className="inputs_label">دارافيل</div>
                                <AppInput
                                    id="darafel"
                                    inputClassName="input"
                                    InputProps={{ disableUnderline: true }}
                                    value={order.darafel}
                                />
                            </div>
                            <div className="part">
                            <div className="inputs_label">اتجاه عرض</div>
                            <AppInput
                                id="etgah_el_ard"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.etgah_el_ard}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="part">
                            <div className="inputs_label">نوع</div>
                            <AppInput
                                id="type"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.type}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label"> اتجاه جر</div>
                            <AppInput
                                id="etgah_el_gar"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.etgah_el_gar}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">فجوة </div>
                            <AppInput
                                id="gap"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.gap}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">لون خاص</div>
                            <AppInput
                                id="special_color"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.special_color}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">ترس التكسير</div>
                            <AppInput
                                id="tars_el_takser"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.tars_el_takser}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">كود فرعي</div>
                            <AppInput
                                id="sub_code"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.sub_code}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="inputs_container">
                <div className="header_lable">Montage Images</div>
                <div className="inputs_section">
                    <div style={{ margin: "50px" }}>
                        <h4>Sample</h4>
                        {
                            order.desgin_upload_file ? (
                                <a
                                    className="monategImageLink"
                                    href={`${IMAGE_BASE_URL}${order.desgin_upload_file}`}
                                    target="_blank"
                                >
                                    <img
                                    className="monategImages"
                                    src={`${IMAGE_BASE_URL}${order.desgin_upload_file}`}
                                    alt=""
                                    height="200px"
                                    width="200px"
                                    />
                                </a>
                                ) : (
                                <p>No image found</p>
                                )}
                    </div>
                    <div style={{ margin: "50px" }}>
                            <h4>Image</h4>
                            {
                            order.image_attachment ? (
                                <a
                                    className="monategImageLink"
                                    href={`${IMAGE_BASE_URL}${order.image_attachment}`}
                                    target="_blank"
                                >
                                    <img
                                    className="monategImages"
                                    src={`${IMAGE_BASE_URL}${order.image_attachment}`}
                                    alt=""
                                    height="200px"
                                    width="200px"
                                    />
                                </a>
                                ) : (
                                <p>No image found</p>
                                )}
                    </div>
                    <div style={{ margin: "50px" }}>
                        <h4>Montage Attachment</h4>
                        {
                        order.montage_attachment ? (
                            <a
                                className="monategImageLink"
                                href={`${IMAGE_BASE_URL}${order.montage_attachment}`}
                                target="_blank"
                            >
                                <img
                                className="monategImages"
                                src={`${IMAGE_BASE_URL}${order.montage_attachment}`}
                                alt=""
                                height="200px"
                                width="200px"
                                />
                            </a>
                            ) : (
                            <p>No image found</p>
                            )}
                    </div>
                </div>
            </div>
            <div className="inputs_container">
                <div className="header_lable">Order Data</div>
                <div className='inputs_section'>
                    <div className='column'>
                        <div className="part">
                            <div className="inputs_label">Quantity</div>
                            <AppInput
                                id="quantity"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.quantity}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">Job/m</div>
                            <AppInput
                                id="job_per_meter"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.job_per_meter}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">Job Direction</div>
                            <AppInput
                                id="job_direction"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.job_direction}
                            />
                        </div>
                    </div>
                    <div className='column'>
                        <div className="part">
                            <div className="inputs_label">Lamination</div>
                            <AppInput
                                id="lamination"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.lamination}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">Material Type</div>
                            <AppInput
                                id="material_type"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.material_type}
                            />
                        </div>
                    </div>
                </div>
                <div className='inputs_section'>
                <div className="part-note">
                    <div className="inputs_label">Note</div>
                    <textarea id="note" value={order.note} disabled={true}></textarea>
                </div>
                </div>
                <div className="header_lable">Quantity Data</div>
                <div className='inputs_section'>
                    <div className='column'>
                        <div className="part">
                            <div className="inputs_label">Roll per meter</div>
                            <AppInput
                                id="roll_per_meter"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.roll_per_meter}
                            />
                        </div>
                    </div>
                    <div className='column'>
                        <div className="part">
                            <div className="inputs_label">Label/Rolls</div>
                            <AppInput
                                id="label_per_roll"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={order.label_per_roll}
                            />
                        </div>
                    </div>
                </div>
                <div style={{padding:"20px"}}></div>
            </div>
        </div>
    )
}
