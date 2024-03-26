import React from 'react'

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCategoryHeader from "../../../styles/coupon_pub/CategoryHeader.module.css";

const CategoryHeader = () => {
  return (
    <div className={styleCategoryHeader.container}>
      <div className={styleCategoryHeader.wrap}>
        <button
          type="button"
          className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack} ${styleCategoryHeader.btnBack}`}
        >
          뒤로가기
        </button>
        <h1
          className={`${styleCategoryHeader.searchArea}`}
        >
          <input
            type="text"
            placeholder="20% 할인전"
          ></input>
          <button
            type="button"
            className={`${styleCommon.iconSearch} ${styleCategoryHeader.searchBtn}`}
          ></button>
        </h1>
        <div className={styleCategoryHeader.rightBtnWrap}>
          <button
            type="button"
            className={`${styleCommon.icon} ${styleCommon.iconGiftSvg}`}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default CategoryHeader;
