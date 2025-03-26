import React, { useState } from "react";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleApply from "../../styles/retto_pub/Apply.module.css";
import styleFillBox from "../../styles/retto_pub/FillBox.module.css";

// component
import Container from "./common/Container";
import Header from "./common/Header";
import ModalFillBox from "./common/modal/ModalFillBox";
import Button from "./common/Button";
import LayerFillFail from "./LayerFillFail";
import LayerEmptyFail from "./LayerEmptyFail";
import HundredDealEntry from "./HundredDealEntry";

const FillBox = ({ case1, case2 }) => {
  const levelAmounts = {
    ruby: 10,
    emerald: 50,
    diamond: 100,
  };

  // 현재 선택된 레벨 (예제에서는 "emerald")
  const currentLevel = "emerald"; // 이 값을 props로 받아오거나 state에서 관리

  return (
    <div className={`${styleCommon.layer} ${styleFillBox.fillBoxWrap}`}>
      <Header title="발소 리워드 로또 머니함" isborder sideBtn="비우기" />
      <Container
        className={styleCommon.layerContainer}
        backgroundColor="#fff"
        padding="0"
      >
        <div className={styleFillBox.topConWrap}>
          <div className={`${styleCommon.borderBox} ${styleApply.borderBox}`}>
            <div
              className={`${styleCommon.levelWrap} ${
                styleFillBox.borderInner
              } ${case1 ? "stone" : "emerald"} ${case2 ? "overlay" : ""}`}
            >
              {/* ruby emerald diamond stone(실패) className 추가 시 보석 변경 overlay className 추가 시 실패 위기  */}
              <div className="jewelImg"></div>
              {/* <p className={`${styleCommon.subText} ${styleFillBox.subText}`}>
                보관만 하면 매주 월요일<br />
                <span><b>발소 리워드 로또를 받아요!</b></span>
              </p> */}
              {/* 실패 */}
              <p className={`${styleCommon.subText} ${styleFillBox.subText}`}>
                이번 기회는 아쉽게 놓쳤어요! <br />
                <span><b>{levelAmounts[currentLevel]}만원을 채우면 다음주<br />
                발소 리워드 로또를 받아요!</b></span>
              </p>
              {/* 실패 위기(시간 지나지 않은 시점) */}
              {/* <p className={`${styleCommon.subText} ${styleFillBox.subText}`}>
                다음주 발소 리워드 로또를 받으려면
                <br />
                <span>
                  <b>{levelAmounts[currentLevel]}만원이 채워져 있어야 해요.</b>
                </span>
              </p> */}
              {/* 마케팅 수신 동의(혜택 알림 포함) 전체 해제로 실패 확정 */}
              {/* <p className={`${styleCommon.subText} ${styleFillBox.subText}`}>
                이번 기회는 아쉽게 놓쳤어요! <br />
                <span><b>혜택 알림을 다시 켜주세요.</b></span>
              </p> */}
            </div>
            <div className={styleFillBox.priceWrap}>
              <b>0</b>원{/* 실패 위기(시간 지나지 않은 시점) */}
              {/* <div className={styleFillBox.timerTextWrap}>
                <span className={styleFillBox.timerText}>7일 15시간 24분 41초 안에 머니를 채워주세요!</span>
              </div> */}
            </div>
            {/* <Button>머니 채우기</Button> */}
            {/* 마케팅 수신 동의(혜택 알림 포함) 전체 해제로 실패 확정 */}
            {/* <Button>알림 켜기</Button> */}
          </div>
          {/* <HundredDealEntry /> */}
        </div>
        <div className={styleFillBox.noteWrap}>
          <p>안내사항</p>
          <ul>
            <li>
              발소 리워드 로또를 받기 위해 채운 머니는 <b>머니함에 별도 보관</b>
              됩니다.
            </li>
            <li>
              머니함 속 금액은{" "}
              <b>보유 한도에 포함되나 사용 가능 금액에서 제외됩니다.</b>
              <br />
              (010PAY 기프티몰, 내통장결제 및 카드 결제 등에서 사용 불가)
            </li>
            <li>
              비우기 선택 시 머니함 속 금액은 일반 머니로 자동 전환되며, <br />
              전환된 일반 머니는 언제든 결제 시 사용하거나 출금할 수 있습니다.
            </li>
            <li>
              머니함이 비어있다면 다시 채우기 전까지 발소 리워드 로또를 받을 수
              없습니다.
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default FillBox;
