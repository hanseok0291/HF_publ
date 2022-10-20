import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";

const Theme = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className={`${styleCouponList.ThemeWrap}`}></div>
    </>
  );
};

export default Theme;
