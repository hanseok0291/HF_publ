import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalLevelChangeBan = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyReady}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <p className={styleRettoModal.mainText}>
            <b>오전 01시 부터<br />레벨 변경을 도와드릴게요!</b>
          </p>
          <p className={styleRettoModal.subText}>나중에 다시 시도해 주세요!</p>
          <Button>다시 올게요</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalLevelChangeBan;
