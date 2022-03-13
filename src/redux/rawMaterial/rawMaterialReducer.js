import {
  FETCH_RAW_MATERIAL_REQUEST,
  FETCH_RAW_MATERIAL_SUCCESS,
  FETCH_RAW_MATERIAL_FAILURE,
  FETCH_RAW_MATERIALS_REQUEST,
  FETCH_RAW_MATERIALS_SUCCESS,
  FETCH_RAW_MATERIALS_FAILURE,
  EDIT_RAW_MATERIAL_REQUEST,
  EDIT_RAW_MATERIAL_SUCCESS,
  EDIT_RAW_MATERIAL_FAILURE,
  EDIT_RAW_MATERIAL_QTY,
} from "./rawMaterialTypes";

//Defining the initial starredRepos state
const initialState = {
  isLoading: true,
  rawMaterials: [],
  editQtyRequests: 0,
  rawMaterial: {},
  error: {},
};

//Defining the starredRepos
const rawMaterialReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_RAW_MATERIAL_QTY:
      return {
        ...state,
        editQtyRequests: state.editQtyRequests + action.payload,
      };
    case FETCH_RAW_MATERIALS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_RAW_MATERIALS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rawMaterials: [...action.payload],
        error: {},
      };

    case FETCH_RAW_MATERIALS_FAILURE:
      return {
        ...state,
        isLoading: false,
        rawMaterials: [],
        error: { ...action.payload },
      };

    case FETCH_RAW_MATERIAL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_RAW_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rawMaterial: { ...action.payload },
        error: {},
      };

    case FETCH_RAW_MATERIAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        rawMaterials: {},
        error: { ...action.payload },
      };

    case EDIT_RAW_MATERIAL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case EDIT_RAW_MATERIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rawMaterial: { ...action.payload },
        editQtyRequests: state.editQtyRequests - 1,
        error: {},
      };

    case EDIT_RAW_MATERIAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        rawMaterial: {},
        error: { ...action.payload },
      };

    default:
      return state;
  }
};

export default rawMaterialReducer;