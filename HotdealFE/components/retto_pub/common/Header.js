import React from "react";

//style
import styleCommon from "../../../styles/retto_pub/Common.module.css";

const Header = ({
  title = "발소 리워드 로또",
  sideBtn = "안내",
  isborder = false,
  isCenter = false,
  isBack = true,
  sideBtnClassName = "",
}) => {
  return (
    <div
      className={`${styleCommon.header} ${
        isborder ? styleCommon.headerBorder : ""
      } ${isCenter ? styleCommon.center : ""}`}
    >
      {isBack && (
        <button type="button" className={styleCommon.backButton}>
          뒤로가기
        </button>
      )}
      <h1 className={`${isCenter ? styleCommon.center : ""}`}>{title}</h1>
      {sideBtn !== "" && (
        <button
          type="button"
          className={`${styleCommon.openBottomSheet} ${sideBtnClassName}`}
        >
          {sideBtn}
        </button>
      )}
    </div>
  );
};

export default Header;
