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
              계좌 설정
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
            <div
              className={`${stylePay.loadBtnBox} ${styleModal.loadBtnBox} ${styleModal.select}`}
            >
              <button
                type="button"
                className={`${stylePay.btnOption} ${styleModal.btnOption}`}
              >
                <img
                  src="../../../images/coupon/logo/brand/bank1.png"
                  alt="우리은행"
                ></img>
                우리 123
                <span className={`${stylePay.label}`}>대표 계좌</span>
              </button>
            </div>
            <div className={`${stylePay.loadBtnBox} ${styleModal.loadBtnBox}`}>
              <button
                type="button"
                className={`${stylePay.btnOption} ${styleModal.btnOption}`}
              >
                <img
                  src="../../../images/coupon/logo/brand/bank1.png"
                  alt="우리은행"
                ></img>
                우리 123
              </button>
            </div>
            <div className={`${stylePay.loadBtnBox} ${styleModal.loadBtnBox}`}>
              <button
                type="button"
                className={`${stylePay.btnOption} ${styleModal.btnOption}`}
              >
                <img
                  src="../../../images/coupon/logo/brand/bank1.png"
                  alt="우리은행"
                ></img>
                우리 123
              </button>
            </div>
            <div className={`${stylePay.loadBtnBox} ${styleModal.loadBtnBox}`}>
              <button
                type="button"
                className={`${stylePay.btn} ${stylePay.btnAdd}`}
              >
                <i
                  className={`${styleCommon.icon} ${styleCommon.iconBtnAdd}`}
                ></i>
                계좌 추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectOption;
