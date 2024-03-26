import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleCommon from "../../../styles/referral/Common.module.css";
import styleGuide from "../../../styles/coupon_pub/Guide.module.css";

const Guide = () => {

  return (
    <>
      {/* 카테고리 메뉴 */}
      <div className={`${styleGuide.container} ${styleGuide.container}`}>
        <ul className={`${styleGuide.guideList}`}>
          <li>
            <a href={`/coupon/`} className={`${styleCommon.container}`}>
              <span>구매 내역</span>
            </a>
          </li>
          <li>
            <a href={`/coupon/`} className={`${styleCommon.container}`}>
              <span>자주 묻는 질문(FAQ)</span>
            </a>
          </li>
        </ul>
        <div className={`${styleGuide.csList}`}>
          <div className={`${styleCommon.container}`}>
            <h3 className={`${styleGuide.csTitle}`}>전화 문의</h3>
            <p className={`${styleGuide.csDesc}`}>
              <span className={`${styleGuide.title}`}>운영시간</span> 평일 09:00
              ~ 18:00(주말 · 공휴일 휴무)
            </p>
            <div
              className={`${styleGuide.tabItem}`}
              style={{ display: "block" }}
            >
              <p className={`${styleGuide.box}`}>
                <a href="tel:16005220">
                  <span className={`${styleGuide.title}`}>
                    결제 · 취소 문의
                  </span>
                  <span className={`${styleGuide.desc}`}>
                    1600-5220
                  </span>
                </a>
              </p>
              <p className={`${styleGuide.box}`}>
                <a href="tel:16005220">
                  <span className={`${styleGuide.title}`}>
                    사용 · 환불 문의
                  </span>
                  <span className={`${styleGuide.desc}`}>
                    <span className={`${styleGuide.ktAlpha}`}></span>
                    1588-6474
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;
