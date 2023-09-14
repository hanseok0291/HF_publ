// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";
import CouponListItem from "../../coupon_pub/list/CouponListItem";

const listItem = [
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/BR00007_G00000117178.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006153424285.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트 따뜻한 카페라떼",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트",
    infoDcPrice: "6,300",
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트 시원하 함께 세트",
    infoDcPrice: "6,300",
  },
];

function RettoSwiperItem(props) {

  return (
    <>
			<div
					className={`${styleSwiper.SwiperWrap} ${styleBrandList.SwiperWrap}`}
          style={{paddingTop: props.paddingTop, paddingBottom: props.paddingBottom, backgroundColor: props.bgColor}}
				>
        <div>
          <div className={`${styleCommon.container} ${styleSwiper.container}`}>
            <Swiper
              spaceBetween={11}
              freeMode={true}
              grabCursor={true}
              slidesPerView={"auto"}
              slidesOffsetAfter={40}
            >
              {listItem.map((item, idx) => {
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

export default RettoSwiperItem;
