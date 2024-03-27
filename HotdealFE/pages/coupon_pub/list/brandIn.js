//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSearch from "../../../styles/coupon_pub/Search.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";


// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import Category from "../../../components/coupon_pub/main/Category";
import BrandIn from "../../../components/coupon_pub/list/BrandIn";
import CouponList from "../../../components/coupon_pub/list/CouponList";
import TabMenu from "../../../components/coupon_pub/common/TabMenu";
import CategoryHeader from "../../../components/coupon_pub/list/CategoryHeader";
import BrandHeader from "../../../components/coupon_pub/list/BrandHeader";

const categoryList = [
  {
    src: '../../../images/coupon/sample/icon-main-category-5.png',
    name: 'PAY쿠폰'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-6.png',
    name: '상품권'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-7.png',
    name: '편의점·마트'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-8.png',
    name: '카페·베이커리'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-9.png',
    name: '아이스크림'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-10.png',
    name: '패스트푸드'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-11.png',
    name: '외식'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-12.png',
    name: '문화생활'
  }
]

const brandList = [
  {
    src: "../../../images/coupon/brand/logo-brand-small-1.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-1.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-1.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
];

const priceList = ["전체", "1만원대", "2만원대", "3만원대", "4만원대", "5~9만원대", "10만원 이상"];

const Index = () => {

  return (
    <>
      <Layout>
        {/* <CategoryHeader /> */}
        <BrandHeader />
        <div
          className={`${styleDefaultLayout.wrap}`}
        >
          {/* <TabMenu onFixed={true} fixedPos={150} tabList={["전체", "1만원대", "2만원대", "3만원대", "4만원대", "5~9만원대", "10만원 이상"]} bgColor={true} /> */}
          <CouponList filter1={true}/>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Index;
