import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleLimitCoupon from "../../../styles/coupon_pub/LimitCoupon.module.css";

const LimitCoupon = () => {
  return (
    <>
      <div className={styleLimitCoupon.LimitCouponWrap}>
        <div className={`${styleCommon.container}`}>
          <div className={styleLimitCoupon.LimitCouponWrap}>
            <h2 className={styleLimitCoupon.LimitCouponTitle}>
              지금만 이 가격, 선착순 특가
            </h2>
            <button type="button" className={styleLimitCoupon.LimitCouponAddview}>더보기</button>
          </div>
          <ul className={styleLimitCoupon.LimitCouponList}>
            <li className={styleLimitCoupon.LimitCouponItem}>
              <button href={`/coupon_pub/`}>
                <div className={styleLimitCoupon.imgBox}>
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                <div className={styleLimitCoupon.infoBox}>
                  <p className={styleLimitCoupon.infoBrand}>BHC</p>
                  <p className={styleLimitCoupon.infoProduct}>
                    아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                    아이스 카페 라떼 T 아이스 카페 라떼 T
                  </p>
                  <p className={styleLimitCoupon.infoPrice}>25% 할인</p>
                  <p className={styleLimitCoupon.infoBottomText}>
                    <i
                      className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconTimer}`}
                    ></i>
                    <span>3일 04 : 19 : 40</span> 후 마감
                  </p>
                </div>
              </button>
            </li>
            <li className={styleLimitCoupon.LimitCouponItem}>
              <button href={`/coupon_pub/`}>
                <div className={styleLimitCoupon.imgBox}>
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                <div className={styleLimitCoupon.infoBox}>
                  <p className={styleLimitCoupon.infoBrand}>BHC</p>
                  <p className={styleLimitCoupon.infoProduct}>
                    아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                    아이스 카페 라떼 T 아이스 카페 라떼 T
                  </p>
                  <p className={styleLimitCoupon.infoPrice}>
                    25% + 추가 할인 20%
                  </p>
                  <p className={styleLimitCoupon.infoBottomText}>
                    <i
                      className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconStock}`}
                    ></i>
                    남은 수량 <span>12개</span>
                  </p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "15px",
          background: "#f1f1f1",
        }}
      ></div>
    </>
  );
};

export default LimitCoupon;
