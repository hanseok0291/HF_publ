import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleApply from "../../../../styles/coupon_pub/Apply.module.css";

const ModalEnterType3 = ({ show, onClose }) => {
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
                <strong>기프티몰이 처음</strong>이시라면
                <br />
                최초 1회 약관 동의가 필요해요
                <p className={`${styleModal.modalTitleSub}`}>
                  동의하시면 핫딜까지 만나볼 수 있어요
                  <i className={`${styleCommon.italic}`}>!</i>
                </p>
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
              <div className={`${styleApply.agreeAll}`}>
                <span
                  className={`${styleApply.checkbox} ${styleApply.parents}`}
                >
                  <input type="checkbox" name="agreeAll" id="agreeAll_01" />
                  <label htmlFor="agreeAll_01">전체 동의</label>
                </span>
              </div>
              <div className={`${styleApply.agreeAll}`}>
                <span
                  className={`${styleApply.checkbox} ${styleApply.parents}`}
                >
                  <input type="checkbox" name="agreeAll" id="agreeAll_02" />
                  <label htmlFor="agreeAll_02">서비스 이용 약관</label>
                </span>
              </div>
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
                <li>
                  <span
                    className={`${styleApply.checkbox} ${styleApply.child}`}
                  >
                    <input type="checkbox" name="agree_01" id="agree_02_02" />
                    <label htmlFor="agree_02_02">
                      (필수) 개인정보 수집 이용 동의
                    </label>

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
                <li>
                  <span
                    className={`${styleApply.checkbox} ${styleApply.child}`}
                  >
                    <input type="checkbox" name="agree_01" id="agree_02_03" />
                    <label htmlFor="agree_02_03">(선택) 마케팅 정보 수신</label>

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

              <div className={`${styleApply.agreeAll}`}>
                <span
                  className={`${styleApply.checkbox} ${styleApply.parents}`}
                >
                  <input type="checkbox" name="agreeAll" id="agreeAll_03" />
                  <label htmlFor="agreeAll_03">본인 확인 이용 약관</label>
                </span>
              </div>
              <ul className={`${styleApply.agreeList}`}>
                <li>
                  <span
                    className={`${styleApply.checkbox} ${styleApply.child}`}
                  >
                    <input type="checkbox" name="agree_01" id="agree_03_01" />
                    <label htmlFor="agree_03_01">(필수) 핫딜 서비스 이용약관</label>

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
                <li>
                  <span
                    className={`${styleApply.checkbox} ${styleApply.child}`}
                  >
                    <input type="checkbox" name="agree_01" id="agree_03_02" />
                    <label htmlFor="agree_03_02">
                      (필수) 개인정보 수집·이용 동의
                    </label>

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
              기프티몰 이용하기
            </button>
            {/* //비활성 버튼 */}
            {/* 활성 버튼 */}
            {/* <button
              type="button"
              className={`${styleCommon.btn} ${styleModal.btn} ${styleModal.modalClose}`}
            >
              기프티몰 이용하기
            </button> */}
            {/* //활성 버튼 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEnterType3;
