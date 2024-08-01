//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../styles/coupon_pub/Common.module.css";
import styleSearch from "../../styles/coupon_pub/Search.module.css";

//components
import Layout from "../../components/common/Layout";
import Header from "../../components/coupon_pub/common/Header";
import Footer from "../../components/coupon_pub/common/Footer";
import SearchKeywords from "../../components/coupon_pub/search/SearchKeywords";
import InterestKeywords from "../../components/coupon_pub/search/InterestKeywords";
import BuyAgainCoupon from "../../components/coupon_pub/search/BuyAgainCoupon";
import ModalHundredComing from "../../components/coupon_pub/common/modal/ModalHundredComing";

const Index = () => {
  const router = useRouter();
  const wrapRef = useRef();

  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(true);
  const [isShowMypageBtn, setShowMypageBtn] = useState(true);

  const [showMainPopup, setShowMainPopup] = useState(true);
  // useEffect(() => {
  // 	if (termsYn === "N") {
  // 		//기프티몰 이용을 위해 동의 팝업
  // 	}
  // }, [termsYn]);

  return (
    <>
      <Layout>
        <div
          className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader} ${styleSearch.pageHeader}`}
        >
          <div className={`${styleDefaultLayout.container}`}>
            <button
              type="button"
              className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
            >
              뒤로가기
            </button>
            <h1
              className={`${styleDefaultLayout.pageTitle} ${styleSearch.pageTitle}`}
            >
              <input
                type="text"
                placeholder="브랜드명 혹은 상품명을 입력해 주세요."
              ></input>
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleCommon.btnDel} ${styleCommon.hide}`}
              ></button>
            </h1>
          </div>
        </div>
        <div style={{ paddingTop: 55 }}>
          <div style={{ marginBottom: "20px" }}>
            <SearchKeywords />
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <InterestKeywords />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <BuyAgainCoupon />
        </div>
          {showMainPopup && (
            // <ModalEnter
            // />
            // <ModalLoading />
            <ModalHundredComing
							onClose={() => {
								setShowMainPopup(!showMainPopup);
							}}
						/>
          )}
      </Layout>
    </>
  );
};

export default Index;
