import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalmembershipOut1 = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyReady}`}
    >
      <div className={styleModal.modalDialog}>
        {/* <button type="button" className={styleRettoModal.modalClose}>닫기</button> */}
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
          <p className={styleRettoModal.mainText}>
            <b>아직 찾아가지 않은 <br />
            <span className={styleRettoModal.warning}>리또 당첨금</span>이 있어요!</b>
          </p>
          <p className={styleRettoModal.subText}>당첨금 수령 후 탈퇴할 수 있어요.</p>
          <Button>당첨금 찾으러 가기</Button>
          <button type="button" className={styleRettoModal.bottomBtn}>닫기</button>
        </div>
      </div>
    </div>
  )
}

export default ModalmembershipOut1;
