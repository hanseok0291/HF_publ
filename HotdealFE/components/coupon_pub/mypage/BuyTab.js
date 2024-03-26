import { useRef, useState, useEffect } from "react";

import TabGroup from "../common/TabGroup";

const BuyTab = ({ tabItem, tabLink }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabRef = useRef();

  const tabValue = tabItem;



  useEffect(() => {
 
  }, [tabIndex]);

  return (
    <>
      {tabLink && <TabGroup tabList={["사용 가능"]} navList={["사용 가능", "사용 완료"]}/>}
    </>
  );
};

export default BuyTab;
