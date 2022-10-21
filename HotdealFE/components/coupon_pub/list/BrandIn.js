import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import ModalBrandSelect from "../common/modal/ModalBrandSelect";

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

const BrandIn = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className={`${styleCouponList.brandInWrap}`}>
        <div
          className={`${styleCouponList.CouponListWrap} ${styleCouponList.DropBox} ${styleCouponList.brandInBox}`}
        >
          <img
            src="../../../images/coupon/icon/brand/starbucks.png"
            alt="카테고리"
            className={`${styleCouponList.brandInBg}`}
          ></img>
          <button
            type="button"
            className={`${styleCommon.btn} ${styleCategoryList.CategoryListName}`}
            onClick={() => {
              setVisible(!visible);
            }}
          >
            <i className={`${styleCommon.iconSm} ${styleCouponList.brandLogo}`}>
              <img
                src="../../../images/coupon/icon/brand/starbucks.png"
                alt="카테고리"
              ></img>
            </i>
            <p className={`${styleCouponList.nameBox}`}>
              <span>스타벅스</span>
              <i
                className={`${styleCommon.iconArrow} ${styleCommon.iconArrowRoundDown}`}
              ></i>
            </p>
          </button>
        </div>

        {/* 상단 fixed, 노출될때 ${styleCouponList.show} ${styleCategoryList.fixed} 클래스 추가 */}
        <div
          className={`${styleCategoryList.DropBoxWrap} ${styleCouponList.DropBoxWrap} ${styleCouponList.show} ${styleCategoryList.fixed}`}
        >
          {/* 브랜드 드롭박스 */}
          <div
            className={`${styleCategoryList.CategoryListWrap} ${styleCategoryList.CategoryListWrapClose}`}
          >
            <div
              className={`${styleCommon.container} ${styleCategoryList.container}`}
            >
              <button
                type="button"
                className={`${styleCommon.btn} ${styleCategoryList.CategoryListName}`}
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                <p className={`${styleCouponList.nameBox}`}>
                  <span>스타벅스</span>
                  <i
                    className={`${styleCommon.iconArrow} ${styleCommon.iconArrowRoundDown}`}
                  ></i>
                </p>
              </button>
            </div>
          </div>
          {/* //브랜드 드롭박스 */}

          {visible && <ModalBrandSelect />}
        </div>

        {visible && (
          <div className={`${styleCouponList.brandAllListWrap}`}>
            <ModalBrandSelect />
          </div>
        )}
      </div>

      <div
        className={`${styleCouponList.CouponListWrap} ${styleCouponList.DropBox} ${styleCouponList.brandInDropBox}`}
      >
        <div className={`${styleCommon.container}`}>
          <div className={`${styleCouponList.containerWrap}`}>
            <ul className={`${styleCouponList.CouponList}`}>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
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
            </ul>
          </div>
        </div>
      </div>
      {/* <ModalFilter /> */}
    </>
  );
};

export default BrandIn;
