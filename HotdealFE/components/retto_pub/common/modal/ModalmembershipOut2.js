import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalmembershipOut2 = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyAccount}  ${styleRettoModal.fillBoxAlert}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <div className={styleRettoModal.textWrap}>
            <p className={styleRettoModal.topText}>
              <b><span>리또 당첨금 지급 전이네요!</span> <br />
              당첨금 수령 후 탈퇴할 수 있어요.</b>
            </p>
            <p className={styleRettoModal.botText}>수령 신청일 기준 다음 달 15일 안에 지급돼요.</p>
          </div>
          <Button>확인</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalmembershipOut2;
