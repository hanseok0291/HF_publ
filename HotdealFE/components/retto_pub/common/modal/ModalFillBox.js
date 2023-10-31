import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import styleFillBox from "../../../../styles/retto_pub/FillBox.module.css";
import Button from "../Button";

const ModalFillBox = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyAccount}  ${styleRettoModal.fillBoxAlert}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <div className={styleRettoModal.textWrap}>
            <p className={styleRettoModal.topText}><b>더이상 리또를 받을 수 없어도</b><br />
            <span>채우기 상자를 비울까요?</span></p>
            <p className={styleRettoModal.botText}>상자 속 금액은 보유 머니로 이동돼요.</p>
          </div>
          <Button>그대로 둘게요</Button>
          <button type="button" className={styleRettoModal.bottomBtn}>네, 우선 비울게요</button>
        </div>
      </div>
    </div>
  )
}

export default ModalFillBox;
