import { useRef, useState, useEffect } from "react";

import TabGroup from "../common/TabGroup";

const BuyTab = ({ tabLink }) => {

  return (
    <>
      {tabLink && <TabGroup navList={["사용 가능", "사용 완료"]} tabList={["PAY 쿠폰"]} />}
    </>
  );
};

export default BuyTab;
