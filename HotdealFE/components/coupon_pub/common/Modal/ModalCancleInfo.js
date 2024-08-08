import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/common/DefaultModal.module.css";
import styleRecent from "../../../../styles/coupon_pub/Recent.module.css";

const ModalCancleInfo = ({ title, cancle = "취소", confirm = "확인", content }) => {
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
                className={`${styleModal.modalTitle}`}
              >
                결제 취소 안내
              </h3>
            </div>
            <div className={styleModal.modalBody}>
              <p>
                구매 후 14일이 경과되어 고객센터를 통해서만 결제 취소가
                가능합니다.
                <br />
                <strong>010PAY 고객센터(1600-5220)</strong>로 연락 주시면 자세히
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

export default ModalCancleInfo;
