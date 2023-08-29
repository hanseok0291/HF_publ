import React from 'react'

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSearch from "../../../styles/coupon_pub/Search.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";

const BrandHeader = () => {
  return (
    <div
          className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader} ${styleSearch.pageHeader} ${styleBrandList.header}`}
        >
          <div className={`${styleDefaultLayout.container}`}>
            <button
              type="button"
              className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
            >
              뒤로가기
            </button>
            <h1
              className={`${styleBrandList.searchArea}`}
            >
              <input
                type="text"
                placeholder="20% 할인전"
              ></input>
              <button
                type="button"
                className={`${styleCommon.iconSearch} ${styleBrandList.searchBtn}`}
              ></button>
            </h1>
            <button
                type="button"
                className={`${styleCommon.icon} ${styleCommon.iconGiftSvg} ${styleBrandList.giftBtn}`}
              ></button>
          </div>
        </div>
  )
}

export default BrandHeader;
