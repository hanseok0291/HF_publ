import { useRef, useState } from "react";

import styleBuyMain from "../../../styles/coupon_pub/BuyMain.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import { useEffect } from "react";

const StatusTab = () => {
  const tabRef = useRef();

  const scrollMove = () => {
    if (window.scrollY > 0) {
      tabRef.current.classList.add("shadow");
    } else {
      tabRef.current.classList.remove("shadow");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollMove);
  }, []);

  return (
    <>
      <div ref={tabRef} className={styleBuyMain.statusTabWrap}>
        <div className={`${styleCommon.container} ${styleBuyMain.container}`}>
          <ul className={styleBuyMain.statusList}>
            <li className={`${styleBuyMain.statusItem} ${styleBuyMain.active}`}>
              <a href="#">전체</a>
            </li>
            <li className={styleBuyMain.statusItem}>
              <a href="#">일반 쿠폰</a>
            </li>
            <li className={styleBuyMain.statusItem}>
              <a href="#">PAY쿠폰</a>
            </li>
            <li className={styleBuyMain.statusItem}>
              <a href="#">프로모션 쿠폰</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const BuyTab = ({ tabItem, tabLink }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabRef = useRef();

  const tabValue = tabItem;

  const onTab = (e) => {
    window.scrollTo({ top: 0 });
    setTabIndex(e);
  };

  const scrollMove = () => {
    if (window.scrollY > 0) {
      tabRef.current.classList.add("shadow");
    } else {
      tabRef.current.classList.remove("shadow");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollMove);
  }, [tabIndex]);

  return (
    <>
      <ul ref={tabRef} className={styleBuyMain.tabWrap}>
        {tabValue.map((item, idx) => {
          return (
            <li
              className={tabIndex === idx ? "active" : undefined}
              onClick={() => {onTab(idx)}}
              key={idx}
            >
              {item}
            </li>
          );
        })}
      </ul>
      {tabLink && <StatusTab />}
    </>
  );
};

export default BuyTab;
