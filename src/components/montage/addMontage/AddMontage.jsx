import React, { useEffect, useState } from "react";
import AppInput from "../../common/input/Input";
import Autocomplete from "../../common/autoComplete/AutoComplete";
import "./AddMontage.css";
import { FileUploadButton } from "../../common/uploadButton/uploadButton";
import AppButton from "../../common/button/Button";
import AddIcon from "@mui/icons-material/Add";

import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/modal/modalActions";
import AddSkinaModal from "./AddSkinaModal";

export default function AddMontage() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [skinaCodes, setSkinaCodes] = useState([]);
  const [skinaCodesData, setSkinaCodesData] = useState([]);
  const [etgahElGar, setEtgahElGar] = useState("");
  const [etgahElArd, setEtgahElArd] = useState("");
  const [aps, setAps] = useState("");
  const [files, setFiles] = useState([]);

  const { id } = useParams();
  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.montages.getMontageSkinaCodes;

    restHelper
      .getRequest(url)
      .then((res) => {
        setSkinaCodes(res.data.map((code) => code.name));
        setSkinaCodesData(res.data);
      })
      .catch(function (error) {
        alert("برجاء اعادة المحاولة");
      });
  }, []);

  useEffect(() => {
    skinaCodesData.map((code) => {
      if(code.name===formData.skina_code){
        setEtgahElGar(code.etgah_el_gar)
        setEtgahElArd(code.etgah_el_ard)
        setAps(code.aps)
      }
    })
  }, [formData.skina_code]);

  const handleChange = (text, key) => {
    let keys = "";
    if (key.indexOf("-") > 0) keys = key.substr(0, key.indexOf("-"));
    else keys = key;
    let newFormData = { ...formData };
    newFormData[keys] = text;
    setFormData(newFormData);
  };

  const handleFileUpdated = (file, id) => {
    let newFiles = [...files];
    newFiles[id] = file;
    setFiles(newFiles);
  };

  const handleSubmitMontage = () => {
    if ((formData.job_name) && (formData.type)) {
      const url =
        restHelper.getURLPrefix(appConfig.host) +
        appConfig.services.montages.newMontage;

      let form = new FormData();
      form.append("name", formData.name);
      form.append("montage_attachment", files[0]);
      form.append("image_attachment", files[1]);
      form.append("desgin_upload_file", files[2]);

      form.append("customer_id", location.state.id);
      form.append("montage_category_id", location.state.categoryId);
      form.append("job_name", formData.job_name);
      form.append("skina_code", formData.skina_code);
      form.append("aps", aps);
      form.append("color", formData.color);
      form.append("darafel", formData.darafel);
      form.append("type", formData.type);
      form.append("etgah_el_gar", etgahElGar);
      form.append("gap", formData.gap);
      form.append("special_color", formData.special_color);
      form.append("tars_el_takser", formData.tars_el_takser);
      form.append("sub_code", formData.sub_code);
      form.append("etgah_el_ard", etgahElArd);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      restHelper
        .postRequest(url, form, config)
        .then(function (response) {
          handleback();
        })
        .catch(function (error) {
          alert("Error while uploading");
        });
    }
  };

  const addSkinaHandler = () => {
    dispatch(openModal(<AddSkinaModal setSkinaCodes={setSkinaCodes} setSkinaCodesData={setSkinaCodesData} />));
  };

  const handleback = () => {
    history.goBack()
  }

  return (
    <div className="main_container">
      <div className="inputs_container">
        <div className="header_lable">AddMontage</div>
        <div className="inputs_section">
          <div>
            <div className="column">
              <div className="part">
                <div className="inputs_label">إسم الشغلانة</div>
                <AppInput
                  id="job_name"
                  inputClassName="input"
                  InputProps={{ disableUnderline: true, required:true }}
                  value={formData.job_name}
                  onChange={(e) => handleChange(e.target.value, e.target.id)}
                />
              </div>
              <div className="part">
                <div className="inputs_label">تفاصيل الشغلانة</div>
                <AppInput
                  id="type"
                  inputClassName="input"
                  InputProps={{ disableUnderline: true, required:true }}
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
                <div className="inputs_label">اتجاه عرض</div>
                <AppInput
                  id="etgah_el_ard"
                  inputClassName="input"
                  InputProps={{ disableUnderline: true }}
                  value={etgahElArd}
                  disabled={true}
                  onChange={(e) => handleChange(e.target.value, e.target.id)}
                />
            </div>
              <div className="part">
                <div className="inputs_label">اتجاه جر</div>
                <AppInput
                  id="etgah_el_gar"
                  inputClassName="input"
                  InputProps={{ disableUnderline: true }}
                  value={etgahElGar}
                  disabled={true}
                  onChange={(e) => handleChange(e.target.value, e.target.id)}
                />
              </div>
              <div className="part">
                <div className="inputs_label">APS</div>
                <AppInput
                  id="aps"
                  inputClassName="input"
                  InputProps={{ disableUnderline: true }}
                  value={aps}
                  disabled={true}
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
            </div>
          </div>
          <div className="column">
            <div className="part">
              <div className="inputs_label">جاب</div>
              <AppInput
                id="gap"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.gap}
                type={"number"}
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
              <div className="inputs_label"> ترس التكسير</div>
              <AppInput
                id="tars_el_takser"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.tars_el_takser}
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
            <div className="part">
              <div className="inputs_label">Montage Attachment</div>
              <FileUploadButton
                runParentFunction={(file) => handleFileUpdated(file, 0)}
              />
            </div>
            <div className="part">
              <div className="inputs_label">Image Attachment</div>
              <FileUploadButton
                runParentFunction={(file) => handleFileUpdated(file, 1)}
              />
            </div>
            <div className="part">
              <div className="inputs_label">Desgin Upload File</div>
              <FileUploadButton
                runParentFunction={(file) => handleFileUpdated(file, 2)}
              />
            </div>
          </div>
        </div>
        <hr style={{ width: "70%", marginTop: "40px" }} />
      </div>
      <div className="montage-submit-button submit-button">
        <AppButton onClick={handleSubmitMontage} text={"اضافه"} />
      </div>
      <div className="submit_button_div">
          <button className="customer-submit" onClick={handleback}>رجوع</button>
      </div>
    </div>
  );
}
