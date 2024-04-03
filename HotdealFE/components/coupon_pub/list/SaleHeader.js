import React from 'react'

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSaleHeader from "../../../styles/coupon_pub/SaleHeader.module.css";

const SaleHeader = () => {
  return (
    <div className={styleSaleHeader.container}>
      <div className={styleSaleHeader.wrap}>
        <button
          type="button"
          className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack} ${styleSaleHeader.btnBack}`}
        >
          뒤로가기
        </button>
        <h1
          className={`${styleSaleHeader.searchArea}`}
        >
          <input
            type="text"
            placeholder="20% 할인전"
          ></input>
          <button
            type="button"
            className={`${styleCommon.iconSearch} ${styleSaleHeader.searchBtn}`}
          ></button>
        </h1>
        <div className={styleSaleHeader.rightBtnWrap}>
          <button
            type="button"
            className={`${styleCommon.icon} ${styleCommon.iconGiftSvg}`}
          ></button>
        </div>
      </div>
    </div>
  )
}

export default SaleHeader;
