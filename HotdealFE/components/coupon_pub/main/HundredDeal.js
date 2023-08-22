import styleHundredDeal from "../../../styles/coupon_pub/HundredDeal.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

import "swiper/css/pagination";

const HundredDeal = () => {
  const swiperParams = {
    navigation: true,
    centeredSlides: true,
    slidesPerView: 1,
    modules: [Autoplay, Pagination],
    spaceBetween: 18,
    // autoplay: {
    //   delay: 2000
    // },
    // loop: true,
    pagination: true
  };

  return (
    <>
      <div className={styleHundredDeal.mainContainer}>
        <h4>인기 상품은 <span>100원딜</span>로 득템<i>!</i></h4>
        <div className={styleHundredDeal.timeWrap}>
          <p>남은 응모 시간</p>
          <div className={styleHundredDeal.timeBox}>
            <span>2</span>
            <span className={styleHundredDeal.mr10}>일</span>
            <span>1</span>
            <span>0</span>
            <span className={styleHundredDeal.colon}>:</span>
            <span>3</span>
            <span>5</span>
            <span className={styleHundredDeal.colon}>:</span>
            <span>2</span>
            <span>8</span>
          </div>
          <Swiper {...swiperParams} className={styleHundredDeal.slide}>
            <SwiperSlide>
              <div className={styleHundredDeal.imgWrap}>
                <img src="../images/100deal/sample/main-100deal-01.png" alt="메가박스" />
              </div>
              <div className={styleHundredDeal.textWrap}>
                <p className={styleHundredDeal.productName}>
                  <span className={styleHundredDeal.peopleLimit}>50명</span>
                  <span className={styleHundredDeal.brand}>메가박스</span>
                </p>
                <span className={styleHundredDeal.name}>2인 관람권 팝콘 세트</span>
                <p className={styleHundredDeal.price}>
                  <span className={styleHundredDeal.beforePrice}>36,000</span>
                  <span className={styleHundredDeal.afterPrice}>100원</span>
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styleHundredDeal.imgWrap}>
                <img src="../images/100deal/sample/main-100deal-01.png" alt="메가박스" />
              </div>
              <div className={styleHundredDeal.textWrap}>
                <p className={styleHundredDeal.productName}>
                  <span className={styleHundredDeal.peopleLimit}>50명</span>
                  <span className={styleHundredDeal.brand}>메가박스</span>
                </p>
                <span className={styleHundredDeal.name}>2인 관람권 팝콘 세트</span>
                <p className={styleHundredDeal.price}>
                  <span className={styleHundredDeal.beforePrice}>36,000</span>
                  <span className={styleHundredDeal.afterPrice}>100원</span>
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HundredDeal;
