//react
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import HundredDealDetail from "../../../components/coupon_pub/detail/HundredDealDetail";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);
  const [isDeadlinFixed, setDeadlinFixed] = useState(false);

  return (
    <>
      <Layout>
        <Header
          pageTitle="상품 상세"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
					subHeader={true}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <HundredDealDetail isFixedTop={isFixedTop} isDeadlinFixed={isDeadlinFixed} setDeadlinFixed={setDeadlinFixed}/>
        </div>
        <Footer isfixedBottom={isFixedBottom} isDeadlinFixed={isDeadlinFixed}/>
      </Layout>
    </>
  );
};

export default Index;
