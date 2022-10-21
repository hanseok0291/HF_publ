import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "./SwiperItem";

const MaybeCouponWrap = (props) => {
  return (
    <>
      <SwiperItem
        title={props.pageTitle}
        moreBtnShow="false"
        labelShow="true"
      />
    </>
  );
};

export default MaybeCouponWrap;
