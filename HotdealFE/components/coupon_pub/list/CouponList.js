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
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg"
                      alt="핫딜 TEST"
                    ></img>
                    <span
                      className={`${styleCommon.label} ${styleCouponList.label}`}
                    >
                      한정판매
                    </span>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p
                      className={`${styleCouponList.infoDcPrice} ${styleCouponList.infoDcPriceSmall}`}
                    >
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      <span className={styleCommon.textLine}>8,800원</span>
                    </p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                    <p className={styleCouponList.infoBottomText}>
                      <i
                        className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconTimer}`}
                      ></i>
                      <span>3일 04 : 19 : 40</span> 후 마감
                    </p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/cm/product/BR01421_G00000117373.jpg"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>
                      아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                      아이스 카페 라떼 T 아이스 카페 라떼 T
                    </p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                    <p className={styleCouponList.infoBottomText}>
                      <i
                        className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconCash}`}
                      ></i>
                      사용 시 <span>10원 적립</span>
                    </p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>
                      아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                      아이스 카페 라떼 T 아이스 카페 라떼 T
                    </p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>
                      아이스 카페 라떼 T
                    </p>
                    <p className={styleCouponList.infoDcPrice}>8,800원</p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>
                      아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                      아이스 카페 라떼 T 아이스 카페 라떼 T
                    </p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/cm/product/PB00129_20220923100052926.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>마음</p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <ModalFilter /> */}
    </>
  );
};

export default CouponList;
