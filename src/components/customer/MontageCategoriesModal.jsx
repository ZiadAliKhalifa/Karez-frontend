import React, { useEffect, useState } from "react";
import "./MontageCategoriesModal.css";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";

import { IMAGE_BASE_URL } from "../../consts/general";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { closeModal } from "../../redux/modal/modalActions";
import { useDispatch } from "react-redux";

import folderLogo from "../../static/images/folder.png";


function MontagCategoriesModal({ customerId }) {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  
  
  const handleAddCategory = () => {
    dispatch(closeModal())
    history.push({pathname:"/admin/category/new",state:{'customerId':customerId}});
  }

  useEffect(() => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.montages.getMontageCategories;

    restHelper
      .getRequest(`${url}${customerId}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        alert("برجاء اعادة المحاولة");
      });
  }, []);

  return (
    <div className="montage-categories-container">
      <button className="add-montage-category" onClick={handleAddCategory}>اضف ملف جديد</button>
      {categories.length > 0 ? (
        <div className="category-grid">
          {categories.map((category) => (
            <a
              href={`/admin/customer/${customerId}/montage-category/${category.id}`}
              className="montage-category-container"
            >
              <img
                className="montage-category-image"
                src={folderLogo}
                alt={category.name}
              />

              <div className="montage-category-name">{category.name}</div>
            </a>
          ))}
        </div>
      ) : (
        <div className="montage-category-loading">
          <div>لا يوجد ملفات</div>
        </div>
      )}
    </div>
      );
}

export default MontagCategoriesModal;
