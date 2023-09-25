import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

// 레벨 변경 확인 모달
const ModaladdMoney = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.addMoney}`}
    >
      <div className={`${styleModal.modalDialog}  ${styleRettoModal.modalDialog}`}>
        <button type="button" className={styleRettoModal.closeBtn}></button>
        <h4>제세공과금이 붙어요!</h4>
        <p>
          소득세법 제 129조에 따라 <br />
          <b>5만원을 초과하는 당첨금</b>은 <br />
          <b>당첨금의 22% 제외 후 지급</b>돼요.
        </p>
        <span>당첨금 총액이 아닌 회차별로 계산</span>
      </div>
    </div>
  )
}

export default ModaladdMoney;
