import React, { useEffect, useRef, useState } from 'react'

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleBrandHeader from "../../../styles/coupon_pub/BrandHeader.module.css";
import TabMenu from '../common/TabMenu';

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
    name: "전체전체전체전체전체전체"
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

const BrandHeader = () => {
  const [brandOpen, setBrandOpen] = useState(false); 
  const [categoryOpen, setCategoryOpen] = useState(false); 
  const [brandActive, setBrandActive] = useState(0);
  const [fakeBoxes, setFakeBoxes] = useState([])
  const categoryListRef = useRef(null);

  const handleBrandOpenClick = () => {
    setBrandOpen(!brandOpen);
    setCategoryOpen(false);
  }

  const handleCategoryOpenClick = () => {
    setCategoryOpen(!categoryOpen);
    setBrandOpen(false);
  }

  const handleBrandActiveClick = (index) => {
    setBrandActive(index);
  }

  useEffect(() => {
    

    const updateBoxes = () => {
      const container = categoryListRef.current;
      const listLength = container.children.length;
      const rowLength = Math.floor(((container.clientWidth - 40) / 52));
      const rowNeeded = Math.ceil(listLength / rowLength);
      const totalListNeeded = rowNeeded * rowLength;
      const fakeList = totalListNeeded - listLength;
      setFakeBoxes(Array(fakeList).fill(null));
    }
    updateBoxes();
    window.addEventListener('resize', updateBoxes);

    return () => {
      window.removeEventListener('resize', updateBoxes);
    }
  }, [])

  return (
    <div className={styleBrandHeader.container}>
      <div className={styleBrandHeader.wrap}>
        <div className={styleBrandHeader.headerWrap}>
          <button
            type="button"
            className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack} ${styleBrandHeader.btnBack}`}
          >
            뒤로가기
          </button>
          <div className={styleBrandHeader.brandTitleArea}>
            <button type="button" className={styleBrandHeader.brandTitle} onClick={handleCategoryOpenClick}>
              카페·베이커리
              <i className={`${styleBrandHeader.iconDown} ${categoryOpen ? styleBrandHeader.open : ""}`}></i>
            </button>
            {categoryOpen && 
              <ul className={styleBrandHeader.categoryListWrap}>
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
          <div className={styleBrandHeader.rightBtnWrap}>
            <button
              type="button"
              className={`${styleCommon.iconSearch2} ${styleBrandHeader.searchBtn}`}
            ></button>
            <button
              type="button"
              className={`${styleCommon.icon} ${styleCommon.iconGiftSvg}`}
            ></button>
          </div>
        </div>
        <div className={`${styleBrandHeader.brandListWrap} ${brandOpen ? styleBrandHeader.open : ""}`}>
          <div className={styleBrandHeader.areaBox}>
            <div></div>
          </div>
          <div className={styleBrandHeader.brandListBox}>
            <ul ref={categoryListRef}>
              {brandList.map((brand, index) => (
                <li key={index} className={brandActive === index ? styleBrandHeader.active : ""} onClick={() => handleBrandActiveClick(index)}>
                  <a href="#">
                    <div className={styleBrandHeader.imgWrap}>
                      <img src={brand.src} alt={brand.name} />
                    </div>
                    <span>{brand.name}</span>
                  </a>
                </li>
              ))}
              {fakeBoxes.map((_, index) => (
                <li key={index}></li>
              ))}
            </ul>
            <div className={styleBrandHeader.openBtnWrap}>
              <button type="button" className={styleBrandHeader.openBtn} onClick={handleBrandOpenClick}>
                펼치기
              </button>
            </div>
          </div>
        </div>
        <TabMenu onFixed={false} fixedPos={150} tabList={["전체", "1만원대", "2만원대", "3만원대", "4만원대", "5~9만원대", "10만원 이상"]} bgColor={true} />
      </div>
    </div>
  )
}

export default BrandHeader;
