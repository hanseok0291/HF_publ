import { useState } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import 'react-spring-bottom-sheet/dist/style.css';

const ModalHundredInfo = ({ isHundredOpen, closeHundredPopup }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  

  return (
    <BottomSheet 
      open={isHundredOpen}
      onDismiss={closeHundredPopup}
      snapPoints={({ minHeight }) => minHeight}
      header={
        <div className={`${styleModal.modalHeader}`}>
          <button type="button" className={styleModal.slideCloseBtn} onClick={closeHundredPopup}></button>
        </div>
      }
      className={styleModal.bottomSheet}
      style={{position: 'relative', zIndex: 1000}}
    >
      <div className={`${styleModal.modalBody} ${styleModal.hundredDealInfo}`}>
        <h4 className={styleModal.titleText}>100원딜이란?</h4>
        <p className={styleModal.subText}>
          <b>매주 월·수·금</b> 기프티몰 인기 상품을 <br />
          <b>단돈 100원에 득템</b>할 수 있는 혜택이에요.
        </p>
        <dl>
          <dt>응모기간</dt>
          <dd>
          월 오전 9시 ~ 화 오후 9시<br />
          수 오전 9시 ~ 목 오후 9시<br />
          금 오전 9시 ~ 일 오후 9시
          </dd>
          <dt>당첨 발표</dt>
          <dd>
          응모 마감 다음 날 <b>오전 10시</b><br />
          <b>발표와 동시에 상품 지급</b> <br />
          <span>* 첫 응모 미당첨 포인트는 오전 11시 지급</span>
          </dd>
          <dt>응모 방법</dt>
          <dd>
            <b>포인트 100원 결제</b> 또는 <b>응모권 사용</b>
          </dd>
          <dt>응모권 종류</dt>
          <dd>
            <p>
              <b>친구에게 선물 받은 응모권</b> <br />
              상품별 첫 응모, 추가 응모 사용 가능 
            </p>
            <p>
              <b>미션 응모권</b> <br />
              추가 응모 사용 가능
            </p>
          </dd>
        </dl>
        <p className={styleModal.botText}>
          추가 응모로 응모 횟수가 늘어날수록 당첨 확률 UP<i>!</i> <br />
          다양한 미션에 참여해서 응모권을 모아보세요.
        </p>
      </div>
    </BottomSheet>
  )
};

export default ModalHundredInfo;
