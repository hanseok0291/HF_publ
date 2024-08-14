import React, { useEffect, useState } from "react";

// style
import styleFillBoxMain from "../../styles/retto_pub/FillBoxMain.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";

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

const FillBoxMain = () => {
  const [stampArr, setStampArr] = useState(Array(10).fill(undefined)); // 스탬프 정보
  const [stampCnt, setStampCnt] = useState(0); // 스탬프 개수
  const [isFail, setIsFail] = useState(null); // 실패 상태 확인
  const [weekUnit, setWeekUnit] = useState(null); // 주차 1의 자리
  const notiOn = true; // 알림 설정
  const moneyEmpty = true; // 머니함 상태 true 비어있음 false 채워져 있음
  const levelInfo = rettoJewelCase[2]; // 0 ruby 1 emelard 2 diamond

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

  const stampInfo = [
    {
      mcWeekId: "MC20240805",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240808103847",
      succDayCnt: 7,
      insufficientMoney: 0,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: null,
    },
    {
      mcWeekId: "MC20240812",
      mcEventSetPrice: 100000,
      weekOrder: 2,
      lottoCnt: 2,
      succYn: "Y",
      succYnDt: "20240809142158",
      succDayCnt: 7,
      insufficientMoney: 0,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: null,
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    },
    {
      mcWeekId: "MC20240722",
      mcEventSetPrice: 100000,
      weekOrder: 1,
      lottoCnt: 1,
      succYn: "Y",
      succYnDt: "20240726230000",
      succDayCnt: 5,
      insufficientMoney: 100000,
      stampImgPath: null,
      rewardPsblYn: "N",
      rewardYn: "N",
      rewardProductImgPath: null,
      rewardBrandNm: null,
      rewardProductNm: null,
      failType: "MOCH",
    }
  ];

  useEffect(() => {
    setStampCnt(stampInfo.length);
    replaceArray(stampInfo);
    setWeekUnit((stampCnt - Math.floor(stampCnt / 10) * 10));
    const hasFail = stampInfo.some((item) => item.succYn === "N");
    setIsFail(hasFail);
  }, []);

  useEffect(() => {
    setWeekUnit((stampCnt - Math.floor(stampCnt / 10) * 10));
  }, [stampInfo]);
  

  return (
    <div className={`${styleFillBoxMain.container}`}>
      <div className={styleFillBoxMain.boostupBanner}>
        <p className={styleFillBoxMain.bannerText}>
          리또 부스트 업 010PAY 활동 지수에 따라 리또가 최대 100개!
        </p>
      </div>
      <div className={`${styleFillBoxMain.stampConBox} ${levelInfo.eng}`}>
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
                    : `${index + 1 + (Math.floor(stampCnt / 10) * 10)}주차`}
                  <span className={styleFillBoxMain.rettoLength}>
                    <b>{stampCnt < 10 && index < 5 ? index + 1 : 5}</b>
                  </span>
                </li>
              );
            })}
          </ul>
          {!isFail && (weekUnit === 8 || weekUnit === 9) && (
            <div className={styleFillBoxMain.balloon}>
              {weekUnit === 8 ? "3주만" : weekUnit === 9 && "이번주만"} 더
              성공하면 쿠폰 받아요.
            </div>
          )}
        </div>
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
                  월요일이 되기 전까지 다시 채워주세요.
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
      </div>
      <div className={styleFillBoxMain.rettoLevelChangeConBox}>
        <p>리또 레벨 변경하기</p>
        <button type="button"></button>
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
              <p className={styleFillBoxMain.titleText}>100원딜 응모권 <button type="button" className={styleFillBoxMain.questionMark}></button></p>
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
