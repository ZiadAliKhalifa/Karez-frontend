import React, { useEffect, useState } from "react";
import "./MontageCategoriesModal.css";

import restHelper from "../../helpers/RestHelper";
import appConfig from "../../config.json";

import { IMAGE_BASE_URL } from "../../consts/general";

function MontagCategoriesModal({ customerId }) {
  const [categories, setCategories] = useState([]);

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

  console.log(categories);

  return (
    <div className="montage-categories-container">
      {categories.length > 0 ? (
        <div className="category-grid">
          {categories.map((category) => (
            <a
              href={`/admin/customer/${customerId}/montage-category/${category.id}`}
              className="montage-category-container"
            >
              <img
                className="montage-category-image"
                src={`${IMAGE_BASE_URL}${category.image}`}
                alt={category.name}
              />

              <div className="montage-category-name">{category.name}</div>
            </a>
          ))}
        </div>
      ) : (
        <div className="montage-category-loading">
          <div>Loading...</div>
        </div>
      )}
    </div>
  );
}

export default MontagCategoriesModal;
