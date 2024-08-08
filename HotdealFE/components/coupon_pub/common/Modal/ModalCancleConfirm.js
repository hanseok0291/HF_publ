import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/common/DefaultModal.module.css";
import styleRecent from "../../../../styles/coupon_pub/Recent.module.css";

const ModalCancleConfirm = ({
  title,
  cancle = "돌아가기",
  confirm = "취소하기",
  content,
}) => {
  return (
    <>
      <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleModal.paymentCancle}`}
      >
        <div className={`${styleModal.modalDialog}`}>
          <div className={`${styleModal.modalContent}`}>
            <div
              className={`${styleModal.modalHeader} ${styleRecent.modalHeader}`}
            >
              <h3
                className={`${styleModal.modalTitle} ${styleFilter.modalTitle}`}
              >
                결제를 취소할까요?
              </h3>
            </div>
            <div className={styleModal.modalBody}>
              <p className={styleModal.subText}>
                결제 시 사용했던 머니&포인트 일부의 <br />
                유효기간이 만료됐어요. 만료된 머니&포인트는 결제 취소 금액에서 제외됩니다.
              </p>
              <div className={styleModal.cancleTable}>
                <div className={styleModal.cancleTableRow}>
                  <span className={styleModal.cancleTableCol}>결제 금액</span>
                  <span className={styleModal.cancleTableCol}>5,000원</span>
                </div>
                <div className={styleModal.cancleTableRow}>
                  <span className={styleModal.cancleTableCol}>
                    유효기간 만료
                  </span>
                  <div className={styleModal.textWrap}>
                    <span className={styleModal.leftText}>머니</span>
                    <span className={styleModal.cancleTableCol}>
                      500원
                    </span>
                  </div>
                </div>
                <div className={styleModal.cancleTableRow}>
                  <span className={styleModal.cancleTableCol}></span>
                  <div className={styleModal.textWrap}>
                    <span className={styleModal.leftText}>포인트</span>
                    <span className={styleModal.cancleTableCol}>
                      500원
                    </span>
                  </div>
                </div>
                <div className={styleModal.cancleTableLine}></div>
                <div
                  className={`${styleModal.cancleTableRow} ${styleModal.totalRow}`}
                >
                  <span>결제 취소 금액</span>
                  <span>4,000원</span>
                </div>
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

export default ModalCancleConfirm;
