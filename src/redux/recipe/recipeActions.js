import {
  FETCH_RECIPE_REQUEST,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
  FETCH_RECIPE_BY_TYPE_REQUEST,
  FETCH_RECIPE_BY_TYPE_SUCCESS,
  FETCH_RECIPE_BY_TYPE_FAILURE,
} from "./recipeTypes";
import appConfig from "../../config.json";
import restHelper from "../../helpers/RestHelper";

const baseURL = restHelper.getURLPrefix(appConfig.host);

export const fetchRecipeRequest = () => {
  return {
    type: FETCH_RECIPE_REQUEST,
  };
};

export const fetchRecipeSuccess = (recipe) => {
  return {
    type: FETCH_RECIPE_SUCCESS,
    payload: recipe,
  };
};

export const fetchRecipeFailure = (error) => {
  return {
    type: FETCH_RECIPE_FAILURE,
    payload: error,
  };
};

export const fetchRecipes = () => {
  const url = `${baseURL}${appConfig.services.recipe.getAllItems}`;

  return async (dispatch) => {
    dispatch(fetchRecipeRequest());
    const recipeRes = await restHelper.getRequest(url);

    if (recipeRes.status === 200) {
      dispatch(fetchRecipeSuccess(recipeRes.data.data));
    } else {
      dispatch(fetchRecipeFailure(recipeRes.data.error));
    }
  };
};

export const fetchRecipeByTypeRequest = () => {
  return {
    type: FETCH_RECIPE_BY_TYPE_REQUEST,
  };
};

export const fetchRecipeByTypeSuccess = (recipe) => {
  return {
    type: FETCH_RECIPE_BY_TYPE_SUCCESS,
    payload: recipe,
  };
};

export const fetchRecipeByTypeFailure = (error) => {
  return {
    type: FETCH_RECIPE_BY_TYPE_FAILURE,
    payload: error,
  };
};

export const fetchRecipesByType = (type) => {
  const url = `${baseURL}${appConfig.services.recipe.getByType.replace(
    "{recipe_type}",
    type
  )}`;

  return async (dispatch) => {
    dispatch(fetchRecipeByTypeRequest());
    const recipeRes = await restHelper.getRequest(url);

    if (recipeRes.status === 200) {
      dispatch(fetchRecipeByTypeSuccess(recipeRes.data.data));
    } else {
      dispatch(fetchRecipeByTypeFailure(recipeRes.data.error));
    }
  };
};
