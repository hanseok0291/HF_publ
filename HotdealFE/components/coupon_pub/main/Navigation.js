import { useEffect, useRef, useState } from "react";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleNav from "../../../styles/coupon_pub/Nav.module.css";

const Navigation = ({navList, activeIndex}) => {
  const navRef = useRef();
  const [isFixed, setIsFixed] = useState(false);
  const [onNavIndex, setOnNavIndex] = useState(activeIndex);

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
      <div className={`${styleNav.navWrap}`} ref={navRef}>
        <ul className={`${styleNav.nav} ${isFixed && styleNav.fixed}`}>
          {navList.map((item, index) => (
            <li className={onNavIndex === index ? styleNav.active : ""} key={index}>
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

export default Navigation;
