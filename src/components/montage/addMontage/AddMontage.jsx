import React, { useEffect, useState } from "react";
import AppInput from "../../common/input/Input";
import Autocomplete from "../../common/autoComplete/AutoComplete";
import "./AddMontage.css";
import { FileUploadButton } from "../../common/uploadButton/uploadButton";
import AppButton from "../../common/button/Button";

import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";
import { useParams, useHistory, useLocation } from "react-router-dom";

export default function AddMontage() {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);

  const { id } = useParams();
  const location = useLocation();

  const history = useHistory();

  useEffect(()=>{
    const url =
    restHelper.getURLPrefix(appConfig.host) +
    appConfig.services.montages.getMontage.replace("{id}",id);

    restHelper.getRequest(url)
        .then(function (response) {
          console.log(response.data);
          setFormData(response.data);
        })
        .catch(function (error) {
          alert("Error while uploading")
        });

  },[id])

  const handleChange = (text, key) => {
    let keys = "";
    if (key.indexOf("-") > 0) keys = key.substr(0, key.indexOf("-"));
    else keys = key;
    let newFormData = { ...formData };
    newFormData[keys] = text;
    setFormData(newFormData);
  };

  const handleFileUpdated = (file, id) => {
    let newFiles = [...files]
    newFiles[id] = file
    setFiles(newFiles)
  }

  const handleSubmitMontage = () => {
    if (
      formData.job_name
    ) {
      const url =
        restHelper.getURLPrefix(appConfig.host) +
        appConfig.services.montages.newMontage;


      let form = new FormData();
      form.append("name", formData.name);
      form.append("montage_attachment", files[0])
      form.append("image_attachment", files[1])
      form.append("desgin_upload_file", files[2])
      form.append("po", files[3])

      form.append("customer_id", location.state.id)
      form.append("job_name", formData.job_name)
      form.append("skina_code", formData.skina_code)
      form.append("aps", formData.aps)
      form.append("color", formData.color)
      form.append("darafel", formData.darafel)
      form.append("type", formData.type)
      form.append("etgah_el_gar", formData.etgah_el_gar)
      form.append("gap", formData.gap)
      form.append("special_color", formData.special_color)
      form.append("tars_el_takser", formData.tars_el_takser)
      form.append("sub_code", formData.sub_code)
      form.append("etgah_el_ard", formData.etgah_el_ard)

      const config = {
        headers: { "content-type": "multipart/form-data" }
      };

      restHelper.postRequest(url, form, config)
        .then(function (response) {
          navigateToAllCustomers();
        })
        .catch(function (error) {
          alert("Error while uploading")
        });

    }
  }

  const navigateToAllCustomers = () => {
    history.push("/admin/customers");
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
            <div className="part">
              <FileUploadButton runParentFunction={file => handleFileUpdated(file, 0)} />
            </div>
            <div className="part">
              <FileUploadButton runParentFunction={file => handleFileUpdated(file, 1)} />
            </div>
            <div className="part">
              <FileUploadButton runParentFunction={file => handleFileUpdated(file, 2)} />
            </div>
            <div className="part">
              <FileUploadButton runParentFunction={file => handleFileUpdated(file, 3)} />
            </div>
          </div>
        </div>
      </div>
      <div className="submit-button">
        <AppButton onClick={handleSubmitMontage} text={"اضافه"} />
      </div>
    </div>
  );
}
