import { useState } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import 'react-spring-bottom-sheet/dist/style.css';
import AddEntry from "../../100deal/AddEntry";


const ModalEntry = ({ isEntryOpen, closeEntryPopup }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };
  return (
    <BottomSheet 
      open={isEntryOpen}
      onDismiss={closeEntryPopup}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight * 0.9]}
      blocking={false}
      sibling={
        <div className={styleModal.bottomSheetDim}  onClick={closeEntryPopup}></div>
      }
      className={styleModal.bottomSheet}
      style={{position: 'relative', zIndex: 997}}
      header={
        <div className={`${styleModal.modalHeader}`}>
          <button type="button" className={styleModal.slideCloseBtn} onClick={closeEntryPopup}></button>
        </div>
      }
    >
      <div className={`${styleModal.modalBody} ${styleModal.hundredDeal}`}>
        <div className={styleModal.titleText}>
          <p className={styleModal.topText}>보유 응모권 4</p>
          <p className={styleModal.botText}>몇 회 추가 응모할까요?</p>
        </div>
        <div className={styleModal.addEntryWrap}>
          <AddEntry defaultCount={4} src="../../images/100deal/sample/img-01.png" alt="메가박스 2인 관람권 팝콘 세트" />
          <AddEntry defaultCount={2} src="../../images/100deal/sample/img-01.png" alt="메가박스 2인 관람권 팝콘 세트" />
          <AddEntry defaultCount={0} src="../../images/100deal/sample/img-01.png" alt="메가박스 2인 관람권 팝콘 세트" disabled={true} />
          <button type="button" className={styleModal.defaultBtn}>추가 응모하기</button> 
        </div>
      </div>
    </BottomSheet>
  )
};

export default ModalEntry;
