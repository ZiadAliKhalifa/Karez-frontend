import React, { useEffect, useState } from "react";
import AppInput from "../../common/input/Input";
import Autocomplete from "../../common/autoComplete/AutoComplete";
import "./EditMontage.css";
import { FileUploadButton } from "../../common/uploadButton/uploadButton";
import AppButton from "../../common/button/Button";
import AddIcon from "@mui/icons-material/Add";

import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/modal/modalActions";
import AddSkinaModal from "../addMontage/AddSkinaModal";

export default function EditMontage() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [skinaCodes, setSkinaCodes] = useState([]);
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
      })
      .catch(function (error) {
        alert("برجاء اعادة المحاولة");
      });
  }, []);

  //retrieve montage data
  useEffect(() => {
    let url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.montages.getMontageById;

    restHelper
      .getRequest(url + id)
      .then((res) => {
        setFormData({ ...res.data });
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  }, []);

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
    if (formData.job_name) {
      const url =
        restHelper.getURLPrefix(appConfig.host) +
        appConfig.services.montages.editMontage;

      let form = new FormData();
      form.append("name", formData.name);
      form.append("montage_attachment", files[0]);
      form.append("image_attachment", files[1]);
      form.append("desgin_upload_file", files[2]);

      form.append("montage_id", id);
      form.append("job_name", formData.job_name);
      form.append("skina_code", formData.skina_code);
      form.append("aps", formData.aps);
      form.append("color", formData.color);
      form.append("darafel", formData.darafel);
      form.append("type", formData.type);
      form.append("etgah_el_gar", formData.etgah_el_gar);
      form.append("gap", formData.gap);
      form.append("special_color", formData.special_color);
      form.append("tars_el_takser", formData.tars_el_takser);
      form.append("sub_code", formData.sub_code);
      form.append("etgah_el_ard", formData.etgah_el_ard);

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      restHelper
        .postRequest(url, form, config)
        .then(function (response) {
          history.goBack();
        })
        .catch(function (error) {
          alert("Error while uploading");
        });
    }
  };

  const navigateToAllCustomers = () => {
    history.goBack();
  };

  const addSkinaHandler = () => {
    dispatch(openModal(<AddSkinaModal setSkinaCodes={setSkinaCodes} />));
  };

  return (
    <div className="main_container">
      <div className="inputs_container">
        <div className="header_lable">EditMontage</div>
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
                <div className="inputs_label">APS</div>
                <AppInput
                  id="aps"
                  inputClassName="input"
                  type={"number"}
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
              <div className="inputs_label">اتجاه جر</div>
              <AppInput
                id="etgah_el_gar"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.etgah_el_gar}
                type={"number"}
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
              <div className="inputs_label">اتجاه عرض</div>
              <AppInput
                id="etgah_el_ard"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={formData.etgah_el_ard}
                type={"number"}
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
    </div>
  );
}
