import { useState } from "react";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import AddEntry from "../../100deal/AddEntry";
import AddEntryComplete from "../../100deal/AddEntryComplete";

const ModalEntryComplete = ({ isEntryOpen, closeEntryPopup }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.hundredDeal} ${isEntryOpen && styleModal.open}`} onClick={closeEntryPopup}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideModal}`} onClick={handleContentClick}
      >
        <div
          className={`${styleModal.modalContent} ${styleModal.modalSelectAccount}`}
        >
          <div className={`${styleModal.modalHeader}`}>
            <button type="button" className={styleModal.slideCloseBtn} onClick={closeEntryPopup}></button>
          </div>
          <div className={`${styleModal.modalBody}`}>
            <div className={styleModal.titleText}>
              <p className={styleModal.topText}>추가 응모 완료</p>
              <p className={styleModal.botText}>획득한 응모권이 <br /> <b>자동으로 사용됐어요<i>!</i></b></p>
            </div>
            <div className={styleModal.addEntryWrap}>
              <AddEntryComplete defaultCount={4} src="../../../images/100deal/sample/img-01.png" alt="메가박스 2인 관람권 팝콘 세트" isCounter={false} />
              <button type="button" className={styleModal.defaultBtn}>확인</button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ModalEntryComplete;
