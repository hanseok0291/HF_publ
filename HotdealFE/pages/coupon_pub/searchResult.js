//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../styles/coupon_pub/Common.module.css";
import styleToast from "../../styles/coupon_pub/Toast.module.css";
import styleSearch from "../../styles/coupon_pub/Search.module.css";

//components
import Layout from "../../components/common/Layout";
import Header from "../../components/coupon_pub/common/Header";
import Footer from "../../components/coupon_pub/common/Footer";
import SearchKeywords from "../../components/coupon_pub/search/SearchKeywords";
import InterestKeywords from "../../components/coupon_pub/search/InterestKeywords";
import BuyAgainCoupon from "../../components/coupon_pub/search/BuyAgainCoupon";
import SearchCoupon from "../../components/coupon_pub/search/SearchCoupon";
import CouponList from "../../components/coupon_pub/list/CouponList";

const Index = () => {
  const router = useRouter();
  const wrapRef = useRef();

  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(true);
  const [isShowMypageBtn, setShowMypageBtn] = useState(true);

  // useEffect(() => {
  // 	if (termsYn === "N") {
  // 		//기프티몰 이용을 위해 동의 팝업
  // 	}
  // }, [termsYn]);

  return (
    <>
      <Layout>
        <div
          className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader} ${styleSearch.pageHeader} ${styleDefaultLayout.subHeader}`}
        >
          <div className={`${styleDefaultLayout.container}`}>
            <button
              type="button"
              className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
            >
              뒤로가기
            </button>
            <h1
              className={`${styleDefaultLayout.pageTitle} ${styleSearch.pageTitle} ${styleSearch.subHeader}`}
            >
              <input
                type="text"
                placeholder="브랜드명 혹은 상품명을 입력해 주세요."
              ></input>
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleCommon.btnDel}`}
              ></button>
            </h1>
          </div>
        </div>
        <div style={{ paddingTop: "58px" }}>
          <div style={{ marginBottom: "20px" }}>
            {/* 카테고리 상품리스트 */}
            <CouponList pageType="result" />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
