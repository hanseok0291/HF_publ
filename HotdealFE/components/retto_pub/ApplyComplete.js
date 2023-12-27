import React from "react";

import styleApply from "../../styles/retto_pub/Apply.module.css";
import styleCommon from "../../styles/retto_pub/Common.module.css";

const ApplyComplete = ({
  jewel = {
    eng: "ruby",
    kor: "루비",
    cash: "10",
    prize: "1백만원",
    level: "Lv. 1",
  },
}) => {
  return (
    <div className={`${styleCommon.layer} ${styleApply.applyComplete} ${jewel.eng}`}>
      <div className={styleCommon.layerHeader}>
        <h2>신청 완료</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={`${styleCommon.container}`}>
        <div className={`${styleApply.borderBox}`}>
          <span className="jewelImg"></span>
          <p className={styleApply.levelText}>
            {jewel.level}<button type="button"></button>
          </p>
          <p className={styleApply.subText}>
            <b>{jewel.cash}만원</b>을 리또 머니함에 넣어뒀어요. <br />
            <b>1주일 동안</b> 잘 보관해 주세요.
            {/* 해지 => 다시신청 */}
            {/* <b>다음주 월요일</b>에 보관이 시작돼요! */}
          </p>
          <ul className={`${styleApply.weekListWrap}`}>
            <li className={`${styleApply.checked}`}><span>월</span></li>
            <li className={`${styleApply.checked} ${styleApply.today} today`}><span>화</span></li>
            <li><span>수</span></li>
            <li><span>목</span></li>
            <li><span>금</span></li>
            <li><span>토</span></li>
            <li><span>일</span></li>
          </ul>
          <div className={styleApply.bottomBox}>
            다음 주 월요일 <b className="jewelColor">리또 GET</b><span className={styleApply.ddayText}>D-3</span>
            {/* 해지 > 다시 신청 */}
            {/* 1주일 잘 보관하면 매주 월요일 <b className="jewelColor">리또 GET</b> */}
          </div>
        </div>
        <div className={styleApply.tipWrap}>
          <p className={styleApply.tipTitle}>리또 머니함이 뭐에요?</p> 
          <p className={styleApply.tipsubText}>
            리또를 받기 위해 채운 머니를 <br />
            <b>보유 금액과 분리하여 별도 보관하는 상자예요!</b> <br />
            머니함 속 금액은 결제할 때 사용할 수 없어요. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyComplete;
