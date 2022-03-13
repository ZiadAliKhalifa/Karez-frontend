import React, { useState, useEffect } from "react";
import "./AddEditRecipe.css";
import { useParams } from "react-router-dom";
import { actions } from "../../../consts/actions";
import { useDispatch, useSelector } from "react-redux";
import AppInput from "../../common/input/Input";
import Autocomplete from "../../common/autoComplete/AutoComplete";
import AppButton from "../../common/button/Button";
import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { fetchRawMaterials } from "../../../redux/rawMaterial/rawMaterialActions";
import { openModal } from "../../../redux/modal/modalActions";
import { useHistory } from "react-router-dom";

function AddEditRecipe(props) {
  const rawData = {
    name: {
      value: "",
      valid: false,
      helperText: "",
      error: false,
    },
    recipe_type: {
      value: "",
      valid: false,
      helperText: "",
      error: false,
    },
    section: {
      value: "",
      valid: false,
      helperText: "",
      error: false,
    },
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const { action, id } = useParams();

  const { rawMaterials } = useSelector((state) => state.rawMaterial);
  const { general } = useSelector((state) => state);

  const [recipeData, setRecipeData] = useState(rawData);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [inventoryOptions, setInventoryOptions] = useState([]);
  const [inventory, setInventory] = useState({ label: "" });
  const [quantity, setQuantity] = useState("0");
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  const errorDispatcher = (
    message = "حدث خطأ ما يرجى المحاولة فى وقت لاحق"
  ) => {
    dispatch(
      openModal(<h3 style={{ padding: "5px 20px 5px 20px" }}>{message}</h3>)
    );
  };

  const successDispatcher = (message) => {
    dispatch(
      openModal(<h3 style={{ padding: "5px 20px 5px 20px" }}>{message}</h3>)
    );
  };

  useEffect(() => {
    if (rawMaterials.length > 0) {
      const options = [];
      rawMaterials.forEach((item) =>
        options.push({ id: item.id, label: item.name })
      );
      setInventoryOptions(options);
    }
  }, [rawMaterials]);

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const getRecipeData = () => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.recipe.getItemById.replace("{id}", id);

    action === actions.EDIT &&
      restHelper
        .getRequest(url)
        .then((res) => {
          if (res.status === 200) {
            setRecipeData({
              name: { ...recipeData.name, value: res.data.data.name },
              recipe_type: {
                ...recipeData.recipe_type,
                value: {
                  ...res.data.data.recipe_type,
                  label: res.data.data.recipe_type.name,
                },
              },
              section: {
                ...recipeData.section,
                value: {
                  ...res.data.data.section,
                  label: res.data.data.section.name,
                },
              },
            });
            setRecipeIngredients(res.data.data.recipe_ingredients);
          } else {
            errorDispatcher();
          }
        })
        .catch((err) => errorDispatcher());
  };

  useEffect(() => {
    getRecipeData();
  }, [action, id, dispatch]);

  useEffect(() => {
    action === actions.ADD &&
      general.section.length > 0 &&
      setSectionOptions(general.section);

    action === actions.ADD &&
      general.type.length > 0 &&
      setTypeOptions(general.type);
  }, [general, action]);

  const addRecipeValidation = () => {
    let isValid = true;
    if (!recipeData.name.value) {
      setRecipeData((prevState) => ({
        ...prevState,
        name: {
          ...recipeData.name,
          error: true,
          helperText: "هذه الخانة مطلوبه",
        },
      }));
      isValid = false;
    } else {
      setRecipeData((prevState) => ({
        ...prevState,
        name: {
          ...recipeData.name,
          error: false,
          helperText: "",
        },
      }));
      isValid = true;
    }
    if (!recipeData.recipe_type.value) {
      setRecipeData((prevState) => ({
        ...prevState,
        recipe_type: {
          ...recipeData.recipe_type,
          error: true,
          helperText: "هذه الخانة مطلوبه",
        },
      }));
      isValid = false;
    } else {
      setRecipeData((prevState) => ({
        ...prevState,
        recipe_type: {
          ...recipeData.recipe_type,
          error: false,
          helperText: "",
        },
      }));
      isValid = true;
    }
    if (!recipeData.section.value) {
      setRecipeData((prevState) => ({
        ...prevState,
        section: {
          ...recipeData.section,
          error: true,
          helperText: "هذه الخانة مطلوبه",
        },
      }));
      isValid = false;
    } else {
      setRecipeData((prevState) => ({
        ...prevState,
        section: {
          ...recipeData.section,
          error: false,
          helperText: "",
        },
      }));
      isValid = true;
    }

    return isValid;
  };

  const addRecipeHandler = () => {
    let isValid = addRecipeValidation();
    const recipeUrl =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.recipe.addItem;

    const recipeReqData = {
      name: recipeData.name.value,
      section_id: recipeData.section.value.id,
      recipe_type_id: recipeData.recipe_type.value.id,
      recipe_ingredients: recipeIngredients,
    };

    if (isValid) {
      restHelper
        .postRequest(recipeUrl, recipeReqData)
        .then((res) => {
          if (res.status === 201) {
            successDispatcher("تم اضافة الوصفة بنجاح");
            history.push({
              pathname: "/recipe",
              state: props.location.state,
            });
          } else {
            errorDispatcher();
          }
        })
        .catch((err) => errorDispatcher());
    }
  };

  const editRecipeHandler = () => {
    const ingredientsUrl =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.recipe.addRecipeIngredients;
    const ingredientsReqData = {
      recipe_id: id,
      recipe_ingredients: [
        {
          id: inventory.id,
          quantity: parseInt(quantity),
        },
      ],
    };

    const itemExists = recipeIngredients.filter(
      (ingredient) => ingredient.inventory_id === inventory.id
    );

    if (itemExists.length > 0) {
      deleteIngredientHandler(itemExists[0]);
    }
    restHelper
      .postRequest(ingredientsUrl, ingredientsReqData)
      .then((res) => {
        if (res.status === 201) {
          getRecipeData();
        } else {
          errorDispatcher();
        }
      })
      .catch((err) => errorDispatcher());
  };

  const deleteIngredientHandler = (item) => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.recipe.deleteRecipeIngredient;
    const reqData = {
      recipe_id: parseInt(id),
      recipe_ingredients: [
        {
          id: item.id,
        },
      ],
    };
    if (action === actions.ADD) {
      setRecipeIngredients(
        recipeIngredients.filter(
          (ingredient) => ingredient.inventory_id !== item.inventory_id
        )
      );
    } else {
      restHelper
        .deleteRequest(url, reqData)
        .then((res) => {
          if (res.status === 200) {
            setRecipeIngredients(
              recipeIngredients.filter(
                (ingredient) => ingredient.inventory_id !== item.inventory_id
              )
            );
            return true;
          } else {
            errorDispatcher();
            return false;
          }
        })
        .catch((err) => {
          errorDispatcher();
          return false;
        });
    }
  };

  return (
    <div className="add-edit-recipe-container">
      <div className="add-edit-recipe-header">
        {action === actions.ADD ? "اضافة وصفة" : "تعديل وصفة"}
      </div>
      <div className="add-edit-recipe-input-conatiner">
        <div className="add-edit-recipe-name-input">
          <div className="add-edit-recipe-input-label">إسم الوصفة</div>
          <AppInput
            type="text"
            disabled={action === actions.ADD ? false : true}
            inputClassName="add-edit-recipe-input-name"
            InputProps={{ disableUnderline: true }}
            value={recipeData.name.value}
            onChange={(e) =>
              setRecipeData({
                ...recipeData,
                name: { ...recipeData.name, value: e.target.value },
              })
            }
          />
        </div>
        {recipeData.name.error && (
          <div className="add-edit-recipe-dropdown-error">
            {recipeData.name.helperText}
          </div>
        )}
        <div className="add-edit-recipe-type-input">
          <div className="add-edit-recipe-input-label">نوع الوصفة</div>
          <Autocomplete
            type="dropdown"
            options={typeOptions}
            disabled={action === actions.ADD ? false : true}
            dropDownClassName="add-edit-recipe-input-type"
            value={recipeData.recipe_type.value}
            onChange={(e, newValue) =>
              setRecipeData({
                ...recipeData,
                recipe_type: { ...recipeData.recipe_type, value: newValue },
              })
            }
          />
          {recipeData.recipe_type.error && (
            <div className="add-edit-recipe-dropdown-error">
              {recipeData.recipe_type.helperText}
            </div>
          )}
        </div>
        <div className="add-edit-recipe-section-input">
          <div className="add-edit-recipe-input-label">القسم</div>
          <Autocomplete
            type="dropdown"
            options={sectionOptions}
            disabled={action === actions.ADD ? false : true}
            dropDownClassName="add-edit-recipe-input-section"
            value={recipeData.section.value}
            onChange={(e, newValue) =>
              setRecipeData({
                ...recipeData,
                section: { ...recipeData.section, value: newValue },
              })
            }
          />
          {recipeData.section.error && (
            <div className="add-edit-recipe-dropdown-error">
              {recipeData.section.helperText}
            </div>
          )}
        </div>
      </div>

      <div className="underline"></div>
      <div className="add-edit-recipe-input-conatiner">
        <div className="add-edit-recipe-name-input">
          <div className="add-edit-recipe-input-label">المادة الخام</div>
          <Autocomplete
            type="dropdown"
            options={inventoryOptions}
            dropDownClassName="add-edit-recipe-input-section"
            value={inventory}
            onChange={(e, newValue) => setInventory(newValue)}
          />
        </div>
        <div className="add-edit-recipe-quantity-input">
          <div className="add-edit-recipe-input-label">الكمية</div>
          <AppInput
            type="number"
            inputClassName="add-edit-recipe-input-quantity"
            InputProps={{ disableUnderline: true }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="add-edit-recipe-button-container">
          <AppButton
            text="إضافة"
            className="add-edit-recipe-button"
            onClick={() => {
              editRecipeHandler();
            }}
          />
        </div>
      </div>
      <div className="underline"></div>

      <div className="add-edit-recipe-ingredients-container">
        <div className="add-edit-recipe-ingredients-row">
          <div className="add-edit-recipe-ingredient-label">المادة الخام</div>
          <div className="add-edit-recipe-ingredient-label">
            الكمية النهائية
          </div>
        </div>
        {recipeIngredients.map((item, index) => (
          <div className="add-edit-recipe-ingredients-row" key={index}>
            <div className="add-edit-recipe-ingredient-data">{item.name}</div>
            <div className="add-edit-recipe-ingredient-data">
              {item.quantity}
            </div>
            <div
              className="add-edit-recipe-ingredient-icon"
              onClick={() => deleteIngredientHandler(item)}
            >
              <ClearRoundedIcon />
            </div>
          </div>
        ))}
      </div>

      <div className="edit-raw-materials-qty-actions-container">
        <div className="edit-raw-materials-qty-actions-subcontainer">
          <AppButton
            className="edit-raw-materials-qty-cancel"
            onClick={() =>
              history.push({
                pathname: "/recipe",
                state: props.location.state,
              })
            }
            text={action === actions.ADD ? "إلغاء" : "رجوع"}
          />
        </div>
        {action === actions.ADD && (
          <div className="edit-raw-materials-qty-actions-subcontainer">
            <AppButton
              className="edit-raw-materials-qty-submit"
              onClick={() => {
                addRecipeHandler();
              }}
              text="حفظ"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddEditRecipe;
