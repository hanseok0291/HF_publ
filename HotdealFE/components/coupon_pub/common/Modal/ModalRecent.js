import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/coupon_pub/Filter.module.css";
import styleRecent from "../../../../styles/coupon_pub/Recent.module.css";

// 최근 선물했던 친구 바텀 팝업
const ModalRecent = ({ show, onClose }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.open} ${styleRecent.modalCommon} ${styleRecent.recentFriends}`}
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
              최근 선물했던 친구
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
              >
                닫기
              </button>
            </h3>
          </div>
          <div
            className={`${styleModal.modalBody} ${styleRecent.modalBody}`}
          >
            <div className={`${styleRecent.modalList}`}>
              <div className={`${styleRecent.modalItem}`}>
                <div className={styleRecent.textWrap}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                </div>
                <button type="button" className={`${styleRecent.btn}`}>
                  선택
                </button>
              </div>
              <div className={`${styleRecent.modalItem}`}>
                <div className={styleRecent.textWrap}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                </div>
                <button type="button" className={`${styleRecent.btn}`}>
                  선택
                </button>
              </div>
              <div className={`${styleRecent.modalItem}`}>
                <div className={styleRecent.textWrap}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                </div>
                <button type="button" className={`${styleRecent.btn}`}>
                  선택
                </button>
              </div>
              <div className={`${styleRecent.modalItem}`}>
                <div className={styleRecent.textWrap}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                </div>
                <button type="button" className={`${styleRecent.btn}`}>
                  선택
                </button>
              </div>
              <div className={`${styleRecent.modalItem}`}>
                <div className={styleRecent.textWrap}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                </div>
                <button type="button" className={`${styleRecent.btn}`}>
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRecent;
