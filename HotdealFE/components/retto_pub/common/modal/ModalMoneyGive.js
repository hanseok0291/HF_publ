import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";
import MoneyLottie from "../../../../public/lotties/give_money.json";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";
import LottieComponent from "../../LottieComponent";

const ModalMoneyGive = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.moneyGive}`}
    >
      <div className={`${styleModal.modalDialog} ${styleRettoModal.modalDialog}`}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <LottieComponent className={styleRettoModal.moneyLottie} animationData={MoneyLottie} speed={1} loop />
          <p className={styleRettoModal.mainText}>
            <b>당첨금을 받았어요!</b>
          </p>
          <p className={styleRettoModal.subText}><span>포인트 10,000원</span>이<br />지금 바로 들어왔어요.</p>
          <Button>확인</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalMoneyGive;
