import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import AddEntry from "../../100deal/AddEntry";

const ModalSlide = ({ isOpen,togglePopup }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.hundredDeal} ${isOpen && styleModal.open}`}
      // style={{ display: "none" }}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideModal}`}
        style={{ bottom: "0" }}
      >
        <div
          className={`${styleModal.modalContent} ${styleModal.modalSelectAccount}`}
        >
          <div className={`${styleModal.modalHeader}`}>
            <button type="button" className={styleModal.slideCloseBtn} onClick={togglePopup}></button>
          </div>
          <div className={`${styleModal.modalBody}`}>
            <div className={styleModal.titleText}>
              <p className={styleModal.topText}>보유 응모권 4</p>
              <p className={styleModal.botText}>몇 회 추가 응모할까요?</p>
            </div>
            <div>
              <AddEntry src="../../images/100deal/sample/img-01.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ModalSlide;
