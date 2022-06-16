import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import AppInput from "../../common/input/Input";

import { IMAGE_BASE_URL } from "../../../consts/general.js";

import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";

import "./MontageDetails.css";

export default function MontageDetails() {
  const [montage, setMontage] = useState({});
  // const [formData, setFormData] = useState({});

  const history = useHistory();
  const location = useLocation();
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

  const navigteToEditMontage = () => {
    const editLocation = {
      pathname: `/admin/montage/edit/${id}` ,
      state: {
        id: location.state.id,
        categoryId: location.state.categoryId,
      },
    };
    history.push(editLocation);
  };

  const handleback = () => {
    history.goBack()
  }
  
  return (
    <div className="main_container">
      <div className="inputs_container">
        <div className="header_lable">Montage Details</div>
        <div className="inputs_section">
          <div>
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
            <div className="part">
              <div className="inputs_label">كود فرعي </div>
              <AppInput
                id="sub_code"
                inputClassName="input"
                InputProps={{ disableUnderline: true }}
                value={montage.sub_code}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="inputs_container">
      <div className="header_lable">Montage Images</div>
        <div className="inputs_section">
        <div style={{ margin: "50px" }}>
              <h4>Montage Attachment</h4>
              {montage.montage_attachment ? (
                <a
                  className="monategImageLink"
                  href={`${IMAGE_BASE_URL}${montage.montage_attachment}`}
                  target="_blank"
                  rel="noreferrer"
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
                  rel="noreferrer"
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
                  rel="noreferrer"
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
      <div className="buttons_container">
        <div className="submit_button_div">
            <button className="customer-submit" onClick={navigteToEditMontage}>تعديل</button>
        </div>
        <div className="submit_button_div">
            <button className="customer-submit" onClick={handleback}>رجوع</button>
        </div>
      </div>
    </div>
  );
}
