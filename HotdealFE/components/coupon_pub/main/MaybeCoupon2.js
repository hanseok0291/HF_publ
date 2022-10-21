import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "../list/SwiperItem";

const MaybeCouponWrap = (props) => {
  const swiperType = true;

  return (
    <>
      <SwiperItem title={["이런 상품은 어떠세요?"]} moreBtnShow="false" />
    </>
  );
};

export default MaybeCouponWrap;
