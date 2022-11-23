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
								<h3 className={styleModal.popupTitle}>
									<p className={styleModal.popupSubTitle}>아메리카노 마시고</p>
									<strong className={styleModal.popupMainTitle}>
										<span className={styleCommon.highlight}>매일 4%</span> 적립<i className={`${styleCommon.italic}`}>!</i>
									</strong>
								</h3>
								<p className={styleModal.modalImgBox}>
									<img
										src="../images/coupon/popup/popup1.png"
										alt="스타벅스 아메리카노"
									/>
								</p>
							</div>
							<div className={styleModal.modalFooter}>
								<button
									type="button"
									className={`${styleModal.btn} ${styleModal.btnFull}`}
								>
									마시고 적립받기
								</button>
							</div>
						</div>
						<div>
							<div className={styleModal.modalBody}>
								<h3 className={`${styleModal.popupTitle} ${styleModal.popupTitle2}`} style={{top: `-6px`}}>
									<p className={styleModal.popupSubTitle}>
										<span style={{color: `#e51616`}}>월드컵</span> 함께 응원해요<i className={`${styleCommon.italic}`}>!</i></p>
									<strong className={`${styleModal.popupMainTitle} ${styleModal.popupMainTitle2}`}>
									치킨&amp;피자 먹으면<br />
										<span className={`${styleCommon.highlight} ${styleCommon.highlight2}`}>4% 캐시백<i className={`${styleCommon.italic}`}>!</i></span>
									</strong>
								</h3>
								<p className={styleModal.modalImgBox}>
									<img
										src="../images/coupon/popup/popup2.png"
										alt="월드컵 치킨&amp;피자"
									/>
								</p>
							</div>
							<div className={styleModal.modalFooter}>
								<button
									type="button"
									className={`${styleModal.btn} ${styleModal.btnFull}`}
									style={{
										backgroundColor: `#e51616`
									}}
								>
									응원하러 가기
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
