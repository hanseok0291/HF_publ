//react
import { useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";

import List from "../../../components/coupon_pub/100deal/List";
import ModalHundredResult from "../../../components/coupon_pub/common/modal/ModalHundredResult";
import ModalHundredWinner from "../../../components/coupon_pub/common/modal/ModalHundredWinner";
import TabGroup from "../../../components/coupon_pub/common/TabGroup";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);
  const [isResultOpen, setResultOpen] = useState(true);

  const closeResultPopup = () => {
    setResultOpen(false);
  }

  const openResultPopup = () => {
    setResultOpen(true);
  }

  return (
    <>
      <Layout>
        <Header
          pageTitle="딜 응모 내역"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
          noFixed={true}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <TabGroup navList={["사용 가능", "사용 완료"]} tabList={["PAY 쿠폰"]} />
          <List openResultPopup={openResultPopup}/>
        </div>
        <Footer />
        {/* 응모 결과 팝업 */}
        {/* <ModalHundredResult isResultOpen={isResultOpen} closeResultPopup={closeResultPopup}/> */}
        {/* <ModalHundredWinner /> */}
      </Layout>
    </>
  );
};

export default Index;
