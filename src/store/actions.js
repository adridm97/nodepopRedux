import { areAdsLoaded, getAd } from "./selectors";

import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADS_LOADED_SUCCESS,
  AD_CREATED_SUCCESS,
  AD_LOADED_SUCCESS,
  TAGS_LOADED_SUCCESS,
  DELETE_AD_REQUEST,
  DELETE_AD_SUCCESS,
  UI_RESET_ERROR,
} from "./types";
export function authLoginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
}

export function authLoginSuccess() {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
}

export function authLoginFailure(error) {
  return {
    type: AUTH_LOGIN_FAILURE,
    error: true,
    payload: error,
  };
}
export function authLogin(checked, credentials, history) {
  console.log(credentials);
  // This function will be a redux action
  return async function (dispatch, getState, { api }) {
    dispatch(authLoginRequest());

    try {
      await api.auth.login(checked, credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || {
        from: { pathname: "/" },
      };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
}
export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}
export function adsLoaded(ads) {
  return {
    type: ADS_LOADED_SUCCESS,
    payload: ads,
  };
}
export function tagsLoaded(tags) {
  return {
    type: TAGS_LOADED_SUCCESS,
    payload: tags,
  };
}
export function loadAds() {
  return async function (dispatch, getState, { api }) {
    try {
      const ads = await api.ads.getLatestAds();
      dispatch(adsLoaded(ads));
    } catch (error) {}
  };
}
export function loadTags() {
  return async function (dispatch, getState, { api }) {
    try {
      const ads = await api.ads.getTags();
      dispatch(tagsLoaded(ads));
    } catch (error) {}
  };
}

export function adLoaded(ad) {
  return {
    type: AD_LOADED_SUCCESS,
    payload: ad,
  };
}
export function loadAd(adId) {
  return async function (dispatch, getState, { api, history }) {
    const ad = getAd(getState(), adId);
    if (ad) {
      return;
    }
    try {
      const ad = await api.ads.getAd(adId);
      dispatch(adLoaded(ad));
      // history.push(`/ads/${adId}`);
    } catch (error) {}
  };
}
export function adCreated(ad) {
  return {
    type: AD_CREATED_SUCCESS,
    payload: ad,
  };
}
export function createAd(ad, history) {
  return async function (dispatch, getState, { api }) {
    try {
      const newAd = await api.ads.createAd(ad);
      dispatch(adCreated(newAd));
      history.push(`/ads/${newAd.id}`);
    } catch (error) {}
  };
}

export function deleteAdRequest() {
  return {
    type: DELETE_AD_REQUEST,
  };
}
export function adDeleted() {
  return {
    type: DELETE_AD_SUCCESS,
  };
}
export function deleteAd(adId, history) {
  return async function (dispatch, getState, { api }) {
    try {
      await api.ads.deleteAd(adId);
      dispatch(adDeleted);
      const { from } = history.location.state || {
        from: { pathname: "/ads" },
      };
      history.replace(from);
    } catch (error) {}
  };
}

export function uiResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
