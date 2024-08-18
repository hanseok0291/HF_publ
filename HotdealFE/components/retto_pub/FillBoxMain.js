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

const FillBoxMain = ({ stampInfo, rettoCase, money = false }) => {
  const [isTooltip, setIsTooltip] = useState(false);
  const [stampArr, setStampArr] = useState(Array(10).fill(undefined)); // 스탬프 정보
  const [stampCnt, setStampCnt] = useState(0); // 스탬프 개수
  const [isFail, setIsFail] = useState(null); // 실패 상태 확인
  const [weekUnit, setWeekUnit] = useState(null); // 주차 1의 자리
  const notiOn = true; // 알림 설정
  const failSoon = true;
  const moneyEmpty = money; // 머니함 상태 true 비어있음 false 채워져 있음
  const levelInfo = rettoJewelCase[rettoCase]; // 0 ruby 1 emelard 2 diamond

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, i + chunkSize);

      if (chunk.length < chunkSize) {
        chunk = [...chunk, ...Array(chunkSize - chunk.length).fill(undefined)];
      }

      result.push(chunk);
    }
    return result;
  };

  const replaceArray = (newValues) => {
    const fixedArray = chunkArray(newValues, 10);
    if (stampInfo.length > 10) {
      setStampArr(fixedArray[fixedArray.length - 1]);
    } else {
      const newArray = fixedArray[fixedArray.length - 1].map((_, index) =>
        newValues[index] !== undefined ? newValues[index] : undefined
      );
      setStampArr(newArray);
    }
  };

  const handleTooltipToggle = () => {
    setIsTooltip(!isTooltip);
  };

  useEffect(() => {
    setStampCnt(stampInfo.length);
    replaceArray(stampInfo);
    setWeekUnit(stampCnt - Math.floor(stampCnt / 10) * 10);
    const hasFail = stampInfo.some((item) => item.succYn === "N");
    setIsFail(hasFail);
  }, []);

  useEffect(() => {
    setWeekUnit(stampCnt - Math.floor(stampCnt / 10) * 10);
  }, [stampArr]);

  return (
    <div className={`${styleFillBoxMain.container}`}>
      <div className={styleFillBoxMain.boostupBanner}>
        <p className={styleFillBoxMain.bannerText}>
          리또 부스트 업 010PAY 활동 지수에 따라 리또가 최대 100개!
        </p>
      </div>
      <div className={`${styleFillBoxMain.stampConBox} ${levelInfo.eng}`}>
        <FadeInSection>
          {/* ruby emerald diamond */}
          <button type="button" className={styleFillBoxMain.weekBtn}>
            <em>{levelInfo.kor}</em> {stampCnt}주차
          </button>
          {notiOn ? (
            <p className={styleFillBoxMain.infoText}>
              {stampCnt < 5 ? (
                <>5주 이상 보관하면 매주 리또 5개!</>
              ) : (
                <>연속 성공으로 리또 5개씩 받고 있어요.</>
              )}
            </p>
          ) : (
            <p className={styleFillBoxMain.infoText}>
              <a href="#">알림 설정</a>하고 리또 받으세요.
            </p>
          )}
          <div className={styleFillBoxMain.stampContainer}>
            <ul className={styleFillBoxMain.stampWrap}>
              {stampArr.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`${
                      item?.succYn === "Y"
                        ? levelInfo.eng
                        : item?.failType
                        ? "fail"
                        : ""
                    } ${
                      item?.succYn === "Y" && stampCnt - 1 === index
                        ? "current"
                        : ""
                    } ${index === 9 ? styleFillBoxMain.complete : ""}`}
                  >
                    {item?.succYn === "Y" ||
                    item?.failType ||
                    (index === 9 && levelInfo.eng !== "ruby")
                      ? ""
                      : `${index + 1 + Math.floor(stampCnt / 10) * 10}주차`}
                    <span className={styleFillBoxMain.rettoLength}>
                      <b>{stampCnt < 10 && index < 5 ? index + 1 : 5}</b>
                    </span>
                  </li>
                );
              })}
            </ul>
            {(weekUnit === 8 || weekUnit === 9) && (
              <div className={styleFillBoxMain.balloon}>
                {!isFail && levelInfo.eng === "ruby" ? (
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
                  <p className={styleFillBoxMain.text1}>
                    리또 머니함이 비었어요.
                  </p>
                  <p className={styleFillBoxMain.text2}>
                    {failSoon ? (
                      <>월요일이 되기 전까지 다시 채워주세요.</> // 이번주 실패 확정
                    ) : (
                      <>오늘밤 11시까지 다시 채워주세요.</> // 오늘 실패 예정
                    )}
                  </p>
                </>
              ) : (
                <p className={styleFillBoxMain.text1}>리또 머니함</p>
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

      <div className={styleFillBoxMain.rettoLevelChangeConBox}>
        <div className={styleFillBoxMain.textWrap}>
          <p>리또 레벨 변경하기</p>
          <div className={styleFillBoxMain.tooltipWrap}>
            <button
              className={styleFillBoxMain.tooltipBtn}
              onClick={handleTooltipToggle}
            ></button>
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
        </div>
        <button type="button" className={styleFillBoxMain.moveBtn}></button>
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
        <div className={`${styleFillBoxMain.grayBox} ${styleFillBoxMain.box2}`}>
          <div className={styleFillBoxMain.innerBox}>
            <div className={styleFillBoxMain.textWrap}>
              <p className={styleFillBoxMain.titleText}>
                100원딜 응모권{" "}
                <button
                  type="button"
                  className={styleFillBoxMain.questionMark}
                ></button>
              </p>
              <p className={styleFillBoxMain.subText}>
                사용 가능 <em>12개</em>
              </p>
            </div>
            <a href="#" className={styleFillBoxMain.moveBtn}></a>
          </div>
          <div className={styleFillBoxMain.addInfo}>
            오늘 머니 보관하면 내일 응모권 3개
          </div>
        </div>
        <div className={`${styleMyretto.bottomBox} ${styleMyretto.type1}`}>
          <a href="#">
            <p>1만원 결제마다 리또 1개</p>
            <h4 className={styleMyretto.addArrowBlack}>
              010PAY 우리카드로 받기
            </h4>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FillBoxMain;
