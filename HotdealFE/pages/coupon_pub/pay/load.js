//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import stylePay from "../../../styles/coupon_pub/Pay.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";
import styleApply from ".././../../styles/coupon_pub/Apply.module.css";

// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import ModalSelectAccount from "../../../components/coupon_pub/common/Modal/ModalSelectAccount";
import ModalSuccess from "../../../components/coupon_pub/common/Modal/ModalSuccess";
import ModalFaild from "../../../components/coupon_pub/common/Modal/ModalFaild";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isShowCloseBtn, setShowCloseBtn] = useState(true);

  return (
    <>
      <Layout>
        <Header
          pageTitle="충전"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
          isShowCloseBtn={isShowCloseBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap} ${stylePay.payInfoContent}`}
        >
          <div className={`${stylePay.payInfoWrap} ${stylePay.load} `}>
            <div className={`${styleCommon.container}`}>
              <div>
                <div className={`${stylePay.inputBox} ${stylePay.accountBox}`}>
                  <div className={`${stylePay.inputInfoBox}`}>
                    <div>
                      <strong className={`${stylePay.title}`}>계좌 설정</strong>
                      <p className={`${stylePay.subTitle}`}>
                        010PAY에 등록된 계좌로만 충전할 수 있습니다.
                      </p>
                    </div>
                  </div>
                  <div className={`${stylePay.loadBtnBox}`}>
                    {/* 계좌 없음 */}
                    <button
                      type="button"
                      className={`${stylePay.btn} ${stylePay.btnAdd}`}
                      style={{ display: "none" }}
                    >
                      <i
                        className={`${styleCommon.icon} ${styleCommon.iconBtnAdd}`}
                      ></i>
                      계좌 추가하기
                    </button>
                    {/* //계좌 없음 */}

                    {/* 계좌 있음 */}
                    <button
                      type="button"
                      className={`${styleCommon.btnSelect} ${stylePay.btnOption} ${stylePay.btnSelect}`}
                    >
                      <img
                        src="../../../images/coupon/logo/brand/bank1.png"
                        alt="우리은행"
                      ></img>
                      우리 123
                      <span className={`${stylePay.label}`}>대표 계좌</span>
                    </button>
                    {/* //계좌 있음 */}
                  </div>
                </div>
                <div className={`${stylePay.inputBox}`}>
                  <div className={`${stylePay.inputInfoBox}`}>
                    <p className={`${stylePay.title}`}>
                      <strong>금액 설정</strong>
                    </p>
                  </div>
                  {/* input 포커스 되면 ${stylePay.focus} 클래스 추가 */}
                  <div className={`${stylePay.inputLoadBox} ${stylePay.focus}`}>
                    <p className={`${stylePay.floatText}`}>충전 금액</p>
                    {/* <p className={`${stylePay.floatText} ${stylePay.error}`}>
                      18만원까지만 충전할 수 있습니다.
                    </p> */}
                    <p
                      className={`${stylePay.placeholderText} ${stylePay.show}`}
                    >
                      만원 단위 입력
                    </p>
                    <input
                      type="tel"
                      placeholder=""
                      className={`${stylePay.input} ${stylePay.inputLoad}`}
                    ></input>
                    <button
                      type="button"
                      className={`${styleCommon.btnIcon} ${styleCommon.btnDel} ${stylePay.btnDel}`}
                    ></button>
                  </div>
                  <p className={stylePay.addText}>19세 미만의 경우 보유한도 최대 50만원까지 가능합니다.</p>
                  <p className={`${stylePay.loadOptionBox}`}>
                    <button type="button" className={`${stylePay.btn}`}>
                      + 1만원
                    </button>
                    <button type="button" className={`${stylePay.btn}`}>
                      + 5만원
                    </button>
                    <button type="button" className={`${stylePay.btn}`}>
                      + 10만원
                    </button>
                    <button type="button" className={`${stylePay.btn}`}>
                      + 50만원
                    </button>
                  </p>
									<div className={`${stylePay.moneyHoldBox}`}>
									<p>보유 머니: <span>1,000,000</span>원 (리또 머니함 포함)</p> 
									</div>
									<div className={`${stylePay.moneyLoadBox}`}>
									<i className={`${styleCommon.icon} ${styleCommon.iconRetto}`}></i>
									<p>충전 가능 금액</p> <strong><span className={`${stylePay.boldText}`}>500,000</span>원</strong>
									</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styleCommon.btnBox} ${styleCommon.btnDetail}`}>
          <div className={`${styleCommon.container}`}>
            <button className={`${styleCommon.btn} ${styleCommon.btnGray}`}>
              확인
            </button>
          </div>
        </div>
        {/* 계좌설정 토스트 */}
        {/* <ModalSelectAccount /> */}
        {/* 구매 완료 */}
        {/* <ModalSuccess /> */}
        {/* 구매 실패 */}
        {/* <ModalFaild /> */}
      </Layout>
    </>
  );
};

export default Index;
