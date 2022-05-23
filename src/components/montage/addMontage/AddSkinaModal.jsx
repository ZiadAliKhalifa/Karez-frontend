import React, { useEffect, useState } from "react";
import AppInput from "../../common/input/Input";
import "./AddMontage.css";

import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";
import AppButton from "../../common/button/Button";
import { closeModal } from "../../../redux/modal/modalActions";
import { useDispatch } from "react-redux";

function AddSkinaModal({ setSkinaCodes }) {
  const dispatch = useDispatch();

  const [skinaCode, setSkinaCode] = useState("");

  const handleAddSkinaSubmit = () => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.montages.newMontageSkinaCode;

    restHelper
      .postRequest(url, { name: skinaCode })
      .then(function (response) {
        const url =
          restHelper.getURLPrefix(appConfig.host) +
          appConfig.services.montages.getMontageSkinaCodes;

        restHelper
          .getRequest(url)
          .then((res) => {
            setSkinaCodes(res.data.map((code) => code.name));
          })
          .catch((error) => {
            alert("b" + "برجاء اعادة المحاولة");
          });
      })
      .catch(function (error) {
        alert("c" + "برجاء اعادة المحاولة");
      });
    alert("تم إضافة كود سكينة جديد بنجاح");
    dispatch(closeModal());
  };

  return (
    <div className="add-skina-code-modal-container">
      <div className="header_lable">Add Skina Code</div>
      <div className="part" style={{ width: "90%" }}>
        <div className="inputs_label">كود سكينا</div>
        <AppInput
          id="skina_code"
          inputClassName="input"
          InputProps={{ disableUnderline: true }}
          value={skinaCode}
          onChange={(e) => setSkinaCode(e.target.value)}
        />
      </div>
      <div className="montage-submit-button submit-button">
        <AppButton onClick={handleAddSkinaSubmit} text={"اضافه"} />
      </div>
    </div>
  );
}

export default AddSkinaModal;
