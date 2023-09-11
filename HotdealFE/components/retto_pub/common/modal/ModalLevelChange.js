import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";

// 레벨 변경 확인 모달
const ModalLevelChange = () => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.levelChange}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          <div className={`${styleRettoModal.jewelWrap}`}>
            <span className="jewelImg diamond"></span>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
            <span className={styleRettoModal.arrow}></span>
            <span className="jewelImg emerald"></span>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
          </div>
          <p className={styleRettoModal.mainText}>
            리또 레벨을 변경하면 <br />
            <b>스탬프 적립 현황이 리셋</b>돼요.
          </p>
          <p className={styleRettoModal.subText}>그래도 <span>Lv2.에메랄드 리또로 변경</span>할까요?</p>
          <Button>변경하기</Button>
          <button type="button" className={styleRettoModal.bottomBtn}>닫기</button>
        </div>
      </div>
    </div>
  )
}

export default ModalLevelChange;
