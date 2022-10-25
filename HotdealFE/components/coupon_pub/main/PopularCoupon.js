import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "./SwiperItem";

const PopularWrap = () => {
  return (
    <>
      <SwiperItem
        title={[
          "카페는 역시 별다방",
          <span className="titleEmoticon">⭐</span>,
        ]}
        moreBtnShow="true"
      />
    </>
  );
};

export default PopularWrap;
