//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
// import styleFriend from "../../styles/referral/Friend.module.css";//react

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";

import GiftPresent from "../../../components/coupon_pub/mypage/GiftPresent";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);

  return (
    <>
      <Layout>
        <Header
          pageTitle="선물한 내역"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
          subHeader={true}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <GiftPresent isfixedTop={isFixedTop} />
        </div>
        <Footer isfixedBottom={isFixedBottom} />
      </Layout>
    </>
  );
};

export default Index;
