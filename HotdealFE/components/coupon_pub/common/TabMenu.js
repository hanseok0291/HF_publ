import React, { useEffect, useRef, useState } from 'react'
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";
import styleTabMenu from "../../../styles/coupon_pub/TabMenu.module.css";

const TabMenu = ({tabList, bgColor}) => {
  const [priceActive, setPriceActive] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const listRef = useRef(null);

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
    window.addEventListener('resize', checkForScroll);
  }, []);

  return (
    <div className={`${styleTabMenu.container} ${isScrollable ? styleTabMenu.blur : ''} ${bgColor ? styleTabMenu.gray : ''}`}>
      <div className={`${styleTabMenu.wrap}`}>
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
