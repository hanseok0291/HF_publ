import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleApply from "../../../../styles/coupon_pub/Apply.module.css";
import stylePay from "../../../../styles/coupon_pub/Pay.module.css";

const ModalHundredGiftEntry = ({ show, onClose }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.open} ${styleModal.giftEntry}`}
      // style={{ display: "none" }}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog}`}
        style={{ bottom: "0" }}
      >
        <div
          className={`${styleModal.modalContent} ${styleModal.modalSelectAccount}`}
        >
          <div className={`${styleModal.modalHeader}`}>
            <h3 className={`${styleModal.modalTitle}`}>
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
              >
                닫기
              </button>
            </h3>
          </div>
          <div
            className={`${styleModal.modalBody} ${styleModal.load} ${stylePay.load}`}
          >
           <h4>선물 가능 응모권 도착</h4>
           <p>지금만 선물할 수 있어요. <br /> 선물 받은 친구는 1회 무료 응모<i>!</i></p>
           <div className={styleModal.formWrap}>
              <div className={styleModal.textWrap}>
                <span>받는 사람</span>
                <button type="button">연락처 검색</button>
              </div>
              <div className={styleModal.inputWrap}>
                <input type="text" className={styleModal.name} placeholder="이름"/>
                <input type="text" className={styleModal.phone} placeholder="휴대폰 번호"/>
                <div className={styleModal.HundredToastError}>
                  <span>휴대폰 번호를 확인해주세요<i>!</i></span>
                  {/* <span>010PAY 회원이 아니에요<i>!</i></span> */}
                </div>
              </div>
           </div>
           <button type="button" className={styleModal.defaultBtn}>응모권 선물하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalHundredGiftEntry;
