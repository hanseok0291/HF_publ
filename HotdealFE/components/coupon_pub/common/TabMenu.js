import React, { useEffect, useRef, useState } from 'react'
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";
import styleTabMenu from "../../../styles/coupon_pub/TabMenu.module.css";

const TabMenu = ({tabList, bgColor, fixedPos, onFixed = true}) => {
  const [priceActive, setPriceActive] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const listRef = useRef(null);
  const navRef = useRef();
  let lastScrollTop = 0;

  const handlePriceActiveClick = (index) => {
    setPriceActive(index);
  }

  const checkForScroll = () => {
    const current = listRef.current;
    if (!current) return;

    const hasOverflow = current.scrollWidth > current.clientWidth;
    setIsScrollable(hasOverflow);
  }

  const handleScroll = () => {
    console.log(navRef.current.getBoundingClientRect().top)
    if(navRef.current.getBoundingClientRect().top < fixedPos){
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  const handleTabScroll = () => {
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
    const onScroll = () => {
      if(!initialized) return;
      const currentScroll = window.scrollY;

      if(currentScroll > lastScrollTop) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }

    if(onFixed){
      window.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", onScroll);
    }
    window.addEventListener('resize', checkForScroll);
    listRef.current.addEventListener('scroll', handleTabScroll);
    checkForScroll();

    const timer = setTimeout(() => {
      setInitialized(true);
      lastScrollTop = window.scrollY;
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [initialized]);

  return (
    <div className={`${styleTabMenu.container} ${isScrollable ? styleTabMenu.blur : ''} ${bgColor ? styleTabMenu.gray : ''} ${isScrollDown ? styleTabMenu.addMotion : ''}`} ref={navRef}>
      <div className={`${styleTabMenu.wrap} ${isFixed ? styleTabMenu.fixed : ''}`} style={{ top: isFixed ? fixedPos : 0}}>
        <ul className={`${styleTabMenu.tabWrap}`} ref={listRef}>
          {tabList.map((price, index) => (
            <li key={index}>
            <button type="button" className={priceActive === index ? styleTabMenu.active : ''} onClick={() => handlePriceActiveClick(index)}>
              {price}
            </button>
          </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TabMenu;
