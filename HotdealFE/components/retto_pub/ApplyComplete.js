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
            <b>1주일 동안</b> 잘 관리해 주세요. <br />
            <b>매일 {jewel.cash}만원</b>은 채워져 있어야 해요.
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
            다음 주 월요일 <b className="jewelColor">리또 GET</b>
          </div>
        </div>
        <div className={styleApply.tipWrap}>
          <p className={styleApply.tipTitle}>리또 받기 꿀TIP</p>
          <p className={styleApply.tipsubText}>
            <b>매일 밤 9시 전</b>까지만 채워두면 OK ! <br />
            줄어든 만큼 <b>알아서 채워주는 자동 충전</b>은 어때요?
          </p>
          <button type="button">자동 충전 설정</button>
        </div>
      </div>
    </div>
  );
};

export default ApplyComplete;
