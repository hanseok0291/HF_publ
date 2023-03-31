//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import stylePay from "../../../styles/coupon_pub/Pay.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";
import styleApply from "../../../styles/coupon_pub/Apply.module.css";
import styleToast from "../../../styles/coupon_pub/Toast.module.css";

// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import ModalTerms from "../../../components/coupon_pub/common/modal/ModalTerms";
import ToastError from "../../../components/coupon_pub/common/toast/ToastError";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  
  return (
    <>
      <Layout>
        <Header
          pageTitle="나에게 선물하기"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <div className={`${stylePay.payWrap} ${stylePay.forMe}`}>
            {/* 닫힌 상태 */}
            <div
              className={`${styleCommon.container} ${styleCommon.textCenter} ${stylePay.msgWrap}`}
            >
              <button
                type="button"
                className={`${stylePay.btnMsg} ${stylePay.btnClose}`}
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                나에게 메시지 쓰기&nbsp;
                <i className={`${styleCommon.iconArrowDownWhite}`}></i>
              </button>
            </div>
            {/* //닫힌 상태 */}
            {/* 열린 상태 */}
            {/* <div
              className={`${styleCommon.container} ${styleCommon.textCenter} ${stylePay.msgWrap}`}
            >
              <div className={`${stylePay.textBox}`}>
                <textarea
                  className={`${stylePay.textArea}`}
                  placeholder="(선택) 나에게 전하고 싶은 메시지를 입력해주세요.
미입력 시 010PAY가 메시지를 대신 작성해 드려요."
                ></textarea>
                <span className={`${stylePay.textCounter}`}>0/100</span>
              </div>
              <button
                type="button"
                className={`${stylePay.btnMsg} ${stylePay.btnOpen}`}
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                메세지 접기&nbsp;
                <i className={`${styleCommon.iconArrowUpOrange}`}></i>
              </button>
            </div> */}
            {/* //열린 상태 */}
          </div>
          <div className={`${stylePay.payInfoWrap}`}>
            <div className={`${styleCommon.container}`}>
              <div>
                <p className={`${stylePay.listTitle}`}>상품 내역</p>

                <div
                  className={`${styleCouponDetail.CouponDetaiSmalllWrap} ${stylePay.CouponDetaiSmalllWrap}`}
                >
                  <div className={styleCouponDetail.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div
                    className={`${styleCouponDetail.infoBox} ${stylePay.infoBox}`}
                  >
                    <p className={styleCouponDetail.infoBrand}>스타벅스</p>
                    <p
                      className={`${styleCouponDetail.infoProduct} ${stylePay.infoProduct}`}
                    >
                      시원하게 함께 세트
                    </p>
                    {/* 가격 */}
                    <div className={`${stylePay.priceBox}`}>
                      <p className={`${stylePay.price}`}>
                        <span>수량</span>
                        <span className={`${stylePay.count}`}>1개</span>
                      </p>
                      <p className={`${stylePay.price}`}>
                        <span>가격</span>
                        <span>
                          <strong>6,300<span className={stylePay.unitText}>원</span></strong>
                        </span>
                      </p>
                    </div>
                    {/* //가격 */}
                  </div>
                </div>
              </div>
              <div>
                <p className={`${stylePay.listTitle}`}>결제 수단</p>
                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.addBorderBottom}`}
                >
                  <div className={`${stylePay.inputInfoBox}`}>
                    <strong>머니 &amp; 포인트</strong>
                    <p>보유 금액 중 포인트부터 자동 사용됩니다.</p>
                  </div>
                </div>
                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.addBorderBottom}`}
                >
                  <div
                    className={`${stylePay.inputInfoBox} ${stylePay.moneyInfoBox}`}
                  >
                    <p className={`${stylePay.left}`}>
                      <span>포인트</span>
                      <span className={`${styleCommon.textGray}`}>
                        &nbsp;(보유 : 1,000원)
                      </span>
                    </p>
                    <p className={`${stylePay.right}`}>1,000<span className={stylePay.unitText}>원</span></p>
                  </div>
                  <div
                    className={`${stylePay.inputInfoBox} ${stylePay.moneyInfoBox}`}
                  >
                    <p className={`${stylePay.left}`}>
                      <span>머니</span>
                      <span className={`${styleCommon.textGray}`}>
                        &nbsp;(보유 : 0원)
                      </span>
                    </p>
                    <p className={`${stylePay.right}`}>0<span className={stylePay.unitText}>원</span></p>
                  </div>
                </div>
                {/* 충전 금액 부족 시 ${stylePay.error} 클래스 추가 */}
                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.addBorderBottom}`}
                >
                  <div className={`${stylePay.inputInfoBox}`}>
                    <strong>머니 충전 결제</strong>
                    <p>부족한 금액은 자동 충전 후 머니로 결제됩니다.</p>
                  </div>
                  {/* 충전 */}
                  <div
                    className={`${stylePay.inputDoubleBox} ${stylePay.inputTop}`}
                  >
                    <div>
                      <span>충전</span>
                    </div>
                    <div
                      className={`${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
                    >
                      <p className={`${stylePay.errorText}`}>
                        <i className={`${styleCommon.iconErrorRed}`}></i>
                        &nbsp;충전 금액 부족
                      </p>
                      <span
                        className={`${stylePay.input} ${stylePay.loadMoney}`}
                      >
                        10,000<span className={stylePay.unitText}>원</span>
                      </span>
                      <i
                        className={`${styleCommon.iconArrow} ${styleCommon.iconArrowRoundDown} ${stylePay.iconArrowRoundDown}`}
                      ></i>
                    </div>
                  </div>
                  {/* //충전 */}
                  <div
                    className={`${stylePay.inputDoubleBox} ${stylePay.inputBottom}`}
                  >
                    <span>사용</span>
                    <div className={stylePay.inputArea}>
                      <input
                        type="text"
                        defaultValue="5,300"
                        className={`${stylePay.input}`}
                        readOnly
                      ></input>
                      <span className={stylePay.unitText}>원</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={stylePay.cardPointWrap}>
                <dl>
                  {/* 약관 동의 전 */}
                  <dt>숨은 내 카드 포인트를 010PAY머니로 전환하세요<i className={styleCommon.iconArrowRight}></i></dt>
                  {/* 약관 동의 후 */}
                  {/* <dt>카드 포인트 <span>(전환 가능 : 50,000원)</span></dt>
                  <dd>전환하기<i className={styleCommon.iconArrowRight}></i></dd> */}
                </dl>
                <div className={stylePay.logoWrap}>
                  <div className={stylePay.logoBox}>
                    <ImgBox/>
                    <ImgBox/>
                  </div>
                </div>
              </div>
              <div>
                <p className={`${stylePay.listTitle} ${stylePay.last}`}>
                  <span>총 결제 금액</span>
                  <span>6,300<span className={stylePay.unitText}>원</span></span>
                </p>
                <ul className={stylePay.bottomList}>
                  <li>위 주문 내용 및 결제조건을 확인하였으며, 결제진행에 동의합니다.</li>
                  <li>사용 가능 쿠폰 보유 시 010PAY 회원을 탈퇴할 수 없습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styleCommon.bottomFixed} ${stylePay.bottomFixed}`}>
          {/* 에러 토스트 */}
          {/* <ToastError /> */}
          {/* //에러 토스트 */}
          {/* 비활성 버튼 */}
          <button className={`${styleCommon.btnGray}`}>결제하기</button>
          {/* //비활성 버튼 */}
          {/* 활성 버튼 */}
          {/* <button>결제하기</button> */}
          {/* //활성 버튼 */}
        </div>
        {/* <ModalTerms /> */}
      </Layout>
    </>
  );
};

const ImgBox = () => {
  return (
    <>
      <img src="../../images/coupon/logo/brand/logo-liiv.png" alt="" />
      <img src="../../images/coupon/logo/brand/logo-top.png" alt="" />
      <img src="../../images/coupon/logo/brand/logo-shinhanplus.png" alt="" />
      <img src="../../images/coupon/logo/brand/logo-hana.png" alt="" />
      <img src="../../images/coupon/logo/brand/logo-Hyundai.png" alt="" />
      <img src="../../images/coupon/logo/brand/logo-lpoint.png" alt="" />
      <img src="../../images/coupon/logo/brand/logo-samsung.png" alt="" />
      <img src="../../images/coupon/logo/brand/logo-woori.png" alt="" />
    </>
  )
}

export default Index;
