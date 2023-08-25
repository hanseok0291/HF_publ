// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";
import CouponListItem from "../list/CouponListItem";

function TimeSale(props) {
  return (
    <>
			<div
					className={`${styleSwiper.SwiperWrap} ${styleSwiper.timeSale}`}
          style={{paddingTop: props.paddingTop, paddingBottom: props.paddingBottom, backgroundColor: props.bgColor}}
				>
        <div>
          <div className={styleSwiper.SwiperTitleWrap}>
            <h2
              className={`${styleCommon.container} ${styleSwiper.SwiperTitle}`}
              style={{ fontSize: props.fontSize }}
            >
              {props.title}
            </h2>
          </div>
          <p className={styleSwiper.timeSaleText}>남은 시간: <span className={styleSwiper.time}>11:22:33</span></p>
          <div className={`${styleCommon.container} ${styleSwiper.container}`}>
            {/* 이미지를 작게 하기 위한 styleSwiper.sm */}
            <Swiper
              spaceBetween={9}
              freeMode={true}
              grabCursor={true}
              slidesPerView={"auto"}
              slidesOffsetAfter={40}
              className={styleSwiper.sm}
            >
              {props.listItem.map((item, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <CouponListItem listItem={item} isWon={props.isWon}/>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <Swiper
              spaceBetween={9}
              freeMode={true}
              grabCursor={true}
              slidesPerView={"auto"}
              slidesOffsetAfter={40}
              className={styleSwiper.sm}
            >
              {props.listItem.map((item, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <CouponListItem listItem={item}/>{/* slideType 속성 X */}
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeSale;
