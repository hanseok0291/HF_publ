import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalFillBox = ({closeModal}) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyAccount}  ${styleRettoModal.fillBoxAlert}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <div className={styleRettoModal.textWrap}>
            <p className={styleRettoModal.topText}><b>지금 비우면<br />100원딜 응모권도 받을 수 없어요.</b></p>
            <p className={styleRettoModal.botText}>그래도 머니함을 비울까요?</p>
          </div>
          <Button>그대로 둘게요</Button>
          <button type="button" className={styleRettoModal.bottomBtn} onClick={closeModal}>네, 우선 비울게요</button>
        </div>
      </div>
    </div>
  )
}

export default ModalFillBox;
