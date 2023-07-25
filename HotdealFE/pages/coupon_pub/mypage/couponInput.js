//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleGiftCoupon from "../../../styles/coupon_pub/GiftCoupon.module.css";

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import GiftCoupon from "../../../components/coupon_pub/mypage/GiftCoupon";
import ModalAlert from "../../../components/coupon_pub/common/Modal/ModalAlert";
import PromotionCoupon from "../../../components/coupon_pub/mypage/PromotionCoupon";
import BuyTab from "../../../components/coupon_pub/mypage/BuyTab";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);

  return (
    <>
      <div className={styleGiftCoupon.wrap}>
        <Header
          pageTitle="쿠폰 코드 등록"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.wrap} ${styleGiftCoupon.conWrap}`}
        >
          {/* <BuyTab tabItem={["선물받은 쿠폰", "프로모션 쿠폰"]}/> */}
          <GiftCoupon /> 선물받은 쿠폰
          {/* <PromotionCoupon /> 프로모션 쿠폰 */}
        </div>
      </div>
    </>
  );
};

export default Index;
