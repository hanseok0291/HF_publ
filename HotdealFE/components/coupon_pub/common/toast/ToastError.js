import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleToast from "../../../../styles/coupon_pub/Toast.module.css";

const ToastError = ({errorMsg, isBang = false}) => {
  return (
    <div className={`${styleToast.toastPopup} ${styleToast.toastMsg}`}>
      <div>
        <div className={`${styleCommon.container}`}>
          <p className={`${styleCommon.msg} ${styleCommon.msgError}`}>
            {errorMsg}
            {isBang && <i className={`${styleCommon.italic}`}>!</i>} {/* 느낌표 표시 여부 */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToastError;
