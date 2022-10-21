//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//components
import Layout from "../../../components/common/Layout";
import HeaderMypage from "../../../components/coupon_pub/common/HeaderMypage";
import Menu from "../../../components/coupon_pub/mypage/Menu";
import Footer from "../../../components/coupon_pub/common/Footer";

const Index = () => {
  const router = useRouter();
  const wrapRef = useRef();

  return (
    <>
      <HeaderMypage pageTitle="선물함" />
      <Layout>
        <Menu />
        <Footer />
      </Layout>
    </>
  );
};

export default Index;
