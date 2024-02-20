import React, { useState } from "react";
import FadeIn from 'react-fade-in';

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleApply from "../../styles/retto_pub/Apply.module.css";
import styleFillBox from "../../styles/retto_pub/FillBox.module.css";


// component
import Container from "../../components/retto_pub/common/Container";
import Header from "../../components/retto_pub/common/Header";
import ModalFillBox from "./common/modal/ModalFillBox";
import Button from "./common/Button";
import LayerFillFail from "./LayerFillFail";
import LayerEmptyFail from "./LayerEmptyFail";

const FillBox = ({case1, case2}) => {

  return (
    <div className={`${styleCommon.layer} ${styleFillBox.fillBoxWrap}`}>
      <Header title="리또 머니함" isborder sideBtn=""/>
      <Container className={styleCommon.layerContainer} backgroundColor="#fff" padding="0">
        <div className={styleFillBox.topConWrap}>
          <div className={`${styleCommon.borderBox} ${styleApply.borderBox}`}>
            <div className={`${styleCommon.levelWrap} ${styleFillBox.borderInner} ${case1 ? 'stone' : 'emerald'} ${case2 ? 'overlay' : ''}`}>{/* ruby emerald diamond stone(실패) className 추가 시 보석 변경 overlay className 추가 시 실패 위기  */}
              <div className="jewelImg"></div>
              <p className={`${styleCommon.levelText}`}>Lv. 2&nbsp;<span className="jewelColor">에메랄드</span><button type='button'></button></p>
              <p className={styleCommon.subText}>
                보관만 하면 <br />
                매주 월요일 <b>리또를 받아요!</b>
              </p>
              {/* 실패 */}
              {/* <p className={styleCommon.subText}>
                이번 기회는 아쉽게 놓쳤어요! <br />
                <b>50만원을 다시 채워주세요.</b>
              </p> */}
            </div>
            <div className={styleFillBox.priceWrap}>
              <b>500,000</b>원
              {/* 실패 위기(시간 지나지 않은 시점) */}
              <div className={styleFillBox.timerTextWrap}>
                <span className={styleFillBox.timerText}>7일 15시간 24분 41초 안에 머니를 채워주세요!</span>
              </div>
            </div>
            <Button>머니 채우기</Button>
          </div>

        </div>
        <div className={styleFillBox.noteWrap}>
          <p>안내사항</p>
          <ul>
            <li>리또를 받기 위해 채운 머니는 <b>리또 머니함에 별도 보관</b>됩니다.</li>
            <li>
              머니함 속 금액은 <b>보유 한도에 포함되나 사용 가능 금액에서 제외됩니다.</b><br />
              (010PAY 기프티몰, 내통장결제 및 카드 결제 등에서 사용 불가)
            </li>
            <li>
              <em>비우기</em> 선택 시 머니함 속 금액은 일반 머니로 자동 전환되며, <br />
              전환된 일반 머니는 언제든 결제 시 사용하거나 출금할 수 있습니다.
            </li>
            <li>
              머니함 속 금액을 포함한 보유 머니가 200만원을 초과하는 경우, <br />
              여유 공간을 확보하기 전까지 머니함을 비울 수 없습니다.
            </li>
            <li>머니함이 비어있다면 다시 채우기 전까지 리또를 받을 수 없습니다.</li>
          </ul>
        </div>
      </Container>
  </div>
  )
}

export default FillBox;
