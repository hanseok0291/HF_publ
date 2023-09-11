import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Controller } from "swiper";

// SwiperCore.use([Autoplay]);

//slick
import "swiper/css";
import "swiper/css/effect-fade";

import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalHundredComing = ({
  title,
  cancle = "취소",
  confirm = "확인",
  content,
  onClose,
}) => {
  const btnClose = () => {
    onClose();
  };

  const swiperParams = {
    // Swiper 옵션 설정
    spaceBetween: 30,
    effect: "fade",
    navigation: true,
    modules: [EffectFade, Autoplay, Controller],
    autoplay: {
      delay: 1500
    },
    loop: true,
  };

  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.modalComingsoon} ${styleModal.open}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={styleModal.modalContent}>
          <div className={styleModal.modalHeader}>
            <button
              type="button"
              onClick={btnClose}
              className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
            >
              닫기
            </button>
          </div>
          <div className={styleModal.textWrap}>
            <p className={styleModal.date}>
							test
              {/* 매주 월·수·금 <span>오전 9시</span> */}
            </p>
          </div>
          <p className={styleModal.infoText}>
            {/* 인기 상품 <strong>100원 득템</strong> 찬스<i>!</i> */}
          </p>
        </div>
      </div>
    </div>
  );
};

// ModalAlert.propTypes = {
//   content: PropTypes.string.isRequired,
// };

export default ModalHundredComing;
