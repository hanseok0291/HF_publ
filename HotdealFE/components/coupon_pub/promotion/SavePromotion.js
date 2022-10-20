// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import savePromotion from "../../../styles/coupon_pub/savePromotion.module.css";
import { useState } from "react";

const SavePromotion = () => {
  const [dropDownShow, setDropDownShow] = useState(false);
  const dotTopText = "사용만 해도";

  const settings = {
    autoplay: {
      delay: 1000,
    },
    loop: true,
    slidesPerView: 1.8,
    centeredSlides: true,
    direction: "vertical",
  };

  return (
    <div className={savePromotion.container}>
      <div className={savePromotion.topTextWrap}>
        <p className={savePromotion.text_1}>
          구매한 쿠폰{" "}
          {dotTopText.split("").map((item, index) => (
            <span key={index} className={`${item !== " " ? savePromotion.dotTop : ""}`}>
              {item}
            </span>
          ))}
        </p>
        <p className={savePromotion.text_2}>
          <span>포인트가 적립</span> 된다고?
        </p>
        <p className={savePromotion.text_3}>
          <span>1회차 프로모션</span>
          <span>2022. 10. 1 ~ 2022. 10. 30</span>
        </p>
      </div>
      <div className={savePromotion.visualImg}></div>
      <div className={savePromotion.boxWrap}>
        <div className={savePromotion.leftBox}>
          <p className={savePromotion.text_1}>
            사용하면 적립돼요<i>!</i>
          </p>
          <p className={savePromotion.text_2}>
            결제 금액의 <span>10%</span>
          </p>
          <p className={savePromotion.text_3}>
            1회차 누적 혜택 : <span>3,500원</span>
          </p>
        </div>
        <div className={savePromotion.midBox}>
          <div>
            <span></span>
          </div>
          <div>
            <span></span>
          </div>
        </div>
        <div className={savePromotion.rightBox}>
          <Swiper {...settings} className={savePromotion.slide} modules={[Autoplay]}>
            <SwiperSlide>
              <img
                src="../../../images/promotion/savePromotion-slide_1.png"
                alt="던킨도너츠"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="../../../images/promotion/savePromotion-slide_1.png"
                alt="스타벅스"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="../../../images/promotion/savePromotion-slide_1.png"
                alt="파리파게트"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className={`${styleCommon.container}  ${savePromotion.infoWrap}`}>
        <h3
          className={`${styleCommon.titleInfo} ${styleCommon.flexWrap} ${styleCommon.alignCenter} ${savePromotion.title}`}
        >
          <i
            className={`${styleCommon.italicRound} ${savePromotion.italicRound}`}
          >
            !
          </i>
          안내드려요
          <button
            onClick={() => setDropDownShow(!dropDownShow)}
            className={`${savePromotion.downBtn} ${dropDownShow ? "down" : ""}`}
          ></button>
        </h3>

        {dropDownShow && (
          <div className={`${styleCommon.infoBox} ${savePromotion.infoBox}`}>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
              프로모션 기간 내 대상 상품 구매 및 사용 후 포인트 받기 버튼을
              눌러야 포인트 적립이 완료됩니다.
            </p>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
              상품 결제 금액의 00%가 포인트로 적립됩니다.
            </p>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
              위에 명시된 적립 비율은 해당 프로모션 대상 상품을 모두 구매 ·
              사용했을 때 받을 수 있는 포인트입니다.
            </p>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
              위에 명시된 누적 혜택은 새 회차 시작 시 0원으로 초기화 되나, 이미
              적립된 포인트는 사라지지 않습니다.
            </p>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
              프로모션 상품과 적립 비율은 프로모션 회차별로 변동됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavePromotion;
