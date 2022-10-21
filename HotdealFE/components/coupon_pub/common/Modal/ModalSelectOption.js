import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleApply from "../../../../styles/coupon_pub/Apply.module.css";
import stylePay from "../../../../styles/coupon_pub/Pay.module.css";

const ModalSelectOption = ({ show, onClose }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.open}`}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog}`}
        style={{ bottom: "0" }}
      >
        <div className={`${styleModal.modalContent}`}>
          <div className={`${styleModal.modalHeader}`}>
            <h3 className={`${styleModal.modalTitle}`}>약관 동의</h3>
            <button
              type="button"
              className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
            >
              닫기
            </button>
          </div>
          <div className={`${styleModal.modalBody}`}>
            <div className={`${stylePay.loadBtnBox}`}>
              {/* 계좌 없음 */}
              <button
                type="button"
                className={`${stylePay.btn} ${stylePay.btnAdd}`}
                style={{ display: "none" }}
              >
                <i
                  className={`${styleCommon.icon} ${styleCommon.iconBtnAdd}`}
                ></i>
                계좌 추가하기
              </button>
              {/* //계좌 없음 */}

              {/* 계좌 있음 */}
              <button
                type="button"
                className={`${styleCommon.btnSelect} ${stylePay.btnOption} ${stylePay.btnSelect}`}
                style={{ display: "none" }}
              >
                <img
                  src="../../../images/coupon/logo/brand/bank1.png"
                  alt="우리은행"
                ></img>
                우리 123
                <span className={`${stylePay.label}`}>대표 계좌</span>
              </button>
              {/* //계좌 있음 */}
            </div>
          </div>
          <div className={`${styleModal.modalFooter}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectOption;
