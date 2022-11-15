import { useState } from "react";
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const MainPopup = ({ title, cancle = "취소", confirm = "확인", content, onClose }) => {
	const btnClose = () => {
		onClose();
	}

  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.modalMain} ${styleModal.open}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={styleModal.modalContent}>
					<button type="button" className={styleModal.modalClick}>
          <div className={styleModal.modalHeader}>
						<button type="button" onClick={btnClose} className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}>닫기</button>
          </div>
          <div className={styleModal.modalBody}>
            <h3 className={styleModal.popupTitle}>
							<p className={styleModal.popupSubTitle}>아메리카노 마시고</p>
							<strong className={styleModal.popupMainTitle}>
								<span className={styleCommon.highlight}>매일 4%</span> 적립<i className={`${styleCommon.italic}`}>!</i>
							</strong>
						</h3>
            <p 
							style={{
								textAlign: `center`
							}}>
							<img
							style={{
								maxWidth: `212.5px`
							}}
								src="../images/coupon/popup/popup1.png"
								alt="팝업"
							/>
						</p>
          </div>
          <div className={styleModal.modalFooter}>
            <button
              type="button"
              className={`${styleModal.btn} ${styleModal.btnFull}`}
            >
              마시고 적립받기
            </button>
          </div>
					</button>
        </div>
      </div>
    </div>
  );

};
// ModalAlert.propTypes = {
//   content: PropTypes.string.isRequired,
// };

export default MainPopup;
