import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalFillBox = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyAccount}  ${styleRettoModal.fillBoxAlert}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <div className={styleRettoModal.textWrap}>
            <p className={styleRettoModal.topText}><b>지금 비우기 하면 리또뿐만 아니라<br /><span>100원딜 응모권도 받을 수 없어요.</span></b></p>
            <p className={styleRettoModal.botText}>그래도 리또 머니함을 비울까요?</p>
          </div>
          <Button>그대로 둘게요</Button>
          <button type="button" className={styleRettoModal.bottomBtn}>네, 우선 비울게요</button>
        </div>
      </div>
    </div>
  )
}

export default ModalFillBox;
