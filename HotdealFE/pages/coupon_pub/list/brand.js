//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";

// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import Navigation from "../../../components/coupon_pub/main/Navigation";
import ModalBrandIn from "../../../components/coupon_pub/common/Modal/ModalBrandIn";

const tabList = [
  {
    src: "../../../images/coupon/icon/brand/icon-brand-2.png",
    name: "상품권"
  },
  {
    src: "../../../images/coupon/icon/brand/icon-brand-3.png",
    name: "편의점·마트"
  },
  {
    src: "../../../images/coupon/icon/brand/icon-brand-4.png",
    name: "카페·베이커리"
  },
  {
    src: "../../../images/coupon/icon/brand/icon-brand-5.png",
    name: "아이스크림"
  },
  {
    src: "../../../images/coupon/icon/brand/icon-brand-6.png",
    name: "패스트푸드"
  },
  {
    src: "../../../images/coupon/icon/brand/icon-brand-7.png",
    name: "외식"
  },
  {
    src: "../../../images/coupon/icon/brand/icon-brand-8.png",
    name: "문화생활"
  }
]

const brandList = [
  {
    src: "../../../images/coupon/sample/logo-brand-1.png",
    brand: "스타벅스"
  },
  {
    src: "../../../images/coupon/sample/logo-brand-2.png",
    brand: "던킨도너츠"
  },
  {
    src: "../../../images/coupon/sample/logo-brand-3.png",
    brand: "파리바게트"
  },
  {
    src: "../../../images/coupon/sample/logo-brand-4.png",
    brand: "뚜레쥬르"
  },
  {
    src: "../../../images/coupon/sample/logo-brand-5.png",
    brand: "할리스"
  },
  {
    src: "../../../images/coupon/sample/logo-brand-6.png",
    brand: "나뚜르"
  },
  {
    src: "../../../images/coupon/sample/logo-brand-7.png",
    brand: "이디야"
  }
]

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(true);
  const [onTab, setOnTab] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef();

  const handleClick = (index) => {
    setOnTab(index);
  }

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  return (
    <>
      <Layout>
        <div ref={headerRef}>
          <Header
            pageTitle="기프티몰"
            isShowBackBtn={isShowBackBtn}
            isShowSearchBtn={isShowSearchBtn}
            noFixed={true}
          />
        </div>
        <Navigation navList={["HOME", "할인", "브랜드", "선물함"]} activeIndex={2}/>
        {/* 카테고리 메뉴 */}
        {/* UI개선하며 ${styleCommon.containerWrap} 제거 */}
        <div className={`${styleBrandList.brandMain}`}>
        {/* <div className={`${styleCommon.containerWrap} ${styleBrandList.brandMain}`}> */}
          <ul className={styleBrandList.brandTabWrap}>
            {tabList.map((item, index) => (
              <li key={index} className={onTab === index ? styleBrandList.active : ""} onClick={() => handleClick(index) }>
                <button type="button">
                  <img src={item.src} alt={item.name} />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <ul className={styleBrandList.brandListWrap}>
            {brandList.map((item, index) => (
              <li key={index}>
                <a href="#">
                  <div className={styleBrandList.imgWrap}>
                    <img src={item.src} alt={item.brand} />
                  </div>
                  <span>{item.brand}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* <ModalBrandIn /> */}
      </Layout>
    </>
  );
};

export default Index;
