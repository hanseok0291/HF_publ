import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";
import styleSlick from "../../../styles/coupon_pub/Slick.module.css";
import styleCategoryList from "../../../styles/coupon_pub/CategoryList.module.css";

import { Grid, Pagination } from "swiper";

const settings = {
  rows: 1,
  slidesPerRow: 5,
  arrows: false,
  dots: true,
  infinite: false,
  centerPadding: "32px",
};

const settings2rows = {
  rows: 2,
  slidesPerRow: 5,
  arrows: false,
  dots: true,
  infinite: false,
  centerPadding: "32px",
};

const CategoryList = () => {
  return (
    <>
      {/* 브랜드 필터 */}
      <div className={styleCategoryList.CategoryListWrap}>
        <div className={`${styleCommon.container}`}>
          <div className={styleCategoryList.CategoryListSlick}>
            <Slider {...settings}>
              <div
                className={`${styleCategoryList.slidewidth} ${styleCategoryList.slidewidthActive}`}
              >
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="../../images/coupon/icon/common/all.png"
                    alt="All"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>전체</p>
              </div>
              <div className={styleCategoryList.slidewidth}>
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/01.png"
                    alt="TEST"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>스타벅스</p>
              </div>
              <div className={styleCategoryList.slidewidth}>
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/01.png"
                    alt="TEST"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>스타벅스</p>
              </div>
              <div className={styleCategoryList.slidewidth}>
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/01.png"
                    alt="TEST"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>
                  스타벅스스타벅스스타벅스스타벅스
                </p>
              </div>
              <div className={styleCategoryList.slidewidth}>
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/01.png"
                    alt="TEST"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>
                  스타벅스스타벅스스타벅스스타벅스
                </p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      {/* //브랜드 필터 */}
    </>
  );
};

export default CategoryList;
