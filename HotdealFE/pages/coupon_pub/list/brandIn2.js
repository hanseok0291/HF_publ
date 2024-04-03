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
import BrandIn from "../../../components/coupon_pub/list/BrandIn";
import CategoryHeader from "../../../components/coupon_pub/list/CategoryHeader";

const priceList = ["전체", "1만원대", "2만원대", "3만원대", "4만원대", "5~9만원대", "10만원 이상"];

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(true);
  const [isShowMypageBtn, setShowMypageBtn] = useState(true);

  return (
    <>
      <Layout>
        <CategoryHeader />
        <div
          className={`${styleDefaultLayout.wrap}`}
        >
          {/* 카테고리 메뉴 */}
          <div>
            {/* 카테고리 상품리스트 */}
            <BrandIn priceList={priceList}/>
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Index;
