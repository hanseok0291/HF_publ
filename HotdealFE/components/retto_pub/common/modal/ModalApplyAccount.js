import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalApplyAccount = ({type}) => {// type="apply" 신청 나머지 레벨 변경 
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyAccount}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <p className={styleRettoModal.mainText}>
            {type === "apply" ? '리또를 받으' : '레벨을 변경하'}려면 <br />
            <b>충전 계좌 등록</b>이 필요해요
          </p>
          <Button>계좌 등록</Button>
          <button type="button" className={styleRettoModal.bottomBtn}>다음에 하기</button>
        </div>
      </div>
    </div>
  )
}

export default ModalApplyAccount
