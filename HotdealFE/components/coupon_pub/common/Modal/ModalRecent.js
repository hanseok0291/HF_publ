import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/common/DefaultModal.module.css";
import styleRecent from "../../../../styles/coupon_pub/Recent.module.css";

const ModalAlert = ({ show, onClose }) => {
  return (
    <>
      {/* 최근 보낸목록 있음 */}
      <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRecent.modalCommon}`}
      >
        <div className={`${styleModal.modalDialog}`}>
          <div className={`${styleModal.modalContent}`}>
            <div
              className={`${styleModal.modalHeader} ${styleRecent.modalHeader}`}
            >
              <h3
                className={`${styleModal.modalTitle} ${styleFilter.modalTitle} ${styleRecent.modalTitle}`}
              >
                <span className={`${styleCommon.highlight}`}>최근 선물</span>을
                보냈어요<i className={`${styleCommon.italic}`}>!</i>
                <button
                  type="button"
                  className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleRecent.modalClose}`}
                >
                  닫기
                </button>
              </h3>
            </div>
            <div className={`${styleModal.modalBody} ${styleRecent.modalBody}`}>
              {/* 최근 보낸목록 있음 */}
              <div className={`${styleRecent.modalList}`}>
                <div className={`${styleRecent.modalItem}`}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                  <button
                    type="button"
                    className={`${styleRecent.btn} ${styleCommon.btn}`}
                  >
                    선택
                  </button>
                </div>
                <div className={`${styleRecent.modalItem}`}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                  <button
                    type="button"
                    className={`${styleRecent.btn} ${styleCommon.btn}`}
                  >
                    선택
                  </button>
                </div>
                <div className={`${styleRecent.modalItem}`}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                  <button
                    type="button"
                    className={`${styleRecent.btn} ${styleCommon.btn}`}
                  >
                    선택
                  </button>
                </div>
                <div className={`${styleRecent.modalItem}`}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                  <button
                    type="button"
                    className={`${styleRecent.btn} ${styleCommon.btn}`}
                  >
                    선택
                  </button>
                </div>
                <div className={`${styleRecent.modalItem}`}>
                  <span className={`${styleRecent.name}`}>김세틀</span>
                  <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                  <button
                    type="button"
                    className={`${styleRecent.btn} ${styleCommon.btn}`}
                  >
                    선택
                  </button>
                </div>
              </div>
              {/* //최근 보낸목록 있음 */}
              {/* 최근 보낸목록 없음 */}
              {/* <div className={`${styleRecent.modalList} ${styleRecent.empty}`}>
                <p>최근 선물한 친구가 없네요</p>
              </div> */}
              {/* //최근 보낸목록 없음 */}
            </div>
          </div>
        </div>
      </div>
      {/* 최근 보낸목록 있음 */}
      {/* 최근 보낸목록 없음 */}
      <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRecent.modalCommon}`}
        style={{ display: "none" }}
      >
        <div className={`${styleModal.modalDialog}`}>
          <div className={`${styleModal.modalContent}`}>
            <div
              className={`${styleModal.modalHeader} ${styleRecent.modalHeader}`}
            >
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleRecent.modalClose}`}
              >
                닫기
              </button>
            </div>
            <div className={`${styleModal.modalBody} ${styleRecent.modalBody}`}>
              {/* 최근 보낸목록 있음 */}
              {/* <div className={`${styleRecent.modalList}`}>
              <div className={`${styleRecent.modalItem}`}>
                <span className={`${styleRecent.name}`}>김세틀</span>
                <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                <button
                  type="button"
                  className={`${styleRecent.btn} ${styleCommon.btn}`}
                >
                  선택
                </button>
              </div>
              <div className={`${styleRecent.modalItem}`}>
                <span className={`${styleRecent.name}`}>김세틀</span>
                <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                <button
                  type="button"
                  className={`${styleRecent.btn} ${styleCommon.btn}`}
                >
                  선택
                </button>
              </div>
              <div className={`${styleRecent.modalItem}`}>
                <span className={`${styleRecent.name}`}>김세틀</span>
                <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                <button
                  type="button"
                  className={`${styleRecent.btn} ${styleCommon.btn}`}
                >
                  선택
                </button>
              </div>
              <div className={`${styleRecent.modalItem}`}>
                <span className={`${styleRecent.name}`}>김세틀</span>
                <span className={`${styleRecent.tel}`}>010-1234-5678</span>
                <button
                  type="button"
                  className={`${styleRecent.btn} ${styleCommon.btn}`}
                >
                  선택
                </button>
              </div>
            </div> */}
              {/* //최근 보낸목록 있음 */}
              {/* 최근 보낸목록 없음 */}
              <div className={`${styleRecent.modalList} ${styleRecent.empty}`}>
                <p>최근 선물한 친구가 없네요</p>
              </div>
              {/* //최근 보낸목록 없음 */}
            </div>
          </div>
        </div>
      </div>
      {/* 최근 보낸목록 없음 */}
    </>
  );
};

export default ModalAlert;
