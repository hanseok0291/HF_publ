import { useState } from "react";

//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleSlick from "../../../../styles/coupon_pub/Slick.module.css";

const MainPopup = ({
  title,
  cancle = "취소",
  confirm = "확인",
  content,
  onClose,
}) => {
  const btnClose = () => {
    onClose();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.modalMain} ${styleModal.open}`}
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
          <Slider {...settings}>
            <div>
              <div className={styleModal.modalClick}>
                <div className={styleModal.modalBody}>
                  <h3
                    className={`${styleModal.popupTitle} ${styleModal.popupTitle2}`}
                  >
                    <p className={styleModal.popupSubTitle}>
										5월은 감사의 달
                    </p>
                    <strong className={styleModal.popupMainTitle}>
										사랑을 담아
                      <br />
                      <span className={styleCommon.highlight}>
											20% 할인 EVENT<i className={`${styleCommon.italic}`}>!</i>
                      </span>
                    </strong>
                  </h3>
                  <p className={styleModal.modalImgBox}>
                    <img
                      src="../images/coupon/popup/may.png"
                      alt="5월은 감사의 달 사랑을 담아 20% 할인 EVENT!"
                    />
                  </p>
                </div>
                <div className={styleModal.modalFooter}>
                  <button
                    type="button"
                    className={`${styleModal.btn} ${styleModal.btnFull}`}
                  >
                    20% 할인 상품 보러가기
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className={styleModal.modalClick}>
                <div className={styleModal.modalBody}>
                  <h3
                    className={`${styleModal.popupTitle} ${styleModal.popupTitle2}`}
                  >
                    <p className={styleModal.popupSubTitle}>
										Ready~ Action<i className={`${styleCommon.italic}`}>!</i>
                    </p>
                    <strong className={styleModal.popupMainTitle}>
										블록버스터급
                      <br />
                      <span className={styleCommon.highlight}>
											선착순 20% 할인 특가<i className={`${styleCommon.italic}`}>!</i>
                      </span>
                    </strong>
                  </h3>
                  <p className={styleModal.modalImgBox}>
                    <img
                      src="../images/coupon/popup/mayMovie.png"
                      alt="Ready~ Action! 선착순 20% 할인 특가!"
                    />
                  </p>
                </div>
                <div className={styleModal.modalFooter}>
                  <button
                    type="button"
                    className={`${styleModal.btn} ${styleModal.btnFull}`}
                  >
                    영화 티켓 할인받기
                  </button>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

// ModalAlert.propTypes = {
//   content: PropTypes.string.isRequired,
// };

export default MainPopup;
