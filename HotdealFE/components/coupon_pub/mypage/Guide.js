import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleCommon from "../../../styles/referral/Common.module.css";
import styleGuide from "../../../styles/coupon_pub/Guide.module.css";

const Guide = () => {
  const handleHomeClick = () => {
    handleMainURL(router);
  };

  return (
    <>
      {/* 카테고리 메뉴 */}
      <div className={`${styleGuide.container} ${styleGuide.container}`}>
        <ul className={`${styleGuide.guideList}`}>
          <li>
            <a href={`/coupon/`} className={`${styleCommon.container}`}>
              <span>친구에게 선물한 내역</span>
            </a>
          </li>
          <li>
            <a href={`/coupon/`} className={`${styleCommon.container}`}>
              <span>쿠폰 자동 사용 설정</span>
            </a>
          </li>
        </ul>
        <div className={`${styleGuide.guideList}`}>
          <ul>
            <li>
              <a href={`/coupon/`} className={`${styleCommon.container}`}>
                <span>자주 묻는 질문(FAQ)</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styleGuide.csList}`}>
          <div className={`${styleCommon.container}`}>
            <h3 className={`${styleGuide.csTitle}`}>전화 문의</h3>
            <p className={`${styleGuide.csDesc}`}>
              <span className={`${styleGuide.title}`}>운영시간</span> 평일 09:00
              ~ 18:00(주말 · 공휴일 휴무)
            </p>
            <div className={`${styleGuide.tabWrap}`}>
              <ul className={`${styleGuide.tabList}`}>
                <li>일반쿠폰</li>
                <li className={`${styleGuide.active}`}>PAY쿠폰</li>
              </ul>

              <div
                className={`${styleGuide.tabItem}`}
                style={{ display: "none" }}
              >
                <p className={`${styleGuide.box}`}>
                  <a href="tel:16005220">
                    <span className={`${styleGuide.title}`}>
                      결제 · 취소 문의
                    </span>

                    <span className={`${styleGuide.desc}`}>
                      <img
                        src="../../images/hotdeal/logo-010pay-color.svg"
                        className={`${styleGuide.logo}`}
                        alt="010PAY"
                      ></img>
                      <i className={`${styleCommon.bar} ${styleGuide.bar}`}></i>
                      1600-5220
                    </span>
                  </a>
                </p>
                <p className={`${styleGuide.box}`}>
                  <a href="tel:15886474">
                    <span className={`${styleGuide.title}`}>
                      사용 · 환불 문의
                    </span>
                    <span className={`${styleGuide.desc}`}>
                      <img
                        src="../../images/coupon/logo/brand/kt-alpha.png"
                        className={`${styleGuide.logo}`}
                        alt="KT ALPHA"
                      ></img>
                      <i className={`${styleCommon.bar} ${styleGuide.bar}`}></i>
                      1588-6474
                    </span>
                  </a>
                </p>
              </div>

              <div
                className={`${styleGuide.tabItem}`}
                style={{ display: "block" }}
              >
                <p className={`${styleGuide.box}`}>
                  <a href="tel:16005220">
                    <span className={`${styleGuide.title}`}>
                      결제 · 취소 · 사용 · 환불 문의
                    </span>
                    <span className={`${styleGuide.desc}`}>
                      <img
                        src="../../images/hotdeal/logo-010pay-color.svg"
                        className={`${styleGuide.logo}`}
                        alt="010PAY"
                      ></img>
                      <i className={`${styleCommon.bar} ${styleGuide.bar}`}></i>
                      1600-5220
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;
