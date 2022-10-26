//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../../styles/coupon_pub/DefaultLayout.module.css";

//components
import Layout from "../../../../components/common/Layout";
import HeaderMypage from "../../../../components/coupon_pub/common/HeaderMypage";
import CouponMain from "../../../../components/coupon_pub/mypage/CouponMain";
import CouponList from "../../../../components/coupon_pub/mypage/CouponList";
import Menu from "../../../../components/coupon_pub/mypage/Menu";
import Footer from "../../../../components/coupon_pub/common/Footer";

const Index = () => {
  const router = useRouter();
  const wrapRef = useRef();

  return (
    <>
      <Layout>
        <HeaderMypage pageTitle="보유 쿠폰" />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <CouponMain />

          <div style={{ marginBottom: "20px" }}>
            {/* 카테고리 상품리스트 */}
            <CouponList pageType="result" />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
