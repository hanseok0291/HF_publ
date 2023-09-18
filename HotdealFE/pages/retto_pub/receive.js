import React from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleReceive from "../../styles/retto_pub/Receive.module.css";

// component
import Header from "../../components/retto_pub/common/Header";
import Button from "../../components/retto_pub/common/Button";
import LayerRettoInfo from "../../components/retto_pub/LayerRettoInfo";
import BottomSheetNeedAccount from "../../components/retto_pub/common/modal/BottomSheetNeedAccount";
import LayerRettoMoneyGet from "../../components/retto_pub/LayerRettoMoneyGet";

const index = () => {
  return (
    <>
      <Header title="내 당첨금 찾기"  sideBtn="" />
      <Container padding="30px 20px 128px">
        <div className={`${styleCommon.titleWrap}`}>
          <h2><b>이제 당첨금을 찾아 볼까요?</b></h2>
          <p className={styleReceive.subTitle}>
            내 당첨 내역이 맞는지 확인해 보세요!
          </p>
        </div>
        <div className={`${styleReceive.borderBox} ${styleReceive.topCon}`}>
          <div className={styleReceive.lineBox}>
            <span className={styleReceive.turnText}>1071회차</span>
            <dl>
              <dt>2등</dt>
              <dd><span>머니</span>40,000원</dd>
            </dl>
            <dl>
              <dt>보너스미션</dt>
              <dd><span>포인트</span>5,000원</dd>
            </dl>
          </div>
          <div  className={styleReceive.lineBox}>
            <span className={styleReceive.turnText}>1071회차</span>
            <dl>
              <dt>보너스미션</dt>
              <dd><span>포인트</span>1,000원</dd>
            </dl>
            <dl>
              <dt>보너스미션</dt>
              <dd><span>포인트</span>5,000원</dd>
            </dl>
          </div>
          <div  className={styleReceive.lineBox}>
            <span className={styleReceive.turnText}>1070회차</span>
            <dl>
              <dt>1등<span className={styleReceive.icon1}></span></dt>
              <dd><span>머니</span>100,000,000원</dd>
            </dl>
          </div>
          <div  className={styleReceive.lineBox}>
            <span className={styleReceive.turnText}>1069회차</span>
            <dl>
              <dt>보너스미션</dt>
              <dd><span>포인트</span>1,000원</dd>
            </dl>
            <dl>
              <dt>보너스미션</dt>
              <dd><span>포인트</span>5,000원</dd>
            </dl>
          </div>
        </div>
        <div className={styleReceive.borderBox}>
          <span className={styleReceive.divider}></span>
          <dl className={styleReceive.large}>
            <dt>예상 실수령액</dt>
            <dd>78,051,000원</dd>
          </dl>
          <dl>
            <dt className={styleReceive.addicon}>당첨금</dt>
            <dd>100,051,000원</dd>
          </dl>
          <dl>
            <dt className={styleReceive.addicon}>제세공과금<span className={styleReceive.icon1}></span></dt>
            <dd className={styleReceive.off}>-22,000,000원</dd>
          </dl>
        </div>
        <div className={styleReceive.btnWrap}>
          <Button>찾으러 가기</Button>
        </div>
      </Container>
      {/* 내 당첨금 찾기 바텀 시트 */}
      {/* <BottomSheetNeedAccount /> */}
      {/* 신청 완료 레이어 */}
      {/* <LayerRettoMoneyGet /> */}
    </>
  );
};

export default index;
