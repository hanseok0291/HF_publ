//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
// import styleCommon from "../../../styles/coupon_pub/Common.module.css";
// import styleFriend from "../../styles/referral/Friend.module.css";//react

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import Category from "../../../components/coupon_pub/main/Category";
// import RollingCoupon from "../../components/coupon_pub/main/RollingCoupon";
// import HotBrand from "../../components/coupon_pub/main/HotBrand";
import ReturnPoint from "../../../components/coupon_pub/main/ReturnPoint";
// import MaybeCoupon from "../../components/coupon_pub/main/MaybeCoupon";
// import PopularCoupon from "../../components/coupon_pub/main/PopularCoupon";
// import PromotionBanner from "../../components/coupon_pub/main/PromotionBanner";
/*
import LimitCoupon from "../../components/coupon_pub/main/LimitCoupon";
 */
import CategoryList from "../../../components/coupon_pub/list/CategoryList";
import ListSwiper from "../../../components/coupon_pub/list/ListSwiper";
import CouponDetail from "../../../components/coupon_pub/detail/CouponDetail";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);
  const [isDeadlinFixed, setDeadlinFixed] = useState(false);

  return (
    <>
      <Layout>
        <Header
          pageTitle="상품 상세"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <CouponDetail isFixedTop={isFixedTop} isDeadlinFixed={isDeadlinFixed} setDeadlinFixed={setDeadlinFixed}/>
        </div>
        <Footer isfixedBottom={isFixedBottom} isDeadlinFixed={isDeadlinFixed}/>
      </Layout>
    </>
  );
};

export default Index;
