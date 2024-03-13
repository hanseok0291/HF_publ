import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import 'react-spring-bottom-sheet/dist/style.css';
import AddEntry from "../../100deal/AddEntry";
import AddEntryComplete from "../../100deal/AddEntryComplete";

const ModalEntryComplete = ({ isCompletetOpen, closeCompletePopup }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };
  return (
    <BottomSheet
      open={true}
      onDismiss={closeCompletePopup}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight * 0.9]}
      blocking={false}
      sibling={
        <div className={styleModal.bottomSheetDim}  onClick={closeCompletePopup}></div>
      }
      className={styleModal.bottomSheet}
      style={{position: 'relative', zIndex: 1000}}
      header={
        <div className={`${styleModal.modalHeader}`}>
          <button type="button" className={styleModal.slideCloseBtn} onClick={closeCompletePopup}></button>
        </div>
      }
    >
      <div className={`${styleModal.modalBody} ${styleModal.hundredDeal}`}>
        <div className={styleModal.titleText}>
          <p className={styleModal.topText}>추가 응모 완료</p>
          <p className={styleModal.botText}>획득한 응모권이 <br /> <b>자동으로 사용됐어요<i>!</i></b></p>
        </div>
        <div className={styleModal.addEntryWrap}>
          <AddEntryComplete defaultCount={4} src="../../../images/100deal/sample/img-01.png" alt="메가박스 2인 관람권 팝콘 세트" isCounter={false} />
          <button type="button" className={styleModal.defaultBtn}>확인</button> 
        </div>
      </div>
    </BottomSheet>
  )
};

export default ModalEntryComplete;
