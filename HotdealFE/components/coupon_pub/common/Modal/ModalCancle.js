import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/common/DefaultModal.module.css";
import styleRecent from "../../../../styles/coupon_pub/Recent.module.css";

const ModalCancle = ({
  title,
  cancle = "돌아가기",
  confirm = "확인",
  content,
}) => {
  return (
    <>
      <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRecent.modalCommon}`}
      >
        <div className={`${styleModal.modalDialog}`}>
          <div className={`${styleModal.modalContent}`}>
            <div className={styleModal.modalBody}>
              <p>이 쿠폰의 결제를 취소하시겠어요?</p>
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

export default ModalCancle;
