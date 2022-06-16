import React, { useState } from "react";
import AppInput from "../../common/input/Input";
import "./AddMontage.css";

import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";
import AppButton from "../../common/button/Button";
import { closeModal } from "../../../redux/modal/modalActions";
import { useDispatch } from "react-redux";

function AddSkinaModal({ setSkinaCodes, setSkinaCodesData }) {
  const dispatch = useDispatch();

  const [skinaCode, setSkinaCode] = useState("");
  const [etgahElGar, setEtgahElGar] = useState("");
  const [etgahElArd, setEtgahElArd] = useState("");
  const [aps, setAps] = useState("");


  const handleAddSkinaSubmit = () => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.montages.newMontageSkinaCode;

    const data = {
      name: skinaCode,
      aps: aps,
      etgah_el_ard: etgahElArd,
      etgah_el_gar: etgahElGar,
    }
    restHelper
      .postRequest(url, data)
      .then(function (response) {
        const url =
          restHelper.getURLPrefix(appConfig.host) +
          appConfig.services.montages.getMontageSkinaCodes;

        restHelper
          .getRequest(url)
          .then((res) => {
            setSkinaCodes(res.data.map((code) => code.name));
            setSkinaCodesData(res.data);
          })
          .catch((error) => {
            alert("برجاء اعادة المحاولة");
          });
      })
      .catch(function (error) {
        alert("برجاء اعادة المحاولة");
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
        <div className="inputs_label">APS</div>
        <AppInput
          id="aps"
          inputClassName="input"
          InputProps={{ disableUnderline: true }}
          value={aps}
          type={"number"}
          onChange={(e) => setAps(e.target.value)}
        />
        <div className="inputs_label">اتجاه جر</div>
        <AppInput
          id="etgah_el_gar"
          inputClassName="input"
          InputProps={{ disableUnderline: true }}
          value={etgahElGar}
          type={"number"}
          onChange={(e) => setEtgahElGar(e.target.value)}
        />
        <div className="inputs_label">اتجاه عرض</div>
        <AppInput
          id="etgah_el_ard"
          inputClassName="input"
          InputProps={{ disableUnderline: true }}
          value={etgahElArd}
          type={"number"}
          onChange={(e) => setEtgahElArd(e.target.value)}
        />
      </div>
      <div className="montage-submit-button submit-button">
        <AppButton onClick={handleAddSkinaSubmit} text={"اضافه"} />
      </div>
    </div>
  );
}

export default AddSkinaModal;
