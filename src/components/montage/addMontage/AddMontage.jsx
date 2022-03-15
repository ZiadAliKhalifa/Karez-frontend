import React, { useState } from "react";
import AppInput from "../../common/input/Input";
import Autocomplete from "../../common/autoComplete/AutoComplete";
import "./AddMontage.css";

export default function AddMontage() {
  const [formData, setFormData] = useState({});

  const handleChange = (text, key) => {
    let keys = "";
    if (key.indexOf("-") > 0) keys = key.substr(0, key.indexOf("-"));
    else keys = key;
    console.log(keys);
    console.log(text);
    let newFormData = { ...formData };
    newFormData[keys] = text;
    setFormData(newFormData);
    console.log(newFormData);
  };

  return (
    <div className="main_container">
      <div className="inputs_container">
        <div className="header_lable">AddMontage</div>
        <div className="inputs_section">
          <div>
            <div className="part">
              <div className="inputs_label">اسم العمل</div>
              <AppInput
                id="job_name"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.job_name}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
            </div>
            <div className="part">
              <div className="inputs_label">كود سكينا </div>
              {/* <AppInput
                  id="jobName"
                  inputClassName="input"
                  InputProps={{ disableUnderline: true }}
                  value={formData.jobName}
                  onChange={(e) => handleChange(e.target.value, e.target.id)}
                /> */}
              <Autocomplete
                id="skina_code"
                type="dropdown"
                options={["amr", "abdo"]}
                dropDownClassName="input"
                value={formData.skina_code}
                onChange={(e, newValue) => {
                  debugger;
                  handleChange(newValue, e.target.id);
                }}
              />
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
              <div className="inputs_label">اللون</div>
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
          </div>
          <div className="column">
            <div className="part">
              <div className="inputs_label">نوع</div>
              <AppInput
                id="type"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.type}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
            </div>
            <div className="part">
              <div className="inputs_label"> اتجاه جر</div>
              <Autocomplete
                id="etgah_el_gar"
                type="dropdown"
                options={["amr", "abdo"]}
                dropDownClassName="input"
                value={formData.etgah_el_gar}
                onChange={(e, newValue) => handleChange(newValue, e.target.id)}
              />
            </div>
            <div className="part">
              <div className="inputs_label">فجوة </div>
              <AppInput
                id="gap"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.gap}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
            </div>
            <div className="part">
              <div className="inputs_label">لون خاص</div>
              <AppInput
                id="special_color"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.special_color}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
            </div>
            <div className="part">
              <div className="inputs_label"> ترس التكسير</div>
              <AppInput
                id="tars_el_takser"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.tars_el_takser}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
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
                value={formData.sub_code}
                onChange={(e) => handleChange(e.target.value, e.target.id)}
              />
            </div>
            <div className="part">
              <div className="inputs_label">اتجاه عرض</div>
              <Autocomplete
                id="etgah_el_ard"
                type="dropdown"
                options={["amr", "abdo"]}
                dropDownClassName="input"
                value={formData.etgah_el_ard}
                onChange={(e, newValue) => handleChange(newValue, e.target.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
