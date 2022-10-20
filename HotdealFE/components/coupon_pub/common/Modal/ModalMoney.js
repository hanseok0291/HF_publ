import { useState } from "react";

//css
import styleDefaultLayout from "../../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleDefaultModal from "../../../../styles/common/DefaultModal.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalMoney = ({ show, onClose }) => {
  const handleMoneyTabClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleCloseClick = () => {
    onclose();
  };

  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.open}`}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog} ${styleModal.modal}`}
        style={{ bottom: "0" }}
      >
        <div className={`${styleModal.modalContent}`}>
          <div className={`${styleModal.modalBody}`}>
            <p className={`${styleModal.modalTitle}`}>
              나를 위한 선물<span className="titleEmoticon">🎁</span>
            </p>
            <p className={`${styleModal.modalSubTitle}`}>
              결제할 때 사용해서 저렴하게 구매해 보세요
              <i className={`${styleCommon.italic}`}>!</i>
            </p>
            <div className={`${styleModal.modalInfoBox}`}>
              <p className={`${styleModal.title}`}>보유 금액</p>
              <p className={`${styleModal.money}`}>300,000원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMoney;
