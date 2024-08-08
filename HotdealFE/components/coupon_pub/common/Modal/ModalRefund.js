import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/common/DefaultModal.module.css";
import styleRecent from "../../../../styles/coupon_pub/Recent.module.css";

const ModalRefund = ({ title, cancle = "취소", confirm = "확인", content }) => {
  return (
    <>
      <div
        className={`${styleModal.modal} ${styleModal.alert} ${styleModal.modalCommon} ${styleModal.open}`}
      >
        <div className={`${styleModal.modalDialog}`}>
          <div className={`${styleModal.modalContent}`}>
            <div
              className={`${styleModal.modalHeader}`}
            >
              <h3
                className={`${styleModal.modalTitle} ${styleFilter.modalTitle}`}
              >
                환불 안내
              </h3>
            </div>
            <div className={styleModal.modalBody}>
              <p>
                환불 요청 및 진행은 고객센터를 통해서만 가능합니다.
                <br />
                <strong>010PAY 고객센터(1600-5220)</strong>로 연락주시면 자세히
                안내드리겠습니다.
              </p>
            </div>
            <div className={styleModal.modalFooter}>
              {/*               {cancle && (
                <button
                  type="button"
                  className={`${styleModal.btn} ${styleModal.btnCancel} ${styleModal.modalClose}`}
                >
                  {cancle}
                </button>
              )} */}
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

export default ModalRefund;
