import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "../../../components/coupon_pub/main/SwiperItem";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSearch from "../../../styles/coupon_pub/Search.module.css";

const BuyAgainCoupon = ({ BuyAgainCoupon, inSearch }) => {
  const [keywords, setKeywords] = useState([]);

  return (
    <>
      <SwiperItem
        title={["나에게 다시 한번 선물할까요?", <span>🎁</span>]}
        moreBtnShow="false"
        labelShow="true"
        bgColor="#fbfbfb"
        fontSize="17px"
      />
    </>
  );
};

export default BuyAgainCoupon;
