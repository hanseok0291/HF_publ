import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleApply from "../../../../styles/coupon_pub/Apply.module.css";

const ModalEnterType4 = ({ show, onClose }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.modalTerms} ${styleModal.modalType2} ${styleModal.open}`}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog}`}
        style={{ bottom: "0" }}
      >
        <div className={`${styleModal.modalContent}`}>
          <div className={`${styleModal.modalHeader}`}>
            <p className={`${styleModal.modalTitle}`}>
              <div>
                <strong>개인정보 수집·이용 동의가 필요해요.</strong>
                <br />
                약관 동의 후에 결제하시겠어요?
              </div>
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
              >
                닫기
              </button>
            </p>
          </div>
          <div className={`${styleModal.modalBody}`}>
            <div
              className={`${styleApply.termsAgree} ${styleModal.termsAgree}`}
            >
              <ul className={`${styleApply.agreeList}`}>
                <li>
                  <span
                    className={`${styleApply.checkbox} ${styleApply.child}`}
                  >
                    <input type="checkbox" name="agree_01" id="agree_02_01" />
                    <label htmlFor="agree_02_01">(필수) 기프티몰 이용약관</label>

                    <button
                      type="button"
                      className={`${styleCommon.btnIcon} ${styleApply.agreeBtn}`}
                    >
                      보기{" "}
                      <i
                        className={`${styleApply.icon} ${styleApply.iconArrowRight}`}
                      ></i>
                    </button>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styleModal.modalFooter}`}>
            {/* 비활성 버튼 */}
            <button
              type="button"
              className={`${styleCommon.btn} ${styleCommon.btnGray} ${styleModal.btn} ${styleModal.modalClose}`}
            >
              동의하고 결제하기
            </button>
            {/* //비활성 버튼 */}
            {/* 활성 버튼 */}
            {/* <button
              type="button"
              className={`${styleCommon.btn} ${styleModal.btn} ${styleModal.modalClose}`}
            >
              동의하고 결제하기
            </button> */}
            {/* //활성 버튼 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEnterType4;
