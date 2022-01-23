import { ads, defaultState, tags } from "./reducers";
import { ADS_LOADED_SUCCESS, TAGS_LOADED_SUCCESS } from "./types";

describe("ads", () => {
  test("Manejador de la accion de carga de anuncios correcta (ADS_LOADED_SUCCESS)", () => {
    const payload = ["ad1"];
    const action = {
      type: ADS_LOADED_SUCCESS,
      payload,
    };
    const expectedState = {
      loaded: true,
      data: payload,
    };
    expect(ads(defaultState.ads, action)).toEqual(expectedState);
  });
});
describe("tags", () => {
  test("Manejador de la accion de carga de tags correcta (TAGS_LOADED_SUCCESS)", () => {
    const payload = ["tag"];
    const action = {
      type: TAGS_LOADED_SUCCESS,
      payload,
    };
    const expectedState = {
      loaded: true,
      data: payload,
    };
    expect(tags(defaultState.tags, action)).toEqual(expectedState);
  });
});
