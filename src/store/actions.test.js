import { adsLoaded, authLogin } from "./actions";
import { ADS_LOADED_SUCCESS } from "./types";

describe("adsLoaded", () => {
  test("deberá devolver una acción de tipo ADS_LOADED_SUCCESS", () => {
    const ads = "ads";
    const expectedResult = {
      type: ADS_LOADED_SUCCESS,
      payload: ads,
    };
    expect(adsLoaded(ads)).toEqual(expectedResult);
  });
});
describe("authLogin", () => {
  const checked = false;
  const credentials = "credentials";
  const history = {
    location: {},
    replace: jest.fn(),
  };
  const action = authLogin(checked, credentials, history);
  describe("when login api resolves", () => {
    const api = { auth: { login: jest.fn().mockResolvedValue() } };
    const dispatch = jest.fn();
    const getState = () => {};
    test('should redirect to "/"', async () => {
      await action(dispatch, getState, { api, history });
      expect(history.replace).toHaveBeenCalledWith({ pathname: "/" });
    });
  });
});
