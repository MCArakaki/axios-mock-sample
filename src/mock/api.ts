import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { dataAmount, osakaDataAmount, hyogoDataAmount } from "./dummydata";

export const mockStart = () => {
  const mockAxios = new MockAdapter(axios);

  // 基本パターン
  // mockAxios.onGet("test/amount").reply(200, dataAmount);

  // 選択肢によって返却するモックデータを制御
  // mockAxios.onGet("test/amount").reply((config) => {
  //   if (config.params.place === "大阪" && config.params.age === "新築") {
  //     return [200, osakaDataAmount];
  //   } else if (
  //     config.params.place === "兵庫" &&
  //     config.params.area === "指定なし" &&
  //     config.params.age === "指定なし"
  //   ) {
  //     return [200, hyogoDataAmount];
  //   } else {
  //     return [200, dataAmount];
  //   }
  // });

  // レスポンスエラー
  mockAxios.onGet("test/amount").reply((config) => {
    if (config.params.place === "指定なし") {
      return [400, { message: "場所を指定してください" }];
    }
    return [200, dataAmount];
  });
};
