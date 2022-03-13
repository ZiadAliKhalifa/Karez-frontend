import {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    FETCH_ORDERS_BY_TYPE_REQUEST,
    FETCH_ORDERS_BY_TYPE_SUCCESS,
    FETCH_ORDERS_BY_TYPE_FAILURE,
  } from "./ordersTypes";
  import appConfig from "../../config.json";
  import restHelper from "../../helpers/RestHelper";
  
  const baseURL = restHelper.getURLPrefix(appConfig.host);
  
  export const fetchOrdersRequest = () => {
    return {
      type: FETCH_ORDERS_REQUEST,
    };
  };
  
  export const fetchOrdersSuccess = (orders) => {
    return {
      type: FETCH_ORDERS_SUCCESS,
      payload: orders,
    };
  };
  
  export const fetchOrdersFailure = (error) => {
    return {
      type: FETCH_ORDERS_FAILURE,
      payload: error,
    };
  };
  
  export const fetchOrders = () => {
    const url = `${baseURL}${appConfig.services.orders.getAllItems}`;
  
    return async (dispatch) => {
      dispatch(fetchOrdersRequest());
      const ordersRes = await restHelper.getRequest(url);
  
      if (ordersRes.status === 200) {
        dispatch(fetchOrdersSuccess(ordersRes.data.data));
      } else {
        dispatch(fetchOrdersFailure(ordersRes.data.error));
      }
    };
  };
  
  export const fetchOrdersByTypeRequest = () => {
    return {
      type: FETCH_ORDERS_BY_TYPE_REQUEST,
    };
  };
  
  export const fetchOrdersByTypeSuccess = (orders) => {
    return {
      type: FETCH_ORDERS_BY_TYPE_SUCCESS,
      payload: orders,
    };
  };
  
  export const fetchOrdersByTypeFailure = (error) => {
    return {
      type: FETCH_ORDERS_BY_TYPE_FAILURE,
      payload: error,
    };
  };
  
  export const fetchOrdersByType = (type) => {
    const url = `${baseURL}${appConfig.services.orders.getByType.replace(
      "{orders_type}",
      type
    )}`;
  
    return async (dispatch) => {
      dispatch(fetchOrdersByTypeRequest());
      const ordersRes = await restHelper.getRequest(url);
  
      if (ordersRes.status === 200) {
        dispatch(fetchOrdersByTypeSuccess(ordersRes.data.data));
      } else {
        dispatch(fetchOrdersByTypeFailure(ordersRes.data.error));
      }
    };
  };
  