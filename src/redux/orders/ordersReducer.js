import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    FETCH_ORDERS_BY_TYPE_REQUEST,
    FETCH_ORDERS_BY_TYPE_SUCCESS,
    FETCH_ORDERS_BY_TYPE_FAILURE,
  } from "./ordersTypes";
  
  const initialState = {
    isLoading: true,
    orders: [],
    error: {},
  };
  
  const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDERS_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
  
      case FETCH_ORDERS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          orders: [...action.payload],
          error: {},
        };
  
      case FETCH_ORDERS_FAILURE:
        return {
          ...state,
          isLoading: false,
          orders: [],
          error: { ...action.payload },
        };
        case FETCH_ORDERS_BY_TYPE_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
  
      case FETCH_ORDERS_BY_TYPE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          orders: [...action.payload],
          error: {},
        };
  
      case FETCH_ORDERS_BY_TYPE_FAILURE:
        return {
          ...state,
          isLoading: false,
          orders: [],
          error: { ...action.payload },
        };
      default:
        return state;
    }
  };
  
  export default ordersReducer;
  