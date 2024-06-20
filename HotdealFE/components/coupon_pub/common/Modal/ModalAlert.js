import rhp from "html-react-parser";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalAlert = ({ title, subTitle, cancle = "취소", confirm = "확인", message }) => {
  const TextLine = ({ text }) => {
    return (
      <>
        {rhp(text)}
        <br />
      </>
    )
  }
  return (
    <div
      className={`${styleModal.modal} ${styleModal.alert} ${styleModal.modalCommon} ${styleModal.open}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={styleModal.modalContent}>
          {title && title !== "" ? (
            <div className={styleModal.modalHeader}>
              <h3 className={styleModal.modalTitle}>{title}</h3>
            </div>
          ): null}
          
          <div className={styleModal.modalBody}>
            {subTitle && (
              <h4 className={styleModal.subTitle}>{subTitle}</h4>
            )}
            <p>
              {message &&
                message
                .replace(/\r/gi, "")
                .split("\n")
                .map((line, idx) => {
                  return <TextLine key={idx} text={line}/>
                })}
            </p>
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

export default ModalAlert;
