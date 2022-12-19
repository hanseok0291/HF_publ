import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import Theme from "./Theme";
import ModalFilter from "../common/modal/ModalFilter";

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
import CouponListItem from "./CouponListItem";

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
                    src="../../images/coupon/icon/common/all.png"
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
            </Slider>
          </div>
        </div>
      </div>
      {/* //브랜드 드롭박스 클릭시 hidden 클래스 제거하여 해당 영역 노출 */}
    </>
  );
};

const CouponList = (props) => {
  const [visible, setVisible] = useState(false);

  const listItem = [
    {
      labelType1: true,
      labelType2: false,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg",
      infoBrand: "스타벅스",
      infoProduct: "따뜻한 카페라떼 커플세트",
      infoPrice: "10,000원",
      infoDcPrice: "7,500원",
      infoDcPercent: "25%",
      addInfo1: true,
      addInfo2: true,
    },
    {
      labelType1: true,
      labelType2: false,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png",
      infoBrand: "스타벅스",
      infoProduct: "따뜻한 카페라떼 커플세트 따뜻한 카페라떼",
      infoPrice: "10,000원",
      infoDcPrice: "7,500원",
      infoDcPercent: "25%",
      addInfo1: true,
      addInfo2: true,
    },
    {
      labelType1: false,
      labelType2: false,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png",
      infoBrand: "스타벅스",
      infoProduct: "시원하게 함께 세트",
      infoDcPrice: "6,300원",
      addInfo1: false,
      addInfo2: false,
    },
    {
      labelType1: false,
      labelType2: true,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png",
      infoBrand: "스타벅스",
      infoProduct: "시원하게 함께 세트 시원하 함께 세트",
      infoDcPrice: "6,300원",
      addInfo1: false,
      addInfo2: false,
    },
    {
      labelType1: false,
      labelType2: false,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00129_20220923100052926.png",
      infoBrand: "스타벅스",
      infoProduct: "따뜻한 카페라떼 커플세트",
      infoDcPercent: "25%",
      infoPrice: "10,000원",
      infoDcPrice: "6,300원",
      addInfo1: false,
      addInfo2: false,
    },
    {
      labelType1: false,
      labelType2: false,
      infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00129_20220923100052926.png",
      infoBrand: "스타벅스",
      infoProduct: "따뜻한 카페라떼 커플세트 따뜻한 카페라떼 커플세트",
      infoDcPercent: "25%",
      infoPrice: "10,000원",
      infoDcPrice: "6,300원",
      addInfo1: false,
      addInfo2: false,
    },
  ];

  return (
    <>
      {/* <Theme /> */}
      {/* 브랜드필터 상단 고정일때 DropBoxOn 클래스 추가, 자식 DropBoxWrap 클래스에 fixed 클래스 추가 */}
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
              {props.pageType == "result" ? (
                <>
                  <p
                    className={`${styleCommon.btn} ${styleCategoryList.CategoryListName}`}
                  >
                    <span className={`${styleCategoryList.searchText}`}>
                      에이드
                    </span>
                    &nbsp;검색 결과 4건
                  </p>
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
            <ul className={`${styleCouponList.CouponList}`}>
              {listItem.map((item, idx) => {
                return (
                  <li className={`${styleCouponList.CouponItem}`} key={idx}><CouponListItem listItem={item}/></li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* <ModalFilter /> */}
    </>
  );
};

export default CouponList;
