import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/coupon_pub/Filter.module.css";

const ModalHundredWinner = ({ show, onClose }) => {
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
              className={`${styleModal.modalTitle} ${styleModal.modalTitleLine} ${styleFilter.modalTitle}`}
            >
              당첨자 <span className={styleFilter.redText}>30명</span>
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
              >
                닫기
              </button>
            </h3>
          </div>
          <div
            className={`${styleModal.modalBody} ${styleFilter.modalBody} ${styleFilter.modalBodyScroll} ${styleFilter.winnerBody}`}
          >
            <ul className={styleFilter.winnerList}>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalHundredWinner;
