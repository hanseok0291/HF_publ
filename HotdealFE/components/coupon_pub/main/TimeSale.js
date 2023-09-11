import { useRef } from 'react';
// Import Swiper React components
import SwiperCore, { Controller } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

SwiperCore.use([Controller]);

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";
import CouponListItem from "../list/CouponListItem";

function TimeSale(props) {
  const swiper1 = useRef(null);
  const swiper2 = useRef(null);

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
              ref={swiper1}
              spaceBetween={9}
              freeMode={true}
              grabCursor={true}
              slidesPerView={"auto"}
              slidesOffsetAfter={40}
              className={styleSwiper.sm}
              onSwiper={(swiper) => (swiper1.current = swiper)}
              controller={{ control: swiper2.current }}
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
              ref={swiper2}
              spaceBetween={9}
              freeMode={true}
              grabCursor={true}
              slidesPerView={"auto"}
              slidesOffsetAfter={40}
              className={styleSwiper.sm}
              onSwiper={(swiper) => (swiper2.current = swiper)}
              controller={{ control: swiper1.current }}
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
