//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSearch from "../../../styles/coupon_pub/Search.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";


// //components
import Layout from "../../../components/common/Layout";
import Footer from "../../../components/coupon_pub/common/Footer";
import SwiperItem from "../../../components/coupon_pub/main/SwiperItem";
import CategoryHeader from "../../../components/coupon_pub/list/CategoryHeader";
import BrandHeader from "../../../components/coupon_pub/list/BrandHeader";

const categoryList = [
  {
    src: '../../../images/coupon/sample/icon-main-category-5.png',
    name: 'PAY쿠폰'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-6.png',
    name: '상품권'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-7.png',
    name: '편의점·마트'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-8.png',
    name: '카페·베이커리'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-9.png',
    name: '아이스크림'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-10.png',
    name: '패스트푸드'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-11.png',
    name: '외식'
  },
  {
    src: '../../../images/coupon/sample/icon-main-category-12.png',
    name: '문화생활'
  }
]

const listItem = [
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/BR00007_G00000117178.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
    infoBox1: false,
    infoBox2: false,
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
    infoBox1: false,
    infoBox2: false,
    addInfo3: true,
    addInfo4: true,
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트",
    infoDcPrice: "6,300",
    infoBox1: false,
    infoBox2: false,
    addInfo5: true,
    addInfo6: true,
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트 시원하 함께 세트",
    infoDcPrice: "6,300",
    infoBox1: false,
    infoBox2: false,
  },
];

const Index = () => {
  const [brandOpen, setBrandOpen] = useState(false); 
  const [categoryOpen, setCategoryOpen] = useState(false); 
  const [priceActive, setPriceActive] = useState(0);

  const handleBrandOpenClick = () => {
    setBrandOpen(!brandOpen);
    setCategoryOpen(false);
  }

  const handleCategoryOpenClick = () => {
    setCategoryOpen(!categoryOpen);
    setBrandOpen(false);
  }

  const handlePriceActiveClick = (index) => {
    setPriceActive(index);
  }

  return (
    <>
      <Layout>
        <BrandHeader />
        <div className={`${styleDefaultLayout.wrap}`}>
          <div className={styleBrandList.noItem}>
            <p>관련 상품을 찾지 못했어요</p>
          </div>
          <SwiperItem
            title={["이런 상품은 어때요?"]}
            moreBtnShow="false"
            labelShow="true"
            bgColor="#ffffff"
            fontSize="17px"
            paddingTop={0}
            paddingBottom={50}
            listItem={listItem}
          />
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Index;
