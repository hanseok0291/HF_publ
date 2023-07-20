import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleHotBrand from "../../../styles/coupon_pub/HotBrand.module.css";

const HotBrand = () => {
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
  return (
    <>
      <div className={styleHotBrand.HotBrandWrap}>
        <div className={`${styleCommon.container}`}>
          <div className={styleHotBrand.HotBrandTitleWrap}>
            <h2 className={styleHotBrand.HotBrandTitle}>
              BEST BRAND<span className="titleEmoticon">💗</span>
            </h2>
            <button type="button" className={styleHotBrand.HotBrandAddview}>더보기</button>
          </div>
          <ul className={styleHotBrand.HotBrandList}>
            <li>
              <button href={`/coupon_pub/`}>
                <div className={styleHotBrand.HotBrandImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/01.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                <p className={styleHotBrand.HotBrandName}>
                  스타벅스
                </p>
              </button>
            </li>
            <li>
              <button href={`/coupon_pub/`}>
                <div className={styleHotBrand.HotBrandImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/02.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                <p className={styleHotBrand.HotBrandName}>던킨도너츠</p>
              </button>
            </li>
            <li>
              <button href={`/coupon_pub/`}>
                <div className={styleHotBrand.HotBrandImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/03.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                <p className={styleHotBrand.HotBrandName}>파리바게트</p>
              </button>
            </li>
            <li>
              <button href={`/coupon_pub/`}>
                <div className={styleHotBrand.HotBrandImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/04.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                <p className={styleHotBrand.HotBrandName}>할리스</p>
              </button>
            </li>
            <li>
              <button href={`/coupon_pub/`}>
                <div className={styleHotBrand.HotBrandImg}>
                  <img
                    src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/05.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                <p className={styleHotBrand.HotBrandName}>이디야</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HotBrand;
