// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";
import CouponListItem from "../list/CouponListItem";

function InteresItem(props) {
  const listItem = [
    {
      labelType1: true,
      labelType2: false,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/BR00007_G00000117178.jpg",
      infoBrand: "스타벅스",
      infoProduct: "따뜻한 카페라떼 커플세트",
      infoPrice: "10,000",
      infoDcPercent: "25%",
      infoDcPrice: "7,500",
      infoBox1: false,
      infoBox2: false,
    },
    {
      labelType1: false,
      labelType2: false,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006153424285.jpg",
      infoBrand: "스타벅스",
      infoProduct: "따뜻한 카페라떼 커플세트 따뜻한 카페라떼",
      infoPrice: "10,000",
      infoDcPercent: "25%",
      infoDcPrice: "7,500",
      infoBox1: false,
      infoBox2: false,
    },
    {
      labelType1: false,
      labelType2: true,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg",
      infoBrand: "스타벅스",
      infoProduct: "시원하게 함께 세트",
      infoDcPrice: "6,300",
      infoBox1: false,
      infoBox2: false,
    },
    {
      labelType1: false,
      labelType2: false,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png",
      infoBrand: "스타벅스",
      infoProduct: "시원하게 함께 세트 시원하 함께 세트",
      infoDcPrice: "6,300",
      infoBox1: false,
      infoBox2: false,
    },
  ];

  return (
    <>
			<div
					className={props.moreBtnShow ? `${styleSwiper.SwiperWrap} ${styleBrandList.SwiperWrap}` : `${styleSwiper.SwiperWrap} ${styleSwiper.paddingBottomOn} ${styleSwiper.hundredDeal}`}
					style={{ backgroundColor: props.bgColor }}
				>
        <div>
          <h2
            className={`${styleCommon.container} ${styleSwiper.SwiperTitle}`}
            style={{ fontSize: props.fontSize }}
          >
            응모한 분들이 <em>관심 있어 해요</em> <span>👀</span>
          </h2>
          <div className={`${styleCommon.container} ${styleSwiper.container}`}>
            <Swiper
              spaceBetween={10}
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

          {props.moreBtnShow == "true" ? (
            <div className={`${styleCommon.container}`}>
              <button
                href={`/coupon_pub/`}
                className={`${styleCommon.btn} ${styleCommon.container} ${styleSwiper.SwiperLink}`}
              >
                 <span>5개</span> 상품 더보기{" "}
                <i
                  className={`${styleCommon.iconArrow} ${styleCommon.iconArrowRight}`}
                ></i>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default InteresItem;
