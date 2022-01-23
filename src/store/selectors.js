export const getIsLogged = (state) => state.auth;
export const getUi = (state) => state.ui;
export const getAds = (state) =>
  state.ads.data.filter((data) => {
    return data;
  });
export const getTags = (state) =>
  state.tags.data.filter((data) => {
    return data;
  });
export const areAdsLoaded = (state) => state.ads.loaded;

export const getAd = (state, adId) =>
  state.ads.data.find((ad) => ad.id === adId);
