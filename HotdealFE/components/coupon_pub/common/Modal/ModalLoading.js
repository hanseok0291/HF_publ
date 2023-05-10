import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalLoading = ({ title }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleModal.modalWaiting}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={styleModal.modalContent}>
          <div className={styleModal.modalBody}>
          <div className={styleModal.loadingWrap}>
              <div className={styleModal.loading}></div>
              <div className={styleModal.textBox}>
                내 차례까지 <br/>
                <p>
                  <strong>52,415</strong>명
                </p>
              </div>
            </div>
            <dl>
              <dt>예상 대기 시간</dt>
              <dd>약 1시간 48분</dd>
            </dl>

            <p className={styleModal.infoText}> 
              휴대폰 홈이나 앱 내 다른 화면으로 이동하면 <br/>
              <b>대기시간이 늘어나니 잠시만 기다려 주세요. </b>
            </p>
            <div className={styleModal.botBtnWrap}>
							<button type="button">다음에 할게요</button>
						</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ModalLoading.propTypes = {
//   content: PropTypes.string.isRequired,
// };

export default ModalLoading;
