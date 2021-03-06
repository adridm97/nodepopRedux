import { combineReducers } from "redux";

import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADS_LOADED_SUCCESS,
  AD_CREATED_SUCCESS,
  AD_LOADED_SUCCESS,
  TAGS_LOADED_SUCCESS,
  TAGS_CREATED_SUCCESS,
  UI_RESET_ERROR,
  DELETE_AD_SUCCESS,
  DELETE_AD_REQUEST,
} from "./types";
export const defaultState = {
  auth: true,
  ads: {
    loaded: false,
    data: [],
    prueba: false,
  },
  tags: {
    loaded: false,
    data: [],
  },
  ui: {
    isLoading: false,
    error: null,
  },
};
export function auth(authState = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return authState;
  }
}
export function ads(adsState = defaultState.ads, action) {
  switch (action.type) {
    case ADS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    case AD_LOADED_SUCCESS:
    case DELETE_AD_REQUEST:
    case AD_CREATED_SUCCESS:
      return {
        ...adsState,
        data: [...adsState.data, action.payload],
        prueba: true,
      };
    default:
      return adsState;
  }
}
export function tags(tagsState = defaultState.tags, action) {
  switch (action.type) {
    case TAGS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    default:
      return tagsState;
  }
}
export function ui(uiState = defaultState.ui, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
    case ADS_LOADED_SUCCESS:
      return { isLoading: false, error: null };
    case TAGS_LOADED_SUCCESS:
      return { isLoading: false, error: null };
    case AUTH_LOGIN_FAILURE:
      return { isLoading: false, error: action.payload };
    case UI_RESET_ERROR:
      return { ...uiState, error: null };
    default:
      return uiState;
  }
}
