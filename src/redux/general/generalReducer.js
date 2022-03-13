import {
  FETCH_UNIT_SUCCESS,
  FETCH_UNIT_FAILURE,
  FETCH_TYPE_SUCCESS,
  FETCH_TYPE_FAILURE,
  FETCH_SECTION_SUCCESS,
  FETCH_SECTION_FAILURE,
} from "./generalTypes";

const initialState = {
  unit: [],
  type: [],
  section: [],
  error: {},
};

const generalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNIT_SUCCESS:
      return {
        ...state,
        unit: [...action.payload],
        error: {},
      };

    case FETCH_UNIT_FAILURE:
      return {
        ...state,
        unit: [],
        error: { ...action.payload },
      };

    case FETCH_TYPE_SUCCESS:
      return {
        ...state,
        type: [...action.payload],
        error: {},
      };

    case FETCH_TYPE_FAILURE:
      return {
        ...state,
        type: [],
        error: { ...action.payload },
      };

    case FETCH_SECTION_SUCCESS:
      return {
        ...state,
        section: [...action.payload],
        error: {},
      };

    case FETCH_SECTION_FAILURE:
      return {
        ...state,
        section: [],
        error: { ...action.payload },
      };

    default:
      return state;
  }
};

export default generalReducer;
