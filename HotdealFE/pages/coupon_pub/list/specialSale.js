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
import Navigation from "../../../components/coupon_pub/main/Navigation";
import CouponList from "../../../components/coupon_pub/list/CouponList";
import ModalFilter from "../../../components/coupon_pub/common/modal/ModalFilter";
import TabMenu from "../../../components/coupon_pub/common/TabMenu";
import SaleHeader from "../../../components/coupon_pub/list/SaleHeader";

const priceList = ["전체", "1만원대", "2만원대", "3만원대", "4만원대", "5~9만원대", "10만원 이상"];

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(true);
  const [priceActive, setPriceActive] = useState(0);

  const handlePriceActiveClick = (index) => {
    setPriceActive(index);
  }

  return (
    <>
      <Layout>
        <SaleHeader />
        {/* 카테고리 메뉴 */}
        <h2 className={styleBrandList.specialSaleTitle}>20% 특가</h2>
        <div>
          <a href="#">
            <img src="../../../images/coupon/sample/banner-sale-2.png" alt="" />
          </a>
          <TabMenu tabList={["전체", "1만원대", "2만원대", "3만원대", "4만원대", "5~9만원대", "10만원 이상"]} />
          <CouponList filter1={true}/>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Index;
