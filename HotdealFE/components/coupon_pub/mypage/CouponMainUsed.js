import { useRef, useState } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleBuyMain from "../../../styles/coupon_pub/BuyMain.module.css";
import { useEffect } from "react";
import BuyTabUsed from "./BuyTabUsed";

export default function GiftDetail() {
  return (
    <div className={styleBuyMain.styleBuyMainWrap}>
      <BuyTabUsed tabItem={["사용 가능", "사용 완료"]} tabLink={true} />
    </div>
  );
}
