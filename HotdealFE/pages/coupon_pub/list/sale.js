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
import ModalLimitedSale from "../../../components/coupon_pub/common/Modal/ModalLimitedSale";
import Navigation from "../../../components/coupon_pub/main/Navigation";
import ModalFilter from "../../../components/coupon_pub/common/modal/ModalFilter";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(true);
  const [isFilter1, setIsFilter1] = useState(false);
  const [isFilter2, setIsFilter2] = useState(false);
  const [filter1Arr, setFilter1Arr] = useState();

  const closeModal = () => {
    setIsFilter1(false);
    setIsFilter2(false);
  }

  return (
    <>
      <Layout>
        <Header
          pageTitle="기프티몰"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
        />
        <Navigation />
        <div className={`${styleCommon.containerWrap}`}>
          <div>
            <img src="../../../images/coupon/sample/banner-sale-1.png" alt="" />
          </div>
          <CouponList filter1={true} filter2={true} setIsFilter1={setIsFilter1} setIsFilter2={setIsFilter2} />
        </div>
        <Footer />
        {/* 품절 안내 모달 */}
        {/* <ModalLimitedSale repeat={false}/> */}
        {isFilter1 && <ModalFilter setIsFilter1={setIsFilter1} closeModal={closeModal} title="할인 유형" list={["전체", "기본", "추가", "기간 한정", "선물 한정"]} />}
        {isFilter2 && <ModalFilter setIsFilter2={setIsFilter2} closeModal={closeModal}  title="정렬 기준" list={["인기순", "할인율순", "낮은 가격순", "낮은 가격순"]} />}
      </Layout>
    </>
  );
};

export default Index;
