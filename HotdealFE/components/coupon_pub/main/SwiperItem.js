// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";
import CouponListItem from "../list/CouponListItem";

function SwiperWrap(props) {

  return (
    <>
			<div
					className={`${styleSwiper.SwiperWrap} ${styleBrandList.SwiperWrap}`}
          style={{paddingTop: props.paddingTop}}
				>
        <div>
          <div className={styleSwiper.SwiperTitleWrap}>
            <h2
              className={`${styleCommon.container} ${styleSwiper.SwiperTitle}`}
              style={{ fontSize: props.fontSize }}
            >
              {props.title}
            </h2>
            {props.addView && <button className={styleSwiper.SwiperAddview}>더보기</button>}
          </div>
          <div className={`${styleCommon.container} ${styleSwiper.container}`}>
            <Swiper
              spaceBetween={12}
              freeMode={true}
              grabCursor={true}
              slidesPerView={"auto"}
              slidesOffsetAfter={40}
            >
              {props.listItem.map((item, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <CouponListItem listItem={item} slideType/>
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

export default SwiperWrap;
