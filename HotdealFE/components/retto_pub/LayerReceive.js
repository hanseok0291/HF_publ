import React, { useState } from "react";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleReceive from "../../styles/retto_pub/Receive.module.css";
import styleApply from "../../styles/coupon_pub/Apply.module.css";
import styleModal from "../../styles/coupon_pub/Modal.module.css";

// component
import Container from "./common/Container";
import Header from "./common/Header";
import Button from "./common/Button";
import BottomSheetAccount from "./common/modal/BottomSheetAccount";

const LayerReceive = () => {

  return (
    <div className={styleCommon.layer}>
      <Header title="내 당첨금 찾기" sideBtn=""/>
      <Container className={styleCommon.layerContainer}>
        <div className={`${styleReceive.needAccount}`}>
          <h2>입금 계좌가 필요해요</h2>
          <p className={styleReceive.subTitle}>
            <b>5만원 초과하는 당첨금</b> 또는 <br />
            <b>머니 보유 한도(200만원) 초과</b> 시 <span>계좌로 입금</span>돼요.
          </p>
          
          <dl className={styleReceive.bankWrap}>
            <dt>입금 계좌</dt>
            <dd><button type="button"><img src="../../images/coupon/logo/brand/bank1.png" alt="" />카카오뱅크789</button></dd>
            {/* <dd><button type="button" className={styleReceive.enter}>계좌 등록</button></dd> */}
          </dl>
        </div>
        <div className={styleReceive.noticeWrap}>
          <h4>꼭 확인해 주세요!</h4>
          <ul>
            <li>5만원 초과 당첨금이 있어 <b>신분증 사본 제출이 꼭 필요해요!</b> <br />(미성년자의 경우 법정대리인의 신분증 사본, 가족관계 증명서와 당첨금 수령 동의 제출 필수) <br /><b>당첨일로부터 91일 내 미제출 시 당첨이 취소돼요.</b></li>
            <li>
              수령 신청 완료 전 <b>개인 정보 수집 관련 약관 동의가 꼭 필요해요!</b> <br />
              신분증 사본은 제세공과금 처리를 위해서만 사용되니 안심하세요.
            </li>
            <li>제출하실 주소는 수령 신청이 완료되면 안내해 드릴게요.</li>
          </ul>
        </div>
        <div className={styleReceive.btnWrap}>
          <ul className={`${styleReceive.agreeList}`}>
            <li>
              <input type="checkbox" name="agree_01" id="agree_03_01" />
              <label htmlFor="agree_03_01">개인 정보 수집 이용 동의(필수)</label>
              <button type="button"></button>
            </li>
            <li>
              <input type="checkbox" name="agree_02" id="agree_03_02" />
              <label htmlFor="agree_03_02">고유 식별 정보 수집 및 이용 동의(필수)</label>
              <button type="button"></button>
            </li>
          </ul>
          <Button>모두 동의 후 신청 마치기</Button>
        </div>
      </Container>
      {/* <BottomSheetAccount title="입금 계좌 선택" /> */}
  </div>
  )
}

export default LayerReceive;
