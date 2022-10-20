//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";

// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import Category from "../../../components/coupon_pub/main/Category";
import CategoryList from "../../../components/coupon_pub/list/CategoryList";
import CouponList from "../../../components/coupon_pub/list/CouponList";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(true);
  const [isShowMypageBtn, setShowMypageBtn] = useState(true);

  return (
    <>
      <Layout>
        <Header
          pageTitle="기프티몰"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          {/* 카테고리 메뉴 */}
          <Category />
          <div className={`${styleCommon.containerWrap}`}>
            {/* 카테고리 리스트 */}
            <CategoryList />
            {/* 카테고리 상품리스트 */}
            <CouponList />
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Index;
