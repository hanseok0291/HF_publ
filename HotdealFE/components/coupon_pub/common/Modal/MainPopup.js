import { useState } from "react";

//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleSlick from "../../../../styles/coupon_pub/Slick.module.css";

const MainPopup = ({ title, cancle = "취소", confirm = "확인", content, onClose }) => {
	const btnClose = () => {
		onClose();
	}

	const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000
  };

  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.modalMain} ${styleModal.open}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={styleModal.modalContent}>
					<button type="button" className={styleModal.modalClick}>
          <div className={styleModal.modalHeader}>
						<button type="button" onClick={btnClose} className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}>닫기</button>
          </div>
					
          <Slider {...settings}>
						<div>
							<div className={styleModal.modalBody}>
								<h3 className={`${styleModal.popupTitle} ${styleModal.popupTitle2}`}>
									<p className={styleModal.popupSubTitle}>망설이면 품절<i className={`${styleCommon.italic}`}>!</i></p>
									<strong className={styleModal.popupMainTitle}>놓치면 후회하는 <span className={styleCommon.highlight}>선착순 특가 </span>&nbsp;OPEN<i className={`${styleCommon.italic}`}>!</i>
									</strong>
								</h3>
								<p className={styleModal.modalImgBox}>
									<img
										src="../images/coupon/popup/week_1.png"
										alt="망설이면 품절! 놓치면 후회하는 선착순 특가 OPEN!"
									/>
								</p>
							</div>
							<div className={styleModal.modalFooter}>
								<button
									type="button"
									className={`${styleModal.btn} ${styleModal.btnFull}`}
								>
									지금 구경하기
								</button>
							</div>
						</div>
					</Slider>
					</button>
        </div>
      </div>
    </div>
  );

};
// ModalAlert.propTypes = {
//   content: PropTypes.string.isRequired,
// };

export default MainPopup;
