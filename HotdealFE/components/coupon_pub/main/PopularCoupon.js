import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "./SwiperItem";

const PopularWrap = () => {
  return (
    <>
      <SwiperItem
        title={[
          "요즘 잘 나가는 상품",
          <span className="titleEmoticon">🔥</span>,
        ]}
      />
      {/* <div
        style={{
          width: "100%",
          height: "15px",
          background: "#f1f1f1",
        }}
      ></div> */}
    </>
  );
};

export default PopularWrap;
