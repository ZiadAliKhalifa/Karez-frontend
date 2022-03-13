/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";
import Table from "../../common/Table/Table";
import appConfig from "../../../config.json";
import restHelper from "../../../helpers/RestHelper";

const RecipeDetails = ({ data }) => {
  const tableHeaders = [
    {
      key: "unit",
      name: "وحدة قياس",
    },
    {
      key: "quantity",
      name: "كمية",
    },
    {
      key: "name",
      name: "اسم",
    },
  ];

  const [recipeIngredient, setRecipeIngredient] = useState([]);

  useEffect(() => {
    getRecipeData();
  }, []);

  const getRecipeData = async () => {
    const url = `${restHelper.getURLPrefix(
      appConfig.host
    )}${appConfig.services.recipe.getItemById.replace("{id}", data.id)}`;
    const recipeDetail = await restHelper.getRequest(url);

    if (recipeDetail.status === 200) {
      setRecipeIngredient(recipeDetail.data.data.recipe_ingredients);
    } else setRecipeIngredient([]);
  };

  return (
    <div className={"recipeDetails-container"}>
      <h1 className={"container-header"}>{data.name}</h1>
      <hr className={"section-line"} />
      <div>
        <span className={"label"}>نوع الوصفة: </span>
        <span className={"label-results"}>{data.recipe_type}</span>
      </div>
      <div>
        <span className={"label"}>القسم: </span>
        <span className={"label-results"}>{data.section}</span>
      </div>
      <hr className={"section-line"} />
      <div className={"table-section"}>
        <Table headers={tableHeaders} rows={recipeIngredient} tableHeight={"300px"} rowActions={false} />
      </div>
    </div>
  );
};

export default RecipeDetails;
