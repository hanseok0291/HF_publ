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


const listItem = [
  {
    labelType1: true,
    labelType2: false,
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트",
    infoPrice: "10,000",
    infoDcPrice: "7,500",
    infoDcPercent: "25%",
    addInfo1: true,
    addInfo2: true,
    addInfo3: true,
    addInfo4: true,
    addInfo5: true,
    addInfo6: true,
    addInfo7: true,
    addInfo8: true,
    addInfo9: true,
    soldOut1: true,
  },
  {
    labelType1: true,
    labelType2: false,
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트 따뜻한 카페라떼",
    infoPrice: "10,000",
    infoDcPrice: "7,500",
    infoDcPercent: "25%",
    addInfo1: true,
    addInfo2: true,
    soldOut2: true,
  },
  {
    labelType1: false,
    labelType2: false,
    infoImg: "https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트",
    infoDcPrice: "6,300",
    addInfo1: false,
    addInfo2: false,
  },
  {
    labelType1: false,
    labelType2: true,
    infoImg: "https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트 시원하 함께 세트",
    infoDcPrice: "6,300",
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
    infoPrice: "10,000",
    infoDcPrice: "6,300",
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
    infoPrice: "10,000",
    infoDcPrice: "6,300",
    addInfo1: false,
    addInfo2: false,
  },
];

// filter1 인기순 filter2 정렬 유형
const CouponList = ({filter1, filter2, setIsFilter1, setIsFilter2}) => {
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
              {filter1 && 
                <button
                  type="button"
                  className={`${styleCommon.btn} ${styleCategoryList.CategoryListName}`}
                  onClick={() => setIsFilter2(true)}
                >
                  인기순
                  <i
                    className={`${styleCommon.iconArrow} ${styleCommon.iconFilter}`}
                  ></i>
                </button>}

              {filter2 && 
                <button
                type="button"
                className={`${styleCommon.btn} ${styleCategoryList.CategoryListName}`}// 유형 체크 시 on class 추가
                  onClick={() => setIsFilter1(true)}
                >
                  할인 유형
                  <i
                    className={`${styleCommon.iconFilter} ${styleCategoryList.iconFilter}`}
                  ></i>
                </button>}
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
      {/* <ModalFilter title="할인 유형" list={["전체", "기본", "추가", "기간 한정", "선물 한정"]} /> */}
      {/* <ModalFilter title="정렬 기준" list={["인기순", "할인율순", "낮은 가격순", "높은 가격순"]} /> */}
    </>
  );
};

export default CouponList;
