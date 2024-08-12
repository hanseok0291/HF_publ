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
import ModalTerms from "../../../components/coupon_pub/common/modal/ModalTerms";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);

  return (
    <>
      <Layout>
        <Header
          pageTitle="구매 완료"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
          subHeader={true}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <div className={`${stylePay.payInfoWrap} ${stylePay.successWrap}`}>
            <div className={`${styleCommon.container}`}>
              <div>
                <p className={`${stylePay.listTitle} ${stylePay.first}`}>
                  상세 내역
                </p>

                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.addBorderBottom}`}
                >
                  <div className={`${stylePay.inputInfoBox}`}>
                    <strong className={`${stylePay.title}`}>보낸 사람</strong>
                    <span>박혜빈</span>
                  </div>
                </div>
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
                    <p
                      className={`${styleCouponDetail.infoBrand} ${stylePay.infoBrand}`}
                    >
                      스타벅스
                    </p>
                    <p
                      className={`${styleCouponDetail.infoProduct} ${stylePay.infoProduct}`}
                    >
                      <span className={`${stylePay.prdName}`}>
                        시원하게 함께 세트
                      </span>
                      <span className={`${stylePay.prdCount}`}>1개</span>를
                      선물하였습니다.
                    </p>
                    {/* 결제실패 메시지 */}
                    {/* <p className={`${stylePay.prdErrorMsg}`}>
	                      지금은 계좌에서 출금할 수 없어요. 잠시 후 다시
	                      시도해주세요.
	                    </p> */}
                    {/* 결제실패 메시지 */}
                  </div>
                </div>
                <div
                  className={`${styleCouponDetail.CouponDetaiSmalllWrap} ${stylePay.CouponDetaiSmalllWrap}`}
                >
                  <div className={`${stylePay.inputBox}`}>
                    <div className={`${stylePay.inputInfoBox}`}>
                      <strong className={`${stylePay.title}`}>받는 사람</strong>
                      <span>이세틀</span>
                    </div>
                    <p>친구에게 선물 소식을 알려드릴까요?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styleCommon.bottomFixed} ${stylePay.bottomFixed}`}>
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

export default Index;
