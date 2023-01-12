//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../styles/coupon_pub/Common.module.css";
import styleToast from "../../styles/coupon_pub/Toast.module.css";

//components
import Layout from "../../components/common/Layout";
import Header from "../../components/coupon_pub/common/Header";
import Footer from "../../components/coupon_pub/common/Footer";
import Search from "../../components/coupon_pub/main/Search";
import Category from "../../components/coupon_pub/main/Category";
import RollingCoupon from "../../components/coupon_pub/main/RollingCoupon";
import HotBrand from "../../components/coupon_pub/main/HotBrand";
import ReturnPoint from "../../components/coupon_pub/main/ReturnPoint";
import MaybeCoupon from "../../components/coupon_pub/main/MaybeCoupon";
import PopularCoupon from "../../components/coupon_pub/main/PopularCoupon";
import PromotionBanner from "../../components/coupon_pub/main/PromotionBanner";
import LimitCoupon from "../../components/coupon_pub/main/LimitCoupon";
import RewardBanner from "../../components/coupon_pub/main/RewardBanner";
import MainPopup from "../../components/coupon_pub/common/Modal/MainPopup";

const Index = () => {
  const router = useRouter();
  const wrapRef = useRef();

  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(true);
  const [isShowMypageBtn, setShowMypageBtn] = useState(true);
	const [showMainPopup, setShowMainPopup] = useState(true);

  // useEffect(() => {
  // 	if (termsYn === "N") {
  // 		//기프티몰 이용을 위해 동의 팝업
  // 	}
  // }, [termsYn]);

  return (
    <>
      <Layout>
        <Header
          pageTitle="기프티몰"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
          ref={wrapRef}
        >
          {/* 카테고리 메뉴 */}
          <Category />
          <div className={`${styleCommon.containerWrap}`}>
            {/* 자동 롤링 배너 */}
            <RollingCoupon />
            {/* 지금 가장 인기 있어요 */}
            <HotBrand />
            {/* 적립 프로모션 배너 */}
            <RewardBanner />
            {/* 오늘의 혜택 놓치지 마세요 */}
            <ReturnPoint />
            {/* 혹시 이 상품 찾으세요? */}
            <MaybeCoupon
              pageTitle={[
                "혹시 이 상품 찾으세요?",
                <span className="titleEmoticon">🔍</span>,
              ]}
            />
            {/* 프로모션 배너 */}
            <PromotionBanner />
            {/* 지금만 이 가격 선착순 특가 */}
            <LimitCoupon />
            {/* 요즘 잘 나가는 상품 */}
            <PopularCoupon />
          </div>
          <div
            className={`${styleToast.toastPopup} ${styleToast.toastPopup2}`}
            style={{
              bottom: `0`,
							display: `none`
            }}
          >
            <div className={`${styleToast.toastBox}`}>
              <div className={`${styleCommon.container}`}>
                <p className={`${styleToast.toastTitle}`}>
                  나를 위한 선물<span className="titleEmoticon">🎁</span>
                </p>
                <p className={`${styleToast.toastSubTitle}`}>
                  결제할 때 사용해서 저렴하게 구매해 보세요
                  <i className={`${styleCommon.italic}`}>!</i>
                </p>
                <div className={`${styleToast.toastInfoBox}`}>
                  <p className={`${styleToast.title}`}>보유 금액</p>
                  <p className={`${styleToast.money}`}>300,000원</p>
                </div>
              </div>
            </div>
          </div>
					{showMainPopup && (
						<MainPopup
							onClose={() => {
								setShowMainPopup(!showMainPopup);
							}}
						/>
					)}
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Index;
