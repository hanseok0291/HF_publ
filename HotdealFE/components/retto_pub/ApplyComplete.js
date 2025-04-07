import React from "react";

import Header from "../../components/retto_pub/common/Header";

import styleApply from "../../styles/retto_pub/Apply.module.css";
import styleCommon from "../../styles/retto_pub/Common.module.css";

const ApplyComplete = ({
  jewel = {
    eng: "ruby",
    kor: "루비",
    cash: "10",
    prize: "1백만원",
  },
}) => {
  return (
    <div className={`${styleCommon.layer} ${styleApply.applyComplete} ${jewel.eng}`}>
      <Header title="발소 리워드 로또 머니함" sideBtn="비우기" />
      <div className={`${styleCommon.container}`}>
        <div className={`${styleApply.borderBox}`}>
          <span className="jewelImg"></span>
          <p className={styleApply.smallText}>
            <b>{jewel.cash}만원</b>을 머니함에 넣어뒀어요. <br />
          </p>
          <p className={styleApply.subText}>
            보관만 하면 <br />
            <b>매일 발소 리워드 로또를 받아요!</b>
          </p>
        </div>
        <div className={styleApply.tipWrap}>
          <p className={styleApply.tipTitle}>발소 리워드 로또 머니함이 뭐예요?</p> 
          <p className={styleApply.tipsubText}>
            <b>채우기한 머니를 별도 보관하는 상자예요!</b> <br />
            머니함 속 금액은 결제할 때 사용되지 않아서 머니 <br />
            채우기로 쉽게 발소 리워드 로또를 받을 수 있어요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyComplete;
