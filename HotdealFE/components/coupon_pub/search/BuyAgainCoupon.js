import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "../../../components/coupon_pub/main/SwiperItem";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSearch from "../../../styles/coupon_pub/Search.module.css";

const BuyAgainCoupon = ({ BuyAgainCoupon, inSearch }) => {
  const [keywords, setKeywords] = useState([]);

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
      <SwiperItem
        title={["나에게 다시 한번 선물할까요?", <span>🎁</span>]}
        moreBtnShow="false"
        labelShow="true"
        bgColor="#fbfbfb"
        fontSize="17px"
        paddingBottom={60}
        listItem={listItem}
      />
    </>
  );
};

export default BuyAgainCoupon;
