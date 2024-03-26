//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
// import styleFriend from "../../styles/referral/Friend.module.css";//react

//css
// //components
import Layout from "../../../../components/common/Layout";
import Header from "../../../../components/coupon_pub/common/Header";
import Footer from "../../../../components/coupon_pub/common/Footer";
// import Search from "../../components/coupon_pub/main/Search";
import Category from "../../../../components/coupon_pub/main/Category";
// import RollingCoupon from "../../components/coupon_pub/main/RollingCoupon";
// import HotBrand from "../../components/coupon_pub/main/HotBrand";
import ReturnPoint from "../../../../components/coupon_pub/main/ReturnPoint";
// import MaybeCoupon from "../../components/coupon_pub/main/MaybeCoupon";
// import PopularCoupon from "../../components/coupon_pub/main/PopularCoupon";
// import PromotionBanner from "../../components/coupon_pub/main/PromotionBanner";
/*
import LimitCoupon from "../../components/coupon_pub/main/LimitCoupon";
 */
import CategoryList from "../../../../components/coupon_pub/list/CategoryList";
import ListSwiper from "../../../../components/coupon_pub/list/ListSwiper";
import CouponDetail from "../../../../components/coupon_pub/mypage/CouponDetail";
import CouponDetailUsed from "../../../../components/coupon_pub/mypage/CouponDetailUsed";
import CouponDetailPay from "../../../../components/coupon_pub/mypage/CouponDetailPay";
import CouponDetailPayUsed from "../../../../components/coupon_pub/mypage/CouponDetailPayUsed";
import ModalAvailable from "../../../../components/coupon_pub/common/Modal/ModalAvailable";
import ModalMessage from "../../../../components/coupon_pub/common/Modal/ModalMessage";
import ModalAlert from "../../../../components/coupon_pub/common/Modal/ModalAlert";
import ModalCancle from "../../../../components/coupon_pub/common/Modal/ModalCancle";
import ModalCancleConfirm from "../../../../components/coupon_pub/common/Modal/ModalCancleConfirm";
import ModalCancleInfo from "../../../../components/coupon_pub/common/Modal/ModalCancleInfo";
import ModalCancleEnd from "../../../../components/coupon_pub/common/Modal/ModalCancleEnd";
import ModalRefundKt from "../../../../components/coupon_pub/common/Modal/ModalRefundKt";
import ModalRefund from "../../../../components/coupon_pub/common/Modal/ModalRefund";
import ModalExtensionInfo from "../../../../components/coupon_pub/common/Modal/ModalExtensionInfo";
import ModalExtensionInfoEnd from "../../../../components/coupon_pub/common/Modal/ModalExtensionInfoEnd";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);

  return (
    <>
      <Layout>
        <Header
          pageTitle="상세 내역"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          {/* 보유 쿠폰 사용 가능 */}
          <CouponDetailPay isfixedTop={isFixedTop} />
          {/* 보유 쿠폰 사용 완료 */}
          {/* <CouponDetailUsed isfixedTop={isFixedTop} /> */}
          {/* 사용 가능  */}
          {/* <CouponDetailPay isfixedTop={isFixedTop} /> */}
          {/* <CouponDetailPayUsed isfixedTop={isFixedTop} /> */}
        </div>
        {/* 사용가능처 토스트 */}
        {/* <ModalAvailable /> */}
        {/* 메시지 팝업 */}
        {/* <ModalMessage /> */}
        {/* 취소 팝업 */}
        {/* <ModalCancle /> */}
        {/* 결체 취소 안내 팝업 */}
        {/* <ModalCancleInfo /> */}
        {/* 결제 취소 확인 팝업 */}
        {/* <ModalCancleConfirm /> */}
        {/* 취소 완료 팝업 */}
        {/* <ModalCancleEnd /> */}
        {/* KT 환불 안내 팝업 */}
        {/* <ModalRefundKt /> */}
        {/* 환불 안내 팝업 */}
        {/* <ModalRefund /> */}
        {/* 유효기간 연장 안내 팝업 */}
        {/* <ModalExtensionInfo /> */}
        {/* 유효기간 연장 팝업 */}
        {/* <ModalExtensionInfoEnd /> */}
        {/* <Footer isfixedBottom={isFixedBottom} /> */}
      </Layout>
    </>
  );
};

export default Index;
