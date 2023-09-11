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
  const [brandActive, setBrandActive] = useState(0);
  const [priceListBlur, setPriceListBlur] = useState(true);
  const priceListRef = useRef();

  const handlePriceScroll = () => {
    const  scrollRight = priceListRef.current.scrollWidth - priceListRef.current.clientWidth - priceListRef.current.scrollLeft;
    if(scrollRight < 60){
      setPriceListBlur(false);
    } else {
      setPriceListBlur(true);
    }
  };

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

  const handleBrandActiveClick = (index) => {
    setBrandActive(index);
  }

  return (
    <>
      <Layout>
        <BrandHeader />
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
            <div className={styleBrandList.areaBox}>
              <div></div>
            </div>
            <div className={styleBrandList.brandListBox}>
              <ul>
                {brandList.map((brand, index) => (
                  <li key={index} className={brandActive === index && styleBrandList.active} onClick={() => handleBrandActiveClick(index)}>
                    <a href="#">
                      <div className={styleBrandList.imgWrap}>
                        <img src={brand.src} alt={brand.name} />
                      </div>
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
          <div className={`${styleBrandList.priceListContainer} ${priceListBlur && styleBrandList.blur}`}>
            <ul className={styleBrandList.priceListWrap} ref={priceListRef} onScroll={() => handlePriceScroll()}>
              {priceList.map((price, index) => (
                <li key={index}>
                  <button type="button" className={priceActive === index && styleBrandList.active} onClick={() => handlePriceActiveClick(index)}>
                    {price}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <CouponList filter1={true}/>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Index;
