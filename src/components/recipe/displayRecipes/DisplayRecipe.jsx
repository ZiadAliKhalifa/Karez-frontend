import React, { useEffect, useState } from "react";
import "./DisplayRecipe.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipesByType } from "../../../redux/recipe/recipeActions";
import { openModal } from "../../../redux/modal/modalActions";
import { createMenuItem } from "../../common/menu/menuHelper";

import Button from "../../common/button/Button";
import Table from "../../common/Table/Table";
import RecipeDetails from "../recipeDetails/RecipeDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationBox from "../../common/confirmationBox/ConfirmationBox";

import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";

function DisplayRecipe(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { recipe } = useSelector((state) => state);
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    dispatch(fetchRecipesByType(props.location.state));
  }, [props.location.state, dispatch]);

  useEffect(() => {
    const recipeArray = recipe.recipes.slice();
    recipeArray.forEach((item) => {
      item.recipe_type = item.recipe_type.name;
      item.section = item.section.name;
    });
    setRecipeData(recipeArray);
  }, [recipe.recipes]);

  const errorDispatcher = (
    message = "حدث خطأ ما يرجى المحاولة فى وقت لاحق"
  ) => {
    dispatch(
      openModal(<h3 style={{ padding: "5px 20px 5px 20px" }}>{message}</h3>)
    );
  };

  const editRecipeItem = (rowData) => {
    history.push({
      pathname: `/recipe/edit/${rowData.id}`,
      state: props.location.state,
    });
  };

  const deleteRecipeItem = async (rowData) => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.recipe.deleteItem.replace("{id}", rowData.id);
    const result = await restHelper.deleteRequest(url);
    if (result.status === 200) {
      dispatch(fetchRecipesByType(props.location.state));
    } else errorDispatcher();
  };

  const confirmDeleteRecipeItem = (rowData) => {
    dispatch(
      openModal(
        <ConfirmationBox
          msg={` هل أنت متأكد أنك تريد الحذف ${rowData.name}`}
          saveAction={() => {
            deleteRecipeItem(rowData);
          }}
        />
      )
    );
  };

  const tableHeaders = [
    {
      key: "section",
      name: "القسم",
    },
    {
      key: "recipe_type",
      name: "نوع الوصفة",
    },
    {
      key: "name",
      name: "اسم",
    },
  ];

  return (
    <div className="display-recipe-conatiner">
      <div className="display-recipe-header">الوصفات</div>
      <div className="display-recipe-action-buttons-container">
        <div className="display-recipe-action-button">
          <Button
            text="إضافة وصفات جديدة"
            onClick={() =>
              history.push({
                pathname: "/recipe/add",
                state: props.location.state,
              })
            }
          ></Button>
        </div>
      </div>
      <div className="display-recipe-table-container">
        <Table
          headers={tableHeaders}
          rows={recipeData}
          tableHeight={"650px"}
          onRowClick={(rowData) =>
            dispatch(openModal(<RecipeDetails data={rowData} />))
          }
          rowActions={[
            createMenuItem("تعديل", editRecipeItem, <EditIcon />),
            createMenuItem("حذف", confirmDeleteRecipeItem, <DeleteIcon />),
          ]}
        />
      </div>
    </div>
  );
}

export default DisplayRecipe;
