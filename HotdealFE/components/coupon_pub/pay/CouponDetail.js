import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSlick from "../../../styles/coupon_pub/Slick.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";

export default function CouponDetail({ isfixedTop }) {
  return (
    <>
      <div className={`${styleCouponDetail.CouponDetailWrap}`}>
        <div
          className={`${styleCouponDetail.hideWrap} ${styleCouponDetail.show}`}
        >
          <div className={`${styleCommon.container}`}>
            <div className={`${styleCouponDetail.CouponDetaiSmalllWrap}`}>
              <div className={styleCouponDetail.imgBox}>
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              {/* 할인 */}
              {/* <div className={`${styleCouponDetail.infoBox}`}>
                    <p className={styleCouponDetail.infoBrand}>스타벅스</p>
                    <p className={styleCouponDetail.infoProduct}>
                      시원하게 함께 세트
                    </p>
                    <div className={`${styleCouponDetail.priceType1}`}>
                      <p className={styleCouponDetail.infoDcPrice}>9,000원</p>
                      <p className={styleCouponDetail.infoPrice}>
                        <span>25%</span> <strong>6,300원</strong>
                      </p>
                    </div>
                  </div> */}
              {/* //할인 */}
              {/* 추가할인 */}
              <div
                className={`${styleCouponDetail.infoBox} ${styleCouponDetail.priceType2}`}
              >
                <p className={styleCouponDetail.infoBrand}>스타벅스</p>
                <p className={styleCouponDetail.infoProduct}>
                  시원하게 함께 세트
                </p>
                <div className={`${styleCouponDetail.priceType2}`}>
                  <span className={styleCouponDetail.infoDcPrice}>9,000원</span>
                  <span className={styleCouponDetail.infoPrice}>
                    <span>30%</span> <strong>6,300원</strong>
                  </span>
                  <span className={styleCouponDetail.infoPrice}>
                    <span>+추가 10%</span> <strong>5,670원</strong>
                  </span>
                </div>
              </div>
              {/* 추가할인 */}
              {/* 할인없음 */}
              {/* <div
                    className={`${styleCouponDetail.infoBox} ${styleCouponDetail.priceType3}`}
                  >
                    <p className={styleCouponDetail.infoBrand}>
                      스타벅스 스몰영역
                    </p>
                    <p className={styleCouponDetail.infoProduct}>
                      시원하게 함께 세트
                    </p>
                    <div className={`${styleCouponDetail.priceType3}`}>
                      <p className={styleCouponDetail.infoPrice}>
                        <strong>6,300원</strong>
                      </p>
                    </div>
                  </div> */}
              {/* 할인없음 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
