import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppInput from '../common/input/Input'

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";

import "./AddOrderForMontage.css"

export default function AddOrderForMontage() {

    const [montage, setMontage] = useState({})

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


    return (
        <div className='main_container'>

            <div className="inputs_container">
                <div className="inputs_section">
                    <div>
                        <div className="part">
                            <div className="inputs_label">اسم العمل</div>
                            <AppInput
                                id="job_name"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.job_name}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">كود سكينا </div>
                            <AppInput
                                id="skina_code"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.skina_code}
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
                            <div className="inputs_label">اللون</div>
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
                    </div>
                    <div className="column">
                        <div className="part">
                            <div className="inputs_label">نوع</div>
                            <AppInput
                                id="type"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.type}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label"> اتجاه جر</div>
                            <AppInput
                                id="etgah_el_gar"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.etgah_el_gar}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">فجوة </div>
                            <AppInput
                                id="gap"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.gap}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label">لون خاص</div>
                            <AppInput
                                id="special_color"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.special_color}
                            />
                        </div>
                        <div className="part">
                            <div className="inputs_label"> ترس التكسير</div>
                            <AppInput
                                id="tars_el_takser"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.tars_el_takser}
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="part">
                            <div className="inputs_label">كود فرعي </div>
                            <AppInput
                                id="sub_code"
                                inputClassName="input"
                                InputProps={{ disableUnderline: true }}
                                value={montage.sub_code}
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
                    </div>
                </div>
            </div>
        </div>
    )
}
