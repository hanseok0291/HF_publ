import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

const ModalApplyAccount = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyAccount}`}
    >
      <div className={styleModal.modalDialog}>
        {/* <button type="button" className={styleRettoModal.modalClose}>닫기</button> */}
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
          <p className={styleRettoModal.mainText}>
            리또를 받으려면 <br />
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
