import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalAlert = ({ title, cancle = "취소", confirm = "확인", content }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleModal.modalMessage}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={styleModal.modalContent}>
          <div className={`${styleModal.modalHeader}`}>
            {title && <h3 className={styleModal.modalTitle}>{title}</h3>}
            <button
              type="button"
              className={`${styleCommon.btnIcon} ${styleModal.btnClose}`}
            >
              닫기
            </button>
          </div>
          <div className={styleModal.modalBody}>
            <div className={styleModal.messageBox}>
            <p className={styleModal.toText}>To. 헥토파이낸셜</p>
						<p className={styleModal.modalText}>
							한 잔은 내꺼야. <br />
              같이먹게 저녁에 나와!
						</p>
						<p className={styleModal.fromText}>From. 010PAY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ModalAlert.propTypes = {
//   content: PropTypes.string.isRequired,
// };

export default ModalAlert;
