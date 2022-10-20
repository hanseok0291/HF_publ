import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleGiftPresent from "../../../styles/coupon_pub/GiftPresent.module.css";

//components
import CouponList from "../../../components/coupon_pub/list/CouponList";
import GiftPresentList from "../../../components/coupon_pub/list/GiftPresentList";

export default function CouponDetail({ isfixedTop }) {
  return (
    <div className={styleGiftPresent.GiftPresentWrap}>
      <div className={styleGiftPresent.topCon}>
        <p className={styleGiftPresent.topConText}>
          다른 친구들에게 <span>선물한 쿠폰 목록이에요.</span>
        </p>
      </div>
      <GiftPresentList />
    </div>
  );
}
