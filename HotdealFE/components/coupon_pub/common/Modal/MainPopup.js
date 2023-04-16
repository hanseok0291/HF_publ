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
										황금 연휴 기차 여행
                    </p>
                    <strong className={styleModal.popupMainTitle}>
										코레일 &amp; SRT
                      <br />
                      <span className={styleCommon.highlight}>
											~20% 할인 특가<i className={`${styleCommon.italic}`}>!</i>
                      </span>
                    </strong>
                  </h3>
                  <p className={styleModal.modalImgBox}>
                    <img
                      src="../images/coupon/popup/trainTravel.png"
                      alt="황금 연휴 기차 여행 코레일 &amp; SRT ~20% 할인 특가!"
                    />
                  </p>
                </div>
                <div className={styleModal.modalFooter}>
                  <button
                    type="button"
                    className={`${styleModal.btn} ${styleModal.btnFull}`}
                  >
                    승차권 할인받아 떠나기
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
                      선착순 20,000장 한정
                    </p>
                    <strong className={styleModal.popupMainTitle}>
                      세금 환급 수수료
                      <br />
                      <span className={styleCommon.highlight}>
                        5,000원 할인 쿠폰<i className={`${styleCommon.italic}`}>!</i>
                      </span>
                    </strong>
                  </h3>
                  <p className={styleModal.modalImgBox}>
                    <img
                      src="../images/coupon/popup/taxRefund.png"
                      alt="종소세 할인 PAY쿠폰!"
                    />
                  </p>
                </div>
                <div className={styleModal.modalFooter}>
                  <button
                    type="button"
                    className={`${styleModal.btn} ${styleModal.btnFull}`}
                  >
                    숨은 내 돈 환급받기
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
