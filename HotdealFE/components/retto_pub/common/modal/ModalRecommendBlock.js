import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalRecommendBlock = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyReady}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <p className={`${styleRettoModal.mainText} ${styleRettoModal.noImg}`}>
            <b><span className={styleRettoModal.warning}>만 19세 이상 내국인</span>만 <br />리또를 신청할 수 있어요!</b>
          </p>
          <p className={styleRettoModal.subText}>정말 아쉽지만 다른 혜택으로 만나요.</p>
          <Button>확인</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalRecommendBlock;
