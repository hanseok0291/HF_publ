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
import ModalHundredArrival from "../../../components/coupon_pub/common/Modal/ModalHundredArrival";

const Index = () => {
  //헤더 아이콘 디폴트 세팅

  return (
    <>
      <Layout>
        <ModalHundredArrival type3 />
      </Layout>
    </>
  );
};

export default Index;
