import React, { useEffect, useRef, useState } from "react";

// style
import styleFillBoxMain from "../../styles/retto_pub/FillBoxMain.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";
import FadeInSection from "./common/FadeInSection";

const rettoJewelCase = [
  {
    eng: "ruby",
    kor: "루비",
  },
  {
    eng: "emerald",
    kor: "에메랄드",
  },
  {
    eng: "diamond",
    kor: "다이아",
  },
];

const FillBoxMain = ({ stampInfo, rettoCase, money = false, noti = true, fail = false }) => {
  const [isTooltip, setIsTooltip] = useState(false);
  const [stampArr, setStampArr] = useState(Array(10).fill(undefined)); // 스탬프 정보
  const [stampCnt, setStampCnt] = useState(0); // 스탬프 개수
  const [isFail, setIsFail] = useState(null); // 실패 상태 확인
  const [weekUnit, setWeekUnit] = useState(null); // 주차 1의 자리
  const notiOn = noti; // 알림 설정
  const failSoon = fail;
  const moneyEmpty = money; // 머니함 상태 true 비어있음 false 채워져 있음
  const levelInfo = rettoJewelCase[rettoCase]; // 0 ruby 1 emelard 2 diamond

  const replaceArray = (info) => {
    const result = Array(10).fill(undefined);
    for (let i = 0; i < weekUnit; i++) {
      result[i] = { ...info };
    }
    setStampArr(result);
  };

  const handleTooltipToggle = () => {
    setIsTooltip(!isTooltip);
  };

  useEffect(() => {
    setStampCnt(stampInfo.weekOrder);
    setIsFail(stampInfo.succYn === "N");
  }, [stampInfo]);

  useEffect(() => {
    setWeekUnit(stampCnt % 10 || 10);
  }, [stampCnt]);

  useEffect(() => {
    if (weekUnit !== null) {
      replaceArray(stampInfo);
    }
  }, [weekUnit]);

  return (
    <div className={`${styleFillBoxMain.container}`}>
      <div className={`${styleFillBoxMain.stampConBox} ${levelInfo.eng}`}>
        <FadeInSection>
          {/* ruby emerald diamond */}
          <button type="button" className={styleFillBoxMain.weekBtn}>
            <em>{levelInfo.kor}</em> {weekUnit}주차
          </button>
          <p className={styleFillBoxMain.infoText}>
            {!notiOn ? (
              // D: 마케팅 수신 동의 철회 (notiOn === false)
              <>
                <a href="#">알림 설정</a>하고 발소 리워드 로또 받으세요.
              </>
            ) : failSoon ? (
              // B: 이번 주 실패 확정 (failSoon === true)
              <>아쉬워요... 다음 주 월요일에 다시 시작해요.</>
            ) : (weekUnit < 1) ? (
              // C: 재신청 후 1주차 재시작 전 (특정 조건 추가)
              <>다음 주 월요일부터 시작 두근두근</>
            ) : (
              // A: 이번 주 성공 진행 중 (failSoon === false)
              <>머니 채워두고 매일 발소 리워드 로또 받아요.</>
            )}
          </p>
          <div className={styleFillBoxMain.stampContainer}>
            <ul className={styleFillBoxMain.stampWrap}>
              {stampArr.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`${
                      isFail && weekUnit - 1 === index
                        ? "fail"
                        : index < weekUnit
                        ? levelInfo.eng
                        : ""
                    } 
                    ${
                      item?.succYn === "Y" && weekUnit - 1 === index
                        ? "current"
                        : ""
                    } ${
                      index === 9 && levelInfo.eng !== "ruby"
                        ? styleFillBoxMain.complete
                        : ""
                    }`}
                  >
                    {index >= weekUnit &&
                      !(index === 9 && levelInfo.eng !== "ruby") &&
                      `${index + 1 + Math.floor(weekUnit / 10) * 10}주차`}
                    {index === 9 && levelInfo.eng !== "ruby" && (
                      <img
                        src="../../images/retto/fillbox-stamp-coupon.png"
                        alt="10주차"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
            {!isFail && (weekUnit === 8 || weekUnit === 9) && (
              <div className={styleFillBoxMain.balloon}>
                {levelInfo.eng === "ruby" ? (
                  <>
                    다이아 레벨로 변경해 <br />
                    10주 연속 성공 선물로 쿠폰 받으세요!
                  </>
                ) : (
                  <>
                    {weekUnit === 8 ? "3주만" : "이번주만"} 더 성공하면 쿠폰
                    받아요.
                  </>
                )}
              </div>
            )}
          </div>
        </FadeInSection>
        <FadeInSection delay={200}>
          <div
            className={`${styleFillBoxMain.moneyBox} ${
              moneyEmpty ? styleFillBoxMain.empty : ""
            }`}
          >
            <div className={styleFillBoxMain.leftCon}>
              {moneyEmpty ? (
                <>
                  <p className={styleFillBoxMain.text1}>머니함이 비었어요.</p>
                  <p className={styleFillBoxMain.text2}>
                    {failSoon ? (
                      <>월요일이 되기 전까지 다시 채워주세요.</> // 이번주 실패 확정
                    ) : (
                      <>오늘밤 11시까지 다시 채워주세요.</> // 오늘 실패 예정
                    )}
                  </p>
                </>
              ) : (
                <p className={styleFillBoxMain.text1}>머니함</p>
              )}
            </div>
            {moneyEmpty ? (
              <button type="button" className={styleFillBoxMain.fillBtn}>
                채우기
              </button>
            ) : (
              <a href="#" className={styleFillBoxMain.myMoney}>
                1,000,000원
              </a>
            )}
          </div>
        </FadeInSection>
      </div>

      <div
        className={styleFillBoxMain.rettoLevelChangeConBox}
        onClick={handleTooltipToggle}
      >
        <div className={styleFillBoxMain.textWrap}>
          <p>레벨 변경하기</p>
          <div className={styleFillBoxMain.tooltipWrap}></div>
        </div>
        <button type="button" className={styleFillBoxMain.moveBtn}></button>
        {isTooltip && (
          <div className={styleFillBoxMain.tooltipBox}>
            <div>
              2.11(수)부터 레벨 변경 가능 <br />
              레벨 변경 후 10일동안 다른 레벨로 <br />
              변경할 수 없어요.
            </div>
          </div>
        )}
      </div>
      <div className={styleFillBoxMain.botConBox}>
        <div className={`${styleFillBoxMain.grayBox} ${styleFillBoxMain.box1}`}>
          <div className={styleFillBoxMain.textWrap}>
            <p className={styleFillBoxMain.titleText}>
              10주 연속 성공 축하 쿠폰
            </p>
            <p className={styleFillBoxMain.subText}>
              확인 가능 <em>2개</em>
            </p>
          </div>
          <a href="#" className={styleFillBoxMain.moveBtn}></a>
        </div>
      </div>
    </div>
  );
};

export default FillBoxMain;
