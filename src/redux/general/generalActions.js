import {
    FETCH_UNIT_SUCCESS,
    FETCH_UNIT_FAILURE,
    FETCH_TYPE_SUCCESS,
    FETCH_TYPE_FAILURE,
    FETCH_SECTION_SUCCESS,
    FETCH_SECTION_FAILURE,
  } from "./generalTypes";
  import appConfig from "../../config.json";
  import restHelper from "../../helpers/RestHelper";
  
  const baseURL = restHelper.getURLPrefix(appConfig.host);

  export const fetchUnits = () => {
    const url = `${baseURL}${appConfig.services.general.getUnits}`;
  
    return async (dispatch) => {
      const units = await restHelper.getRequest(url);
  
      if (units.status === 200) {
        units.data.data.forEach(unit => {
            unit["label"]= unit.name;
        });
        dispatch(fetchUnitsSuccess(units.data.data));
      } else {
        dispatch(fetchUnitsFailure(units.data.error));
      }
    };
  };

  export const fetchUnitsSuccess = (unit) => {
    return {
      type: FETCH_UNIT_SUCCESS,
      payload: unit,
    };
  };
  
  export const fetchUnitsFailure = (error) => {
    return {
      type: FETCH_UNIT_FAILURE,
      payload: error,
    };
  };

  export const fetchTypes = () => {
    const url = `${baseURL}${appConfig.services.general.getTypes}`;
  
    return async (dispatch) => {
      const types = await restHelper.getRequest(url);
  
      if (types.status === 200) {
        types.data.data.forEach(type => {
            type["label"]= type.name;
        });
        dispatch(fetchTypesSuccess(types.data.data));
      } else {
        dispatch(fetchTypesFailure(types.data.error));
      }
    };
  };

  export const fetchTypesSuccess = (type) => {
    return {
      type: FETCH_TYPE_SUCCESS,
      payload: type,
    };
  };
  
  export const fetchTypesFailure = (error) => {
    return {
      type: FETCH_TYPE_FAILURE,
      payload: error,
    };
  };

  export const fetchSection = () => {
    const url = `${baseURL}${appConfig.services.general.getSection}`;
  
    return async (dispatch) => {
      const sections = await restHelper.getRequest(url);
  
      if (sections.status === 200) {
        sections.data.data.forEach(section => {
            section["label"]= section.name;
        });
        dispatch(fetchSectionSuccess(sections.data.data));
      } else {
        dispatch(fetchSectionFailure(sections.data.error));
      }
    };
  };

  export const fetchSectionSuccess = (section) => {
    return {
      type: FETCH_SECTION_SUCCESS,
      payload: section,
    };
  };
  
  export const fetchSectionFailure = (error) => {
    return {
      type: FETCH_SECTION_FAILURE,
      payload: error,
    };
  };