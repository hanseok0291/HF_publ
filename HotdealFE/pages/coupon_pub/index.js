//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../styles/coupon_pub/Common.module.css";
import styleToast from "../../styles/coupon_pub/Toast.module.css";

//components
import Layout from "../../components/common/Layout";
import Header from "../../components/coupon_pub/common/Header";
import Footer from "../../components/coupon_pub/common/Footer";
import Category from "../../components/coupon_pub/main/Category";
import RollingCoupon from "../../components/coupon_pub/main/RollingCoupon";
import HotBrand from "../../components/coupon_pub/main/HotBrand";
import ReturnPoint from "../../components/coupon_pub/main/ReturnPoint";
import MaybeCoupon from "../../components/coupon_pub/main/MaybeCoupon";
import PopularCoupon from "../../components/coupon_pub/main/PopularCoupon";
import PromotionBanner from "../../components/coupon_pub/main/PromotionBanner";
import LimitCoupon from "../../components/coupon_pub/main/LimitCoupon";
import RewardBanner from "../../components/coupon_pub/main/RewardBanner";
import MainPopup from "../../components/coupon_pub/common/Modal/MainPopup";
import ModalLoading from "../../components/coupon_pub/common/Modal/ModalLoading";
import ModalEnter from "../../components/coupon_pub/common/modal/ModalEnter";
import ModalHundredComing from "../../components/coupon_pub/common/Modal/ModalHundredComing";
import HundredDeal from "../../components/coupon_pub/main/HundredDeal";
import Navigation from "../../components/coupon_pub/main/Navigation";
import SwiperItem from "../../components/coupon_pub/main/SwiperItem";
import TimeSale from "../../components/coupon_pub/main/TimeSale";
import TopBanner from "../../components/coupon_pub/main/TopBanner";

const listItem = [
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/BR00007_G00000117178.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
    addInfo1: true,
    addInfo2: true
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006153424285.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트 따뜻한 카페라떼",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
    addInfo3: true,
    addInfo4: true,
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트",
    infoDcPrice: "6,300",
    addInfo5: true,
    addInfo6: true,
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트 시원하 함께 세트",
    infoDcPrice: "6,300",
  },
];

const listItem2 = [
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/BR00007_G00000117178.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006153424285.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트 따뜻한 카페라떼",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "6,300",
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트 시원하 함께 세트",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "6,300",
  },
];

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
        <Header
          pageTitle="기프티몰"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
					noFixed={true}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
          ref={wrapRef}
        >
          {/* 카테고리 메뉴 */}
          <Navigation navList={["HOME", "할인", "브랜드", "선물함"]} activeIndex={0} />
          <TopBanner />
          <Category />
          <TimeSale
            title={
              "지금만 20% 특가 세일!"
            }
            addView={true}
            listItem={listItem2}
            paddingTop={50}
            isWon={false}
          />
          <HundredDeal />
          <SwiperItem
            title={
              "특별한 혜택 놓치지 마세요"
            }
            addView={true}
            listItem={listItem}
            paddingTop={50}
          />
          <HotBrand />
          <SwiperItem
            title={
              "할인할 때 쟁여두세요"
            }
            addView={true}
            listItem={listItem}
            paddingTop={50}
          />
          <RewardBanner />
          <SwiperItem
            title={
              "요즘 잘 나가는 상품"
            }
            addView={true}
            listItem={listItem}
            paddingTop={50}
          />
          {/* {showMainPopup && (
            // <ModalEnter
            // />
            // <ModalLoading />
            <ModalHundredComing
							onClose={() => {
								setShowMainPopup(!showMainPopup);
							}}
						/>
          )} */}
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Index;
