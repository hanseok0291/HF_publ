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
import ModalHundredResult from "../../../components/coupon_pub/common/Modal/ModalHundredResult";
import ModalHundredWinner from "../../../components/coupon_pub/common/Modal/ModalHundredWinner";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);
  const [isResultOpen, setResultOpen] = useState(false);

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
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap} ${styleDefaultLayout.footerWrap}`}
        >
          <List openResultPopup={openResultPopup}/>
          <Footer />
        </div>
        {/* 응모 결과 팝업 */}
        <ModalHundredResult isResultOpen={isResultOpen} closeResultPopup={closeResultPopup}/>
        {/* <ModalHundredWinner /> */}
      </Layout>
    </>
  );
};

export default Index;
