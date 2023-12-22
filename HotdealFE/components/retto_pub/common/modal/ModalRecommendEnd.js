import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalRecommendEnd = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyReady}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <p className={styleRettoModal.mainText}>
            <b>이벤트가 마감됐어요</b>
          </p>
          <p className={styleRettoModal.subText}>더 좋은 이벤트를 준비 중이에요!</p>
          <Button>확인</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalRecommendEnd;
