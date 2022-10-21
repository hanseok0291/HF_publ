import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/common/DefaultModal.module.css";
import styleBarcode from "../../../../styles/coupon_pub/Barcode.module.css";

const ModalBarcode = ({ show, onClose }) => {
  return (
    <>
      {/* 최근 보낸목록 있음 */}
      <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleBarcode.modalCommon}`}
      >
        <div className={`${styleModal.modalDialog}`}>
          <div className={`${styleModal.modalContent}`}>
            <div
              className={`${styleModal.modalHeader} ${styleBarcode.modalHeader}`}
            >
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleBarcode.modalClose}`}
              >
                닫기
              </button>
            </div>
            <div
              className={`${styleModal.modalBody} ${styleBarcode.modalBody}`}
            >
              {/* 최근 보낸목록 있음 */}
              <div className={`${styleBarcode.modalList}`}>
                <div className={`${styleBarcode.modalItem}`}>
                  <p className={`${styleBarcode.barcodeWrap}`}>
                    <img
                      src="../../../images/coupon/icon/common/barcode.png"
                      alt="바코드"
                    />
                  </p>
                  <p className={`${styleBarcode.btnWrap}`}>
                    <span>0123 456 789</span>
                    <button
                      type="button"
                      className={`${styleBarcode.btn} ${styleCommon.btn}`}
                    >
                      복사
                    </button>
                  </p>
                </div>
              </div>
              {/* //최근 보낸목록 있음 */}
            </div>
          </div>
        </div>
      </div>
      {/* 최근 보낸목록 있음 */}
    </>
  );
};

export default ModalBarcode;
