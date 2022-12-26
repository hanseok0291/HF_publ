import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "./SwiperItem";

const ReturnPointWrap = () => {
  return (
    <>
      <SwiperItem
        title={[
          "특별한 혜택 놓치지 마세요",
          <span className="titleEmoticon">💰</span>,
        ]}
        accumulate="true"
        labelShow="true"
        moreBtnShow="true"
      />
    </>
  );
};

export default ReturnPointWrap;
