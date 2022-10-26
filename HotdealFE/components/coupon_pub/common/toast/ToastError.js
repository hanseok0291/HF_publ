import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleToast from "../../../../styles/coupon_pub/Toast.module.css";

const ToastError = () => {
  return (
    <div className={`${styleToast.toastPopup} ${styleToast.toastMsg}`}>
      <div>
        <div className={`${styleCommon.container}`}>
          {/* 이름 미입력 */}
          <p className={`${styleCommon.msg} ${styleCommon.msgError}`}>
            이름을 적어주세요
            <i className={`${styleCommon.italic}`}>!</i>
          </p>
          {/* //이름 미입력 */}
          {/* 휴대폰 번호 미입력 */}
          <p className={`${styleCommon.msg} ${styleCommon.msgError}`}>
            휴대폰 번호를 적어주세요
            <i className={`${styleCommon.italic}`}>!</i>
          </p>
          {/* //휴대폰 번호 미입력 */}
          {/* 휴대폰 번호 에러 */}
          <p className={`${styleCommon.msg} ${styleCommon.msgError}`}>
            휴대폰 번호를 확인해주세요
            <i className={`${styleCommon.italic}`}>!</i>
          </p>
          {/* //휴대폰 번호 에러 */}
          {/* 동의 토스트 */}
          <p className={`${styleCommon.msg} ${styleCommon.msgError}`}>
            동의가 필요해요
            <i className={`${styleCommon.italic}`}>!</i>
          </p>
          {/* //동의 토스트 */}
        </div>
      </div>
    </div>
  );
};

export default ToastError;
