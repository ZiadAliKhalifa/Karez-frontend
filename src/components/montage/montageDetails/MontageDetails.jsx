import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import AppInput from "../../common/input/Input";

import { IMAGE_BASE_URL } from "../../../consts/general.js";

import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";

import "./MontageDetails.css";

export default function MontageDetails() {
  const [montage, setMontage] = useState({});
  const [formData, setFormData] = useState({});

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
  }, []);

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

    // "montage_id": 3,
    // "quantity": 0,
    // "material_type": "",
    // "skina_code_new": "",
    // "lamination": "",
    // "job_direction": "",
    // "job_per_meter": "",
    // "sample": "",
    // "order_roll": "",
    // "roll_per_meter": "",
    // "label_per_roll": ""

    formData.montage_id = id;

    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.newOrder;

    restHelper
      .postRequest(url, formData)
      .then((res) => {
        navigateToAllCustomers();
      })
      .catch((err) => {
        alert("لم نتمكن من ادخال");
      });
  };

  const navigateToAllCustomers = () => {
    const location = { pathname: "/admin/customers" };
    history.push(location);
  };

  return (
    <div className="main_container">
      <div className="inputs_container">
        <div className="header_lable">Montage Details</div>
        <div className="inputs_section">
          <div>
            <div className="part">
              <div className="inputs_label">اسم مونتاج</div>
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
              <div className="inputs_label">Gap</div>
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

            <div style={{ margin: "50px" }}>
              <h4>Montage Attachment</h4>
              {montage.montage_attachment ? (
                <a
                  className="monategImageLink"
                  href={`${IMAGE_BASE_URL}${montage.montage_attachment}`}
                  target="_blank"
                >
                  <img
                    className="monategImages"
                    src={`${IMAGE_BASE_URL}${montage.montage_attachment}`}
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
              <h4>Sample</h4>
              {montage.desgin_upload_file ? (
                <a
                  className="monategImageLink"
                  href={`${IMAGE_BASE_URL}${montage.desgin_upload_file}`}
                  target="_blank"
                >
                  <img
                    className="monategImages"
                    src={`${IMAGE_BASE_URL}${montage.desgin_upload_file}`}
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
              {montage.image_attachment ? (
                <a
                  className="monategImageLink"
                  href={`${IMAGE_BASE_URL}${montage.image_attachment}`}
                  target="_blank"
                >
                  <img
                    className="monategImages"
                    src={`${IMAGE_BASE_URL}${montage.image_attachment}`}
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
      </div>
    </div>
  );
}
