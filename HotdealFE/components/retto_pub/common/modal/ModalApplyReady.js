import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalApplyReady = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyReady}`}
    >
      <div className={styleModal.modalDialog}>
        {/* <button type="button" className={styleRettoModal.modalClose}>닫기</button> */}
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
          <p className={styleRettoModal.mainText}>
            <b>잠시 후 오전 12시 30분부터</b><br />신청을 도와드릴게요!
          </p>
          <p className={styleRettoModal.subText}>지금은 다음주 진행을 준비하고 있어요.</p>
          <Button>다시 올게요</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalApplyReady;
