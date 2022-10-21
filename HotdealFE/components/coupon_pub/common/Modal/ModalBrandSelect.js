import { useState } from "react";

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

import Brand from "../../../../components/coupon_pub/list/Brand";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/coupon_pub/Filter.module.css";
import styleCategoryList from "../../../../styles/coupon_pub/CategoryList.module.css";
import styleBrandList from "../../../../styles/coupon_pub/BrandList.module.css";

import { Grid, Pagination } from "swiper";

const settings = {
  rows: 1,
  slidesPerRow: 4,
  arrows: false,
  dots: true,
  infinite: false,
  centerPadding: "32px",
};

const settings2rows = {
  rows: 2,
  slidesPerRow: 4,
  arrows: false,
  dots: true,
  infinite: false,
  centerPadding: "32px",
};

const ModalBrandSelect = ({ show, onClose }) => {
  return (
    <div
      className={`${styleModal.modalFullpage} ${styleModal.modalInfo} ${styleModal.open} ${styleModal.modalBrandSelect}`}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog}`}
        style={{ bottom: "0" }}
      >
        <div className={`${styleModal.modalContent}`}>
          <div className={`${styleModal.modalHeader}`}>
            <h3
              className={`${styleModal.modalTitle} ${styleFilter.modalTitle}`}
            >
              브랜드 선택
            </h3>
            <button
              type="button"
              className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
            >
              닫기
            </button>
          </div>
          <div className={`${styleModal.modalBody} ${styleFilter.modalBody}`}>
            {/* Brand 리스트 */}
            <Brand />
            {/* Brand 리스트 */}
            <Brand />
            {/* Brand 리스트 */}
            <Brand />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBrandSelect;
