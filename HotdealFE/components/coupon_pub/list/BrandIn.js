import { useEffect, useState } from "react";

// components
import ModalBrandSelect from "../common/modal/ModalBrandSelect";


// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

//slick

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCategoryList from "../../../styles/coupon_pub/CategoryList.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";
import CouponList from "./CouponList";

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

const BrandIn = ({priceList}) => {
  const [visible, setVisible] = useState(false);
  const [priceActive, setPriceActive] = useState(0);

  const handlePriceActiveClick = (index) => {
    setPriceActive(index);
  }

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
        <ul className={styleBrandList.priceListWrap}>
            {priceList.map((price, index) => (
              <li key={index}>
              <button type="button" className={priceActive === index && styleBrandList.active} onClick={() => handlePriceActiveClick(index)}>
                {price}
              </button>
            </li>
            ))}
          </ul>
      </div>

      <div
        className={`${styleCouponList.CouponListWrap} ${styleCouponList.DropBox}}`}
      >
          <CouponList filter1={true}/>
      </div>
    </>
  );
};

export default BrandIn;
