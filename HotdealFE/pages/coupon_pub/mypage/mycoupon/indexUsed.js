//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../../styles/coupon_pub/DefaultLayout.module.css";

//components
import Layout from "../../../../components/common/Layout";
import HeaderMypage from "../../../../components/coupon_pub/common/HeaderMypage";
import CouponMainUsed from "../../../../components/coupon_pub/mypage/CouponMainUsed";
import CouponList from "../../../../components/coupon_pub/mypage/CouponList";
import CouponListUsed from "../../../../components/coupon_pub/mypage/CouponListUsed";
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
          <CouponMainUsed />

          <div style={{ paddingTop: "80px" }}>
            {/* 카테고리 상품리스트 */}
            <CouponListUsed pageType="result" />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
