import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalRecentEmpty = ({
  title,
  cancle = "취소",
  confirm = "확인",
  content,
}) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={styleModal.modalContent}>
          <div className={styleModal.modalBody}>
            <p>최근 선물한 친구가 없습니다.</p>
          </div>
          <div className={styleModal.modalFooter}>
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
  );
};

export default ModalRecentEmpty;
