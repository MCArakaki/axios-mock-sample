import React, { useState } from "react";
import style from "./style.module.css";

/** ラジオボタン設定 */
export interface Radio {
  label: string;
  value: string;
}

type RadioButtonProps = {
  radioButtonList: Radio[];
  initSelection: string;
  radioButtonName: string;
  onInputValue?: (input: string, inputName: string) => void;
};

const RadioButton = ({
  radioButtonList,
  initSelection,
  radioButtonName,
  onInputValue,
}: RadioButtonProps) => {
  // 選択中のラジオボタン
  const [selected, setSelected] = useState(initSelection);
  // ラジオボタン切り替え
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputValue && onInputValue(event.target.value, event.target.name);
    setSelected(event.target.value);
  };

  return (
    <div className="container form-check">
      <div className={style.areaTextWrapper}>
        {radioButtonList.map((radio, index) => {
          return (
            <div className="col-4" key={index}>
              <label>
                <input
                  className="form-check-input"
                  type="radio"
                  name={radioButtonName}
                  value={radio.value}
                  checked={radio.value === selected}
                  onChange={changeValue}
                />
                <label>
                  <span className={style.areaText}>{radio.label}</span>
                </label>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RadioButton;
