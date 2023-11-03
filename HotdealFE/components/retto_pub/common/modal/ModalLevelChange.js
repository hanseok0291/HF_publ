import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";
import Toast from "../Toast";

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
            {/* <span className={styleRettoModal.arrow}></span> */}
            {/* <span className="jewelImg emerald"></span> */}{/* ruby emerald diamond className 추가 시 스타일 변경*/}
          </div>
          <div className={styleRettoModal.textWrap}>
            {/* <p className={styleRettoModal.mainText}>
              <b>다음주 월요일부터</b> <br />
              변경된 레벨의 첫 스탬프가 찍혀요!
            </p> */}
            {/* 월요일 이전 원복 시 문구 */}
            <p className={styleRettoModal.mainText}>
              레벨 변경을 취소하고<br />
              <b>MAX. <span className="diamond">다이아 리또</span></b>를 유지할까요?{/* ruby emerald diamond className 추가 시 스타일 변경*/}
              <p className={styleRettoModal.subText}>리또 머니함 속 금액도 그대로 둘게요.</p>
            </p>
            {/* <p className={styleRettoModal.subText}>그래도 <span>Lv2.에메랄드 리또로 변경</span>할까요?</p> */}
            {/* <p className={styleRettoModal.infoText}>머니함 속 금액을 옮길 수 없다면 변경이 취소돼요.</p> */}{/* 하향 시 문구 */}
            {/* <p className={styleRettoModal.infoText}>부족한 머니 충전을 실패한다면 변경이 취소돼요.</p> */}{/* 상향 시 문구 */}
          </div>
          {/* <Button>변경하기</Button> */}
          <Button>네, 좋아요</Button>{/* 월요일 이전 원복 시 문구 */}
          <button type="button" className={styleRettoModal.bottomBtn}>닫기</button>
        </div>
      </div>
      <Toast>
        리또 레벨 변경을 신청했어요!
      </Toast>
      {/* <Toast>
        리또 레벨 변경이 취소됐어요!
      </Toast> */}
    </div>
  )
}

export default ModalLevelChange;
