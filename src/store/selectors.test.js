import { getAd } from "./selectors";
describe("getAd", () => {
  test("should return ad", () => {
    const data = [{ id: 1 }, { id: 2, content: "Ford Mustang" }];
    const state = {
      ads: {
        data,
      },
    };
    const adId = 2;
    expect(getAd(state, adId)).toMatchObject({ id: adId });
  });
});
