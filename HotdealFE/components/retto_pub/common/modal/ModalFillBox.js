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
            <p className={styleRettoModal.topText}><b>리또 머니함을 비우면 놓치는<br />혜택을 모두 확인하셨나요?</b></p>
            <p className={styleRettoModal.botText}>그래도 리또 머니함을 비울까요?</p>
          </div>
          <Button>혜택 유지할래요</Button>
          <button type="button" className={styleRettoModal.bottomBtn} onClick={closeModal}>네, 우선 비울게요</button>
        </div>
      </div>
    </div>
  )
}

export default ModalFillBox;
