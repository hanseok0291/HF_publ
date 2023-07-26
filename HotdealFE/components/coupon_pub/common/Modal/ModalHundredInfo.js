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
      blocking={false}
      sibling={
        <div className={styleModal.bottomSheetDim}  onClick={closeHundredPopup}></div>
      }
      
      className={styleModal.bottomSheet}
      style={{position: 'relative', zIndex: 1000}}
      header={
        <>
          <div className={`${styleModal.modalHeader}`}>
            <button type="button" className={styleModal.slideCloseBtn} onClick={closeHundredPopup}></button>
          </div>
        </>
      }
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
          <dt>응모 수단</dt>
          <dd>
            <b>포인트 100원</b> 또는 <b>응모권</b> <br />
            <span>* 보유 응모권은 새 딜 오픈 시 자동 소멸</span>
          </dd>
          <dt>응모권 종류</dt>
          <dd>
            <p>
              <b>친구에게 선물 받은 응모권</b> <br />
              상품별 첫 응모, 추가 응모 사용 가능 
            </p>
            <p>
              <b>미션 응모권<em>당첨 확률 UP</em></b> <br />
              추가 응모 사용 가능
            </p>
          </dd>
        </dl>
      </div>
    </BottomSheet>
  )
};

export default ModalHundredInfo;
