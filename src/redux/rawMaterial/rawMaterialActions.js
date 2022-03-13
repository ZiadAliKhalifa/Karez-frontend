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
import appConfig from "../../config.json";
import restHelper from "../../helpers/RestHelper";

const baseURL = restHelper.getURLPrefix(appConfig.host);

export const fetchRawMaterialRequest = () => {
  return {
    type: FETCH_RAW_MATERIAL_REQUEST,
  };
};

export const fetchRawMaterialSuccess = (rawMaterial) => {
  return {
    type: FETCH_RAW_MATERIAL_SUCCESS,
    payload: rawMaterial,
  };
};

export const fetchRawMaterialFailure = (error) => {
  return {
    type: FETCH_RAW_MATERIAL_FAILURE,
    payload: error,
  };
};

export const fetchRawMaterialsRequest = () => {
  return {
    type: FETCH_RAW_MATERIALS_REQUEST,
  };
};

export const fetchRawMaterialsSuccess = (rawMaterials) => {
  return {
    type: FETCH_RAW_MATERIALS_SUCCESS,
    payload: rawMaterials,
  };
};

export const fetchRawMaterialsFailure = (error) => {
  return {
    type: FETCH_RAW_MATERIALS_FAILURE,
    payload: error,
  };
};

export const editRawMaterialRequest = () => {
  return {
    type: EDIT_RAW_MATERIAL_REQUEST,
  };
};

export const editRawMaterialSuccess = (rawMaterial) => {
  return {
    type: EDIT_RAW_MATERIAL_SUCCESS,
    payload: rawMaterial,
  };
};

export const editRawMaterialFailure = (error) => {
  return {
    type: EDIT_RAW_MATERIAL_FAILURE,
    payload: error,
  };
};

export const editRawMaterialQty = (number) => {
  return {
    type: EDIT_RAW_MATERIAL_QTY,
    payload: number,
  };
};

export const fetchRawMaterials = () => {
  const url = `${baseURL}${appConfig.services.inventory.getAllItems}`;

  return async (dispatch) => {
    dispatch(fetchRawMaterialsRequest());
    const rawMaterialRes = await restHelper.getRequest(url);

    if (rawMaterialRes.status === 200) {
      dispatch(fetchRawMaterialsSuccess(rawMaterialRes.data.data));
    } else {
      dispatch(fetchRawMaterialsFailure(rawMaterialRes.data.error));
    }
  };
};

export const fetchRawMaterialById = (rawMaterialId) => {
  const url = `${baseURL}${appConfig.services.inventory.getItemById}?id=${rawMaterialId}`;

  return async (dispatch) => {
    dispatch(fetchRawMaterialRequest());
    const rawMaterialRes = await restHelper.getRequest(url);

    if (rawMaterialRes.status === 200) {
      dispatch(fetchRawMaterialSuccess(rawMaterialRes.data.data));
    } else {
      dispatch(fetchRawMaterialFailure(rawMaterialRes.data.error));
    }
  };
};

export const editRawMaterialById = (
  rawMaterialId,
  price,
  quantity,
  minimumQuantity,
  criticalQuantity,
  description
) => {
  const url = `${baseURL}${appConfig.services.inventory.editItem}`;

  const reqBody = {
    id: rawMaterialId,
    price: price,
    quantity: quantity,
    minimum_quantity: minimumQuantity,
    critical_quantity: criticalQuantity,
    description: description,
  };

  return async (dispatch) => {
    dispatch(editRawMaterialRequest());
    try {
      const rawMaterialRes = await restHelper.putRequest(url, reqBody);
      if (rawMaterialRes.status === 200) {
        dispatch(editRawMaterialSuccess(rawMaterialRes.data.data));
      } else {
        dispatch(editRawMaterialFailure(rawMaterialRes.data.error));
      }
    } catch (err) {
      dispatch(editRawMaterialFailure(err.response.data.error));
    }
  };
};
