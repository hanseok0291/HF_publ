import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "./SwiperItem";

const MaybeCouponWrap = (props) => {
  return (
    <>
      <SwiperItem
        title={props.pageTitle}
        labelShow="true"
      />
      <div
        style={{
          width: "100%", 
          height: "15px",
          background: "#f1f1f1",
        }}
      ></div>
    </>
  );
};

export default MaybeCouponWrap;
