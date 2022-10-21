import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalExtensionInfo = ({
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
          {/* <div className={styleModal.modalHeader}>
            {title && <h3 className={styleModal.modalTitle}>{title}</h3>}
          </div> */}
          <div className={styleModal.modalBody}>
            <p>유효기간을 연장하시겠어요?</p>
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
  );
};

// ModalAlert.propTypes = {
//   content: PropTypes.string.isRequired,
// };

export default ModalExtensionInfo;
