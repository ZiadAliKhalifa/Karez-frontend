import React, { useState, useEffect } from "react";
import "./AddEditOrder.css";
import { useParams } from "react-router-dom";
import { actions } from "../../../consts/actions";
import { useDispatch, useSelector } from "react-redux";
import AppInput from "../../common/input/Input";
import Autocomplete from "../../common/autoComplete/AutoComplete";
import AppButton from "../../common/button/Button";
import restHelper from "../../../helpers/RestHelper";
import appConfig from "../../../config.json";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { openModal } from "../../../redux/modal/modalActions";
import { useHistory } from "react-router-dom";

function AddEditOrder(props) {
  const rawData = {
    type: {
      value: "",
      valid: false,
      helperText: "",
      error: false,
    },
    status: {
      value: "",
      valid: false,
      helperText: "",
      error: false,
    },
    date: {
      value: "",
      valid: false,
      helperText: "",
      error: false,
    },
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const { action, id } = useParams();

  const { general } = useSelector((state) => state);

  const [orderData, setOrderData] = useState(rawData);
  const [typeOptions, setTypeOptions] = useState([]);
  const [recipe, setRecipe] = useState({ label: "" });
  const [quantity, setQuantity] = useState("0");
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [orderRecipes, setOrderRecipes] = useState([]);
  const [orderRecipesError, setOrderRecipesError] = useState("");

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
    if (allRecipes.length > 0) {
      const options = [];
      allRecipes.forEach((item) => options.push({ label: item.name, ...item }));
      setRecipeOptions(options);
    }
  }, [allRecipes]);

  useEffect(() => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.recipe.getAllItems;
    restHelper
      .getRequest(url)
      .then((res) => {
        if (res.status === 200) {
          setAllRecipes(res.data.data);
        } else {
          errorDispatcher();
        }
      })
      .catch((err) => errorDispatcher());
  }, [dispatch]);

  const getOrderRecipes = () => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.getById.replace("{id}", id);
    const recipesUrl =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.getOrderitemssById.replace("{id}", id);

    if (action === actions.EDIT) {
      restHelper
        .getRequest(url)
        .then((res) => {
          if (res.status === 200) {
            setOrderData({
              type: { ...orderData.type, value: res.data.data.type },
              status: {
                ...orderData.status,
                value: {
                  ...res.data.data.status,
                  label: res.data.data.status.name,
                },
              },
              date: {
                ...orderData.date,
                value: res.data.data.date,
              },
            });
          } else {
            errorDispatcher();
          }
        })
        .catch((err) => errorDispatcher());

      restHelper
        .getRequest(recipesUrl)
        .then((res) => {
          if (res.status === 200) {
            setOrderRecipes(res.data.data);
          } else {
            errorDispatcher();
          }
        })
        .catch((err) => {
          if (err.response.status !== 404) {
            errorDispatcher();
          }
        });
    }
  };

  useEffect(() => {
    getOrderRecipes();
  }, [action, id]);

  useEffect(() => {
    action === actions.ADD &&
      general.type.length > 0 &&
      setTypeOptions(general.type);
  }, [general, action]);

  const addRecipeValidation = () => {
    let isValid = true;
    if (!orderData.type.value.name) {
      setOrderData((prevState) => ({
        ...prevState,
        type: {
          ...orderData.type,
          error: true,
          helperText: "هذه الخانة مطلوبه",
        },
      }));
      isValid = false;
    } else {
      setOrderData((prevState) => ({
        ...prevState,
        type: {
          ...orderData.type,
          error: false,
          helperText: "",
        },
      }));
      isValid = true;
    }

    if (orderRecipes.length <= 0) {
      setOrderRecipesError("هذه الخانة مطلوبه");
      isValid = false;
    } else {
      setOrderRecipesError("");
    }

    return isValid;
  };

  const addOrderHandler = () => {
    let isValid = addRecipeValidation();
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.addItem;
    const recipeReqData = {
      order_items: orderRecipes,
      order_type_id: orderData.type.value.id,
    };
    if (isValid) {
      restHelper
        .postRequest(url, recipeReqData)
        .then((res) => {
          if (res.status === 200) {
            successDispatcher("تم اضافة الوصفة الطلب");
            history.push({
              pathname: "/orders",
              state: props.location.state,
            });
          } else {
            errorDispatcher();
          }
        })
        .catch((err) => errorDispatcher());
    }
  };

  const editOrderHandler = () => {
    const orderRecipeUrl =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.addOrderItem;
    const ReqData = {
      order_id: id,
      order_items: [
        {
          recipe_id: recipe.id,
          quantity: parseInt(quantity),
        },
      ],
    };
    const itemExists = orderRecipes.filter(
      (item) => item.recipe.id === recipe.id
    );
    if (itemExists.length > 0) {
      deleteIngredientHandler(itemExists[0]);
    }

    if (action === actions.EDIT) {
      restHelper
        .postRequest(orderRecipeUrl, ReqData)
        .then((res) => {
          if (res.status === 200) {
            getOrderRecipes();
          } else {
            errorDispatcher();
          }
        })
        .catch((err) => errorDispatcher());
    } else {
      setOrderRecipes([
        ...orderRecipes.filter((item) => item.recipe.id !== recipe.id),
        {
          quantity: parseInt(quantity),
          recipe_id: recipe.id,
          recipe: recipe,
        },
      ]);
    }
  };

  const deleteIngredientHandler = (item) => {
    const url =
      restHelper.getURLPrefix(appConfig.host) +
      appConfig.services.orders.deleteOrderItem.replace("{id}", item.id);

    if (action === actions.ADD) {
      setOrderRecipes(
        orderRecipes.filter((recipe) => recipe.recipe.id !== item.recipe.id)
      );
    } else {
      restHelper
        .deleteRequest(url)
        .then((res) => {
          if (res.status === 200) {
            setOrderRecipes(
              orderRecipes.filter(
                (recipe) => recipe.recipe.id !== item.recipe.id
              )
            );
          } else {
            errorDispatcher();
          }
        })
        .catch((err) => {
          errorDispatcher();
        });
    }
  };

  return (
    <div className="add-edit-recipe-container">
      <div className="add-edit-recipe-header">
        {action === actions.ADD ? "اضافة طلب" : "تعديل طلب"}
      </div>
      <div className="add-edit-recipe-input-conatiner">
        <div className="add-edit-recipe-name-input">
          <div className="add-edit-recipe-input-label">نوع الطلب</div>
          <Autocomplete
            type="dropdown"
            options={typeOptions}
            disabled={action === actions.ADD ? false : true}
            dropDownClassName="add-edit-recipe-input-type"
            value={orderData.type.value.name}
            onChange={(e, newValue) =>
              setOrderData({
                ...orderData,
                type: { ...orderData.type, value: newValue },
              })
            }
          />
          {orderData.type.error && (
            <div className="add-edit-recipe-dropdown-error">
              {orderData.type.helperText}
            </div>
          )}
        </div>
      </div>

      <div className="underline"></div>
      <div className="add-edit-recipe-input-conatiner">
        <div className="add-edit-recipe-name-input">
          <div className="add-edit-recipe-input-label">الوصفات</div>
          <Autocomplete
            type="dropdown"
            options={recipeOptions}
            dropDownClassName="add-edit-recipe-input-section"
            value={recipe}
            onChange={(e, newValue) => setRecipe(newValue)}
          />
        </div>
        {orderRecipesError && (
          <div className="add-edit-recipe-dropdown-error">
            {orderRecipesError}
          </div>
        )}
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
              editOrderHandler();
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
        {orderRecipes.map((item, index) => (
          <div className="add-edit-recipe-ingredients-row" key={index}>
            <div className="add-edit-recipe-ingredient-data">
              {item.recipe.name}
            </div>
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
                pathname: "/orders",
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
                addOrderHandler();
              }}
              text="حفظ"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddEditOrder;
