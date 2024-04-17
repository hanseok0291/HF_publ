import { useRef, useState } from "react";

import styleBuyMain from "../../../styles/coupon_pub/BuyMain.module.css";
import BuyTab from "./BuyTab";

export default function GiftDetail() {
  return (
    <div className={styleBuyMain.styleBuyMainWrap}>
      <BuyTab tabItem={["사용 가능", "사용 완료"]} tabLink={true} />
    </div>
  );
}
