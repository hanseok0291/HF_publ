import React, { useEffect, useRef, useState } from "react";

import styleMyretto from "../../styles/retto_pub/Myretto.module.css";

const HomeTab = ({ activeTab }) => {
  const tabList = ["HOME", "추첨 정보", "리또 머니함", "리또 TIP"];
  const tabWrapRef = useRef(null);
  
  useEffect(() => {
    if (tabWrapRef.current) {
      const tabWrapElement = tabWrapRef.current;
      const activeTabElement = tabWrapElement.querySelector(`li:nth-child(${activeTab})`);

      if (activeTabElement) {
        const activeTabRect = activeTabElement.getBoundingClientRect();
        const tabWrapRect = tabWrapElement.getBoundingClientRect();

        // 활성화된 탭이 화면 왼쪽으로 벗어나는 경우
        if (activeTabRect.left < tabWrapRect.left) {
          tabWrapElement.scrollLeft += activeTabRect.left - tabWrapRect.left - 20;
        }

        // 활성화된 탭이 화면 오른쪽으로 벗어나는 경우
        if (activeTabRect.right > tabWrapRect.right) {
          tabWrapElement.scrollLeft = activeTabRect.right - tabWrapRect.right - 20 ;
        }
      }
    }
  }, [activeTab]);

  return (
    <div className={styleMyretto.tabContainer}>
      <ul className={styleMyretto.tabWrap} ref={tabWrapRef}>
        {tabList.map((item, index) => (
          <li key={index} className={ index === activeTab - 1 ? styleMyretto.active : ''}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomeTab;
