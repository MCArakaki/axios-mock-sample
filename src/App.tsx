import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import "./App.css";
import RadioButton from "./components/atoms/RadioButton";
import {
  placeRadioButtons,
  stationWalkRadioButtons,
  areaRadioButtons,
  ageRadioButtons,
} from "./constant";
import { mockStart } from "./mock/api";

export type InputDataType = {
  place: string;
  stationWalk: string;
  area: string;
  age: string;
};

function App() {
  mockStart();

  // 見積金額
  const [totalAmount, setTotalAmount] = useState("ー");

  // エラーメッセージ
  const [errorMessage, setErrorMessage] = useState("");

  // ラジオボタンで選択された値を設定
  const [inputDatas, setInputDatas] = useState<InputDataType>({
    place: "大阪",
    stationWalk: "指定なし",
    area: "指定なし",
    age: "指定なし",
  });

  // ラジオボタン押下時に呼び出されるコールバック関数
  const onChangeInputValue = (input: string, inputName: string) => {
    setInputDatas({ ...inputDatas, [inputName]: input });
  };

  // 見積金額取得API
  const result = async () => {
    try {
      const response = await axios.get("test/amount", {
        params: inputDatas,
      });

      // 見積金額を設定
      setTotalAmount(response.data.totalAmount);
      // エラーメッセージ初期化
      setErrorMessage("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data.message);
      }

      // 見積金額初期化
      setTotalAmount("ー");
    }
  };

  // 「見積る！」ボタン押下時に呼び出される関数
  const onNext = () => {
    result();
  };

  return (
    <div className="App">
      <h1>住宅見積</h1>
      <div className="ConditionContainer">
        <h2 className="Title">
          場所
          {errorMessage && <span className="ErrorText">{errorMessage}</span>}
        </h2>
        <div className="Input">
          <RadioButton
            radioButtonList={placeRadioButtons}
            initSelection="大阪"
            radioButtonName="place"
            onInputValue={onChangeInputValue}
          />
        </div>
      </div>
      <div className="ConditionContainer">
        <h2 className="Title">駅徒歩</h2>
        <div className="Input">
          <RadioButton
            radioButtonList={stationWalkRadioButtons}
            initSelection="指定なし"
            radioButtonName="stationWalk"
            onInputValue={onChangeInputValue}
          />
        </div>
      </div>
      <div className="ConditionContainer">
        <h2 className="Title">占有面積</h2>
        <div className="Input">
          <RadioButton
            radioButtonList={areaRadioButtons}
            initSelection="指定なし"
            radioButtonName="area"
            onInputValue={onChangeInputValue}
          />
        </div>
      </div>
      <div className="ConditionContainer">
        <h2 className="Title">築年数</h2>
        <div className="Input">
          <RadioButton
            radioButtonList={ageRadioButtons}
            initSelection="指定なし"
            radioButtonName="age"
            onInputValue={onChangeInputValue}
          />
        </div>
      </div>
      <button className="EstimateButton" onClick={() => onNext()}>
        見積る！
      </button>
      <div className="TotalAmountContainer">
        <div className="TotalAmountHeader">見積金額</div>
        <div className="TotalAmount">
          {totalAmount}
          {totalAmount !== "ー" && "円"}
        </div>
      </div>
    </div>
  );
}

export default App;
