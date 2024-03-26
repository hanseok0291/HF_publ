import React, { useEffect, useRef, useState } from 'react'
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";
import styleNav from "../../../styles/coupon_pub/Nav.module.css";
import styleTabGroup from "../../../styles/coupon_pub/TabGroup.module.css";

const TabGroup = ({navList, tabList, bgColor}) => {
  const navRef = useRef();
  const [isFixed, setIsFixed] = useState(false);
  const [onNavIndex, setOnNavIndex] = useState(0);

  
  const [priceActive, setPriceActive] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const listRef = useRef(null);
  
  const handleClick = (e, index) => {
    e.preventDefault();
    setOnNavIndex(index);
  }
  const handlePriceActiveClick = (index) => {
    setPriceActive(index);
  }

  const checkForScroll = () => {
    const current = listRef.current;
    if (!current) return;

    const hasOverflow = current.scrollWidth > current.clientWidth;
    setIsScrollable(hasOverflow);
  }

  const windowHandleScroll = () => {
    if(navRef.current.getBoundingClientRect().top < 0){
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }

  const handleScroll = () => {
    const current = listRef.current;

    if (!current) return;

    const isAtEnd = current.scrollWidth - current.scrollLeft <= current.clientWidth + 20;
    if(isAtEnd) {
      setIsScrollable(false);
    } else {
      checkForScroll();
    }
  }

  useEffect(() => {
    listRef.current.addEventListener('scroll', handleScroll);
    checkForScroll();
    window.addEventListener('scroll', windowHandleScroll);
    window.addEventListener('resize', checkForScroll);
  }, []);

  return (
    <div ref={navRef} className={`${styleTabGroup.tabGroupWrap} ${isFixed ? styleTabGroup.fixed : ""}`}>
      {navList && 
        <div className={`${styleNav.navWrap} ${styleTabGroup.navWrap}`}>
          <ul className={`${styleNav.nav}`}>
            {navList.map((item, index) => (
              <li className={onNavIndex === index ? styleNav.active : ""} key={index}>
                <a href={`/coupon/`} className={styleCommon.btn} onClick={(e) => handleClick(e, index)}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      }
      {tabList && 
        <div className={`${styleBrandList.priceListContainer} ${isScrollable ? styleBrandList.blur : ''} ${bgColor ? styleBrandList.gray : ''} ${styleTabGroup.menuWrap}`}>
          <ul className={`${styleBrandList.priceListWrap}`} ref={listRef}>
            {tabList.map((price, index) => (
              <li key={index}>
              <button type="button" className={priceActive === index ? styleBrandList.active : ''} onClick={() => handlePriceActiveClick(index)}>
                {price}
              </button>
            </li>
            ))}
          </ul>
        </div>
      }
      
    </div>
  )
}

export default TabGroup;
