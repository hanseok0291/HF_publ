// Import Swiper React components
import { useState } from "react";

import savePromotion from "../../../../styles/coupon_pub/savePromotion.module.css";
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalPromotion = () => {
  return (
    <div className={savePromotion.modalWrap}>
      <button
        type="button"
        className={`${styleCommon.btnIcon} ${savePromotion.btnClose} ${styleModal.modalClose}`}
      >
        닫기
      </button>
      <p className={savePromotion.modalText}>지금 적립 받을 수 있는 포인트</p>
      <p className={savePromotion.price}>3,000원</p>
      <button className={savePromotion.botBtn}>포인트 받기</button>
    </div>
  );
};

export default ModalPromotion;
