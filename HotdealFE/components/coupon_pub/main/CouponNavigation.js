import { useEffect, useRef, useState } from "react";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCouponNav from "../../../styles/coupon_pub/CouponNav.module.css";

const CouponNavigation = ({list = ["전체", "구매 완료", "구매 취소"]}) => {
  const navRef = useRef();
  const [isFixed, setIsFixed] = useState(false);
  const [onNavIndex, setOnNavIndex] = useState(0);

  const handleScroll = () => {
    if(navRef.current.getBoundingClientRect().top < 0){
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  const handleClick = (index) => {
    setOnNavIndex(index);
  }

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", handleScroll);
    }
  }, []);


  return (
    <>
      <div className={`${styleCouponNav.navWrap}`} ref={navRef}>
        <ul className={`${styleCouponNav.nav} ${isFixed && styleCouponNav.fixed}`}>
          {list.map((item, index) => (
            <li className={onNavIndex === index ? styleCouponNav.active : ""} key={index}>
            <a href={`/coupon/`} className={styleCommon.btn} onClick={() => handleClick(index)}>
              {item}
            </a>
          </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CouponNavigation;
