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
import ModalRecent from "../../../components/coupon_pub/common/Modal/ModalRecent";

const Index = () => {
  //헤더 아이콘 디폴트 세팅

  return (
    <>
      <Layout>
        <ModalRecent />
      </Layout>
    </>
  );
};

const ImgBox = () => {
  return (
    <>
      <img src="../../../images/coupon/logo/brand/logo-liiv.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-top.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-shinhanplus.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-hana.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-Hyundai.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-lpoint.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-samsung.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-woori.png" alt="" />
    </>
  )
}

export default Index;
