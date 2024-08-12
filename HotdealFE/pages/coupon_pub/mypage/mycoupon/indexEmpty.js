//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../../styles/coupon_pub/DefaultLayout.module.css";

//components
import Layout from "../../../../components/common/Layout";
import HeaderMypage from "../../../../components/coupon_pub/common/HeaderMypage";
import CouponMain from "../../../../components/coupon_pub/mypage/CouponMain";
import CouponListEmpty from "../../../../components/coupon_pub/list/CouponListEmpty";
import MayCoupon from "../../../../components/coupon_pub/search/MayCoupon";
import Menu from "../../../../components/coupon_pub/mypage/Menu";
import Footer from "../../../../components/coupon_pub/common/Footer";

const Index = () => {
  const router = useRouter();
  const wrapRef = useRef();

  return (
    <>
      <Layout>
        <HeaderMypage pageTitle="보유 쿠폰" subHeader={true} />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <CouponMain />

          {/* 카테고리 상품리스트 */}
          {/* 카테고리 상품리스트 */}
          <CouponListEmpty
            pageType="result"
            innerText="사용 가능한 쿠폰이 없어요"
          />
          {/* 이런 상품은 어떠세요? */}
          <MayCoupon />
        </div>
      </Layout>
    </>
  );
};

export default Index;
