import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCategory from "../../../styles/coupon_pub/Category.module.css";

const Category = () => {
  const data = [
    {
      src: '../images/coupon/sample/icon-main-category-1.png',
      name: '100원딜'
    },
    {
      src: '../images/coupon/sample/icon-main-category-2.png',
      name: '20% 특가'
    },
    {
      src: '../images/coupon/sample/icon-main-category-3.png',
      name: '한강 수영장'
    },
    {
      src: '../images/coupon/sample/icon-main-category-4.png',
      name: '포인트 적립'
    },
    {
      src: '../images/coupon/sample/icon-main-category-5.png',
      name: 'PAY쿠폰'
    },
    {
      src: '../images/coupon/sample/icon-main-category-6.png',
      name: '상품권'
    },
    {
      src: '../images/coupon/sample/icon-main-category-7.png',
      name: '편의점·마트'
    },
    {
      src: '../images/coupon/sample/icon-main-category-8.png',
      name: '카페·베이커리'
    },
    {
      src: '../images/coupon/sample/icon-main-category-9.png',
      name: '아이스크림'
    },
    {
      src: '../images/coupon/sample/icon-main-category-10.png',
      name: '패스트푸드'
    },
    {
      src: '../images/coupon/sample/icon-main-category-11.png',
      name: '외식'
    },
    {
      src: '../images/coupon/sample/icon-main-category-12.png',
      name: '문화생활'
    }
  ]

  return (
    <ul className={styleCategory.wrap}>
      {data.map((item, index) => (
        <li key={index}>
          <a href="#">
            <div className={styleCategory.imgWrap}>
              <img src={item.src} alt={item.name} />
            </div>
            <span className={styleCategory.name}>{item.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Category;
