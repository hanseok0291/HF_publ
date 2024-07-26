import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalTipEventEnd = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyReady}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
          <p className={styleRettoModal.mainText}>
            <b>이벤트가 종료되었어요!</b>
          </p>
          <p className={styleRettoModal.subText}>다음에 다시 만나요!</p>
          <Button>리또 홈으로 이동하기</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalTipEventEnd;
