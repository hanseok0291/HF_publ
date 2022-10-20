import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/coupon_pub/Filter.module.css";

const ModalFilter = ({ show, onClose }) => {
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
            <h3
              className={`${styleModal.modalTitle} ${styleFilter.modalTitle}`}
            >
              정렬 필터
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
              >
                닫기
              </button>
            </h3>
          </div>
          <div className={`${styleModal.modalBody} ${styleFilter.modalBody}`}>
            <div className={`${styleFilter.filterWrap}`}>
              <p className={`${styleFilter.btn} ${styleFilter.active}`}>
                <button type="button">인기순</button>
              </p>
              <p className={`${styleFilter.btn}`}>
                <button type="button">할인율순</button>
              </p>
              <p className={`${styleFilter.btn}`}>
                <button type="button">낮은 가격순</button>
              </p>
              <p className={`${styleFilter.btn}`}>
                <button type="button">높은 가격순</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
