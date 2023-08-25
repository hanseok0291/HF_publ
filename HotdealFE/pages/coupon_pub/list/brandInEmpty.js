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
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import Category from "../../../components/coupon_pub/main/Category";
import BrandIn from "../../../components/coupon_pub/list/BrandIn";
import CouponList from "../../../components/coupon_pub/list/CouponList";

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

const brandList = [
  {
    src: "../../../images/coupon/brand/logo-brand-small-1.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-1.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-1.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
  {
    src: "../../../images/coupon/brand/logo-brand-small-2.png",
    name: "전체"
  },
];

const priceList = ["전체", "1만원대", "2만원대", "3만원대", "4만원대", "5~9만원대", "10만원 이상"];

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
              className={`${styleBrandList.searchArea}`}
            >
              <input
                type="text"
                placeholder="20% 할인전"
              ></input>
              <button
                type="button"
                className={`${styleCommon.iconSearch} ${styleBrandList.searchBtn}`}
              ></button>
            </h1>
            <button
                type="button"
                className={`${styleCommon.icon} ${styleCommon.iconGiftSvg} ${styleBrandList.giftBtn}`}
              ></button>
          </div>
        </div>
        <div
          className={`${styleDefaultLayout.wrap}`}
        >
          <div className={styleBrandList.brandTitleArea}>
            <button type="button" className={styleBrandList.brandTitle} onClick={handleCategoryOpenClick}>
              카페·베이커리
              <i className={`${styleBrandList.iconDown} ${categoryOpen && styleBrandList.open}`}></i>
            </button>
            {categoryOpen && 
              <ul className={styleBrandList.categoryListWrap}>
                {categoryList.map((category, index) => (
                  <li key={index}>
                    <a href="#">
                      <img src={category.src} alt={category.name} />
                      <span>{category.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            }
            
          </div>
          <div className={`${styleBrandList.brandListWrap} ${brandOpen && styleBrandList.open}`}>
            <div className={styleBrandList.brandListBox}>
              <ul>
                {brandList.map((brand, index) => (
                  <li key={index}>
                    <a href="#">
                      <img src={brand.src} alt={brand.name} />
                      <span>{brand.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className={styleBrandList.openBtnWrap}>
                <button type="button" className={styleBrandList.openBtn} onClick={handleBrandOpenClick}>
                  펼치기
                </button>
              </div>
            </div>
          </div>
          <ul className={styleBrandList.priceListWrap}>
            {priceList.map((price, index) => (
              <li key={index}>
              <button type="button" className={priceActive === index && styleBrandList.active} onClick={() => handlePriceActiveClick(index)}>
                {price}
              </button>
            </li>
            ))}
          </ul>
          <CouponList filter1={true}/>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Index;
