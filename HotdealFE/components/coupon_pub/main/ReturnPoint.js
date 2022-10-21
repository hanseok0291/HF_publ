import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "./SwiperItem";

const ReturnPointWrap = () => {
  return (
    <>
      <SwiperItem
        title={["사용하면 적립받아요", <span>✋</span>]}
        accumulate="true"
        moreBtnShow="true"
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

export default ReturnPointWrap;
