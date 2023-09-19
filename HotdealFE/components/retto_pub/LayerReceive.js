import React, { useState } from "react";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleReceive from "../../styles/retto_pub/Receive.module.css";

// component
import Container from "./common/Container";
import Header from "./common/Header";
import Button from "./common/Button";
import BottomSheetAccount from "./common/modal/BottomSheetAccount";

const LayerReceive = () => {

  return (
    <div className={styleCommon.layer}>
      <Header title="내 당첨금 찾기" sideBtn=""/>
      <Container>
        <div className={`${styleReceive.needAccount}`}>
          <h2>입금 계좌가 필요해요</h2>
          <p className={styleReceive.subTitle}>
            <b>머니 보유 한도(200만원) 초과</b> 시 <span>계좌로 입금</span>돼요.
          </p>
          
          <dl className={styleReceive.bankWrap}>
            <dt>입금 계좌</dt>
            {/* <dd><button type="button"><img src="../../images/coupon/logo/brand/bank1.png" alt="" />카카오뱅크789</button></dd> */}
            <dd><button type="button" className={styleReceive.enter}>계좌 등록</button></dd>
          </dl>
        </div>
        <div className={styleReceive.noticeWrap}>
          <h4>꼭 확인해 주세요!</h4>
          <ul>
            <li>5만원 초과 당첨금이 있어 <b>신분증 사본 제출이 꼭 필요해요!</b> <br /> 제출할 주소는 수령 신청이 완료되면 안내해 드릴게요.</li>
            <li>제출 기한은 당첨일로부터 91이며, <b>미제출 시 당첨이 취소</b>돼요.</li>
            <li>신분증 사본은 제세공과금 처리를 위해서만 사용돼요.</li>
          </ul>
          <div className={styleReceive.btnWrap}>
            <Button>수령 신청 완료</Button>
          </div>
        </div>
      </Container>
      {/* <BottomSheetAccount title="입금 계좌 선택" /> */}
  </div>
  )
}

export default LayerReceive;
