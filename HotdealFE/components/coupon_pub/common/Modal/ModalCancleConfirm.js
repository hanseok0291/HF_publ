import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/common/DefaultModal.module.css";
import styleRecent from "../../../../styles/coupon_pub/Recent.module.css";

const ModalAlert = ({
  title,
  cancle = "돌아가기",
  confirm = "결제 취소하기",
  content,
}) => {
  return (
    <>
      <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRecent.modalCommon}`}
      >
        <div className={`${styleModal.modalDialog}`}>
          <div className={`${styleModal.modalContent}`}>
            <div
              className={`${styleModal.modalHeader} ${styleRecent.modalHeader}`}
            >
              <h3
                className={`${styleModal.modalTitle} ${styleModal.underBarTitle} ${styleFilter.modalTitle}`}
              >
                결제를 취소하시겠어요?
              </h3>
            </div>
            <div className={styleModal.modalBody}>
              <p>
                결제 시 사용했던 머니&포인트 일부의 <br />
                유효기간이 만료되었습니다.
                <br />
                <span className={styleCommon.textDanger}>
                  만료된 머니&포인트는 <br /> 결제 취소 금액에서 제외됩니다.
                </span>
              </p>
              <div className={styleModal.cancleTable}>
                <p className={styleModal.cancleTableRow}>
                  <span className={styleModal.cancleTableCol}>결제 금액</span>
                  <span className={styleModal.cancleTableCol}>5,000원</span>
                </p>
                <p className={styleModal.cancleTableRow}>
                  <span className={styleModal.cancleTableCol}>
                    유효기간 만료
                  </span>
                  <span className={styleModal.cancleTableCol}>
                    머니 &nbsp; 5,000원
                  </span>
                </p>
                <p className={styleModal.cancleTableRow}>
                  <span className={styleModal.cancleTableCol}></span>
                  <span className={styleModal.cancleTableCol}>
                    포인트 &nbsp; 500원
                  </span>
                </p>
                <p className={styleModal.cancleTableLine}></p>
                <p
                  className={`${styleModal.cancleTableRow} ${styleModal.totalRow}`}
                >
                  <span>결제 취소 금액</span>
                  <span className={styleCommon.highlight}>4,000원</span>
                </p>
              </div>
            </div>
            <div className={styleModal.modalFooter}>
              {cancle && (
                <button
                  type="button"
                  className={`${styleModal.btn} ${styleModal.btnCancel} ${styleModal.modalClose}`}
                >
                  {cancle}
                </button>
              )}
              <button
                type="button"
                className={`${styleModal.btn} ${styleModal.btnConfirm} ${styleModal.modalClose}`}
              >
                {confirm}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAlert;
