import {
  FETCH_RECIPE_REQUEST,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_FAILURE,
  FETCH_RECIPE_BY_TYPE_REQUEST,
  FETCH_RECIPE_BY_TYPE_SUCCESS,
  FETCH_RECIPE_BY_TYPE_FAILURE,
} from "./recipeTypes";

const initialState = {
  isLoading: true,
  recipes: [],
  error: {},
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipes: [...action.payload],
        error: {},
      };

    case FETCH_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        recipes: [],
        error: { ...action.payload },
      };
      case FETCH_RECIPE_BY_TYPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_RECIPE_BY_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipes: [...action.payload],
        error: {},
      };

    case FETCH_RECIPE_BY_TYPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        recipes: [],
        error: { ...action.payload },
      };
    default:
      return state;
  }
};

export default recipeReducer;
