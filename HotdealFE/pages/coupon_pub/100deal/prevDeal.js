//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleHundredDeal from "../../../styles/coupon_pub/HundredDeal.module.css";

// //components
import Layout from "../../../components/common/Layout";

const Index = () => {

  return (
    <>
      <Layout>
        <div className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader} ${styleHundredDeal.prevDealHeader}`}>
          <div className={`${styleDefaultLayout.container} ${styleCommon.pageHeader}`}>
            <h1 className={`${styleDefaultLayout.pageTitle} ${styleDefaultLayout.pageTitleMain}`}></h1>
            <button  type="button" className={`${styleCommon.btnIcon} ${styleCommon.btnClose} ${styleHundredDeal.btnClose}`}>닫기</button>
          </div>
        </div>
        <div className={`${styleHundredDeal.hundredDeal} ${styleHundredDeal.prevDeal}`}>
          <div className={`${styleHundredDeal.borderContent} ${styleHundredDeal.restContent}`}>
            <div>
              <h4>
              다양한 인기 상품이 <br />
                <strong>지난 딜에 등장했어요<i>!</i></strong>
              </h4>
              <div className={styleHundredDeal.dealContentBox}>
                <p className={styleHundredDeal.dealDate}><span className={styleHundredDeal.before}></span>05. 26 금<span className={styleHundredDeal.after}></span></p>
                <ul className={styleHundredDeal.listWrap}>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <span className={styleHundredDeal.people}>50명</span>
                      <p className={styleHundredDeal.product}>메가박스 2인 관람권 팝콘 세트</p>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-01.png" alt="메가박스 2인 관람권 팝콘 세트" />
                    </div>
                  </li>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <span className={styleHundredDeal.people}>50명</span>
                      <p className={styleHundredDeal.product}>CU편의점 모바일 상품권 1만원권</p>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-03.png" alt="CU편의점 모바일 상품권 1만원권" />
                    </div>
                  </li>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <span className={styleHundredDeal.people}>50명</span>
                      <p className={styleHundredDeal.product}>해피머니 상품권 1만원권</p>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-04.png" alt="해피머니 상품권 1만원권" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styleHundredDeal.dealContentBox}>
                <p className={styleHundredDeal.dealDate}><span className={styleHundredDeal.before}></span>05. 22 월<span className={styleHundredDeal.after}></span></p>
                <ul className={styleHundredDeal.listWrap}>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <span className={styleHundredDeal.people}>50명</span>
                      <p className={styleHundredDeal.product}>이디야 커피 달고나 라떼</p>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-05.png" alt="이디야 커피 달고나 라떼" />
                    </div>
                  </li>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <span className={styleHundredDeal.people}>50명</span>
                      <p className={styleHundredDeal.product}>올리브영 모바일 상품권 3만원권</p>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-06.png" alt="올리브영 모바일 상품권 3만원권" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styleHundredDeal.dealContentBox}>
                <p className={styleHundredDeal.dealDate}><span className={styleHundredDeal.before}></span>05. 24 수<span className={styleHundredDeal.after}></span></p>
                <ul className={styleHundredDeal.listWrap}>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <span className={styleHundredDeal.people}>50명</span>
                      <p className={styleHundredDeal.product}>버거킹 통새우 와퍼 세트</p>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-07.png" alt="버거킹 통새우 와퍼 세트" />
                    </div>
                  </li>
                </ul>
              </div>
              <p className={styleHundredDeal.botInfoText}>직전 3회차의 딜만 표시됩니다.</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
