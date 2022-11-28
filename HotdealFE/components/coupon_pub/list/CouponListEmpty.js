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
import styleCategoryList from "../../../styles/coupon_pub/CategoryList.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";

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

const CategoryListWrap = () => {
  return (
    <>
      {/* 브랜드 드롭박스 클릭시 hidden 클래스 제거하여 해당 영역 노출 */}
      <div className={`${styleCategoryList.CategoryListWrap}`}>
        <div className={`${styleCommon.container}`}>
          <div className={styleCategoryList.CategoryListSlick}>
            <Slider {...settings2rows}>
              <div
                className={`${styleCategoryList.slidewidth} ${styleCategoryList.slidewidthActive}`}
              >
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="../../../images/coupon/icon/common/all.png"
                    alt="All"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>전체</p>
              </div>
              <div className={styleCategoryList.slidewidth}>
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/02.png"
                    alt="TEST"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>스타벅스</p>
              </div>
              <div className={styleCategoryList.slidewidth}>
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/02.png"
                    alt="TEST"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>스타벅스</p>
              </div>
              <div className={styleCategoryList.slidewidth}>
                <div className={styleCategoryList.CategoryListImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/02.png"
                    alt="TEST"
                  ></img>
                </div>
                <p className={styleCategoryList.CategoryListName}>스타벅스</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      {/* //브랜드 드롭박스 클릭시 hidden 클래스 제거하여 해당 영역 노출 */}
    </>
  );
};

const CouponListEmpty = ({
  pageType,
  innerText = "관련 상품을 찾지 못했어요.",
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {/* <Theme /> */}
      {/* 상단 fixed 일때 DropBoxOn 클래스 추가 */}
      <div
        className={`${styleCouponList.CouponListWrap} ${styleCouponList.DropBox}`}
      >
        {/* 상단 fixed 일때 fixed 클래스 추가 */}
        <div className={`${styleCategoryList.DropBoxWrap}`}>
          {/* 브랜드 드롭박스 */}
          <div
            className={`${styleCategoryList.CategoryListWrap} ${styleCategoryList.CategoryListWrapClose}`}
          >
            <div
              className={`${styleCommon.container} ${styleCategoryList.container}`}
            >
              {pageType == "result" ? (
                <></>
              ) : (
                <>
                  <button
                    type="button"
                    className={`${styleCommon.btn} ${styleCategoryList.CategoryListName}`}
                    onClick={() => {
                      setVisible(!visible);
                    }}
                  >
                    <i className={`${styleCommon.iconSm}`}>
                      <img
                        src="../../images/coupon/icon/brand/icon-bakery-sm.png"
                        alt="카테고리"
                      ></img>
                    </i>
                    전체
                    <i
                      className={`${styleCommon.iconArrow} ${styleCommon.iconArrowRoundDown}`}
                    ></i>
                  </button>
                  <button
                    type="button"
                    className={`${styleCommon.btn} ${styleCategoryList.CategoryListName} ${styleCategoryList.CategoryListNameRight}`}
                  >
                    <i
                      className={`${styleCommon.iconSort} ${styleCommon.iconSortPopular}`}
                    ></i>
                    인기순
                  </button>
                </>
              )}
            </div>
          </div>
          {/* //브랜드 드롭박스 */}
          {visible && <CategoryListWrap />}
        </div>

        <div className={`${styleCommon.container}`}>
          <div className={`${styleCouponList.containerWrap}`}>
            <ul className={`${styleCouponList.CouponList} ${styleCouponList.CouponListEmpty}`}>
              <li className={styleCouponList.listEmpty}>
                <p>{innerText}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponListEmpty;
