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
      <Header title="채우기 상자" isborder sideBtn="비우기"/>
      <Container className={styleCommon.layerContainer} backgroundColor="#fff" padding="0">
        <div className={styleFillBox.topConWrap}>
          <div className={`${styleCommon.borderBox} ${styleApply.borderBox}`}>
            <div className={`${styleCommon.levelWrap} ${styleFillBox.borderInner} ${case1 ? 'stone' : 'emerald'} ${case2 ? 'overlay' : ''}`}>{/* ruby emerald diamond stone(실패) className 추가 시 보석 변경 overlay className 추가 시 실패 위기  */}
              <div className="jewelImg"></div>
              <p className={`${styleCommon.levelText}`}>Lv. 2&nbsp;<span className="jewelColor">에메랄드</span><button type='button'></button></p>
              <p className={styleCommon.subText}>
                <b>1주일 동안</b> 잘 보관하면 <br />
                매주 월요일 리또를 받아요!
              </p>
              {/* 실패 */}
              {/* <p className={styleCommon.subText}>
                이번 기회는 아쉽게 놓쳤어요! <br />
                <b>50만원을 다시 채워주세요.</b>
              </p> */}
            </div>
            <div className={styleFillBox.priceWrap}><b>500,000</b>원</div>
            <Button>머니 채우기</Button>
          </div>
          <div className={styleFillBox.bannerWrap}>
            <div className={`${styleFillBox.bannerBox} ${styleFillBox.ruby}`}>{/* styleFillBox.ruby styleFillBox.emerald styleFillBox.diamond className 추가 */}
              <a href="#">
                <p className={styleFillBox.text1}>변경 신청한 <span className={styleFillBox.colorText}>루비</span>는 채우기 <b>10만원<i>!</i></b></p>
                <p className={styleFillBox.text2}>레벨 변경</p>
              </a>
            </div>
          </div>
        </div>
        <div className={styleFillBox.noteWrap}>
          <p>안내사항</p>
          <ul>
            <li>리또를 받기 위해 채운 머니는 <b>채우기 상자로 별도 보관</b>됩니다.</li>
            <li>상자 속 금액은 사용 가능 금액에서 제외되어 <b>결제 시 사용할 수 없습니다.</b> <br />(010PAY 기프티몰, 내통장결제 및 카드 결제 등)</li>
            <li>리또 레벨별 채우기 금액만큼만 상자에 넣어둘 수 있습니다.</li>
            <li>상자 비우기 선택 시 상자 속 금액은 보유 금액으로 자동 전환됩니다.</li>
            <li>상자 속 금액을 포함한 보유 머니가 200만원을 초과하는 경우,<br />여유 공간을 확보하기 전까지 상자를 비울 수 없습니다.</li>
            <li>상자가 비어있다면 다시 채우기 전까지 리또를 받을 수 없습니다.</li>
          </ul>
        </div>
      </Container>
  </div>
  )
}

export default FillBox;
