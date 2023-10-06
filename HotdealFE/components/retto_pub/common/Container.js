import React, { useEffect } from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../../styles/retto_pub/Common.module.css';

function Container({children, backgroundColor="#F9F9F9", padding="30px 20px", isTab, className=""}) {// 탭 영역이 있으면 isTab 추가
  const [winHeight, setWinHeight] = useState(null);
  const style = {
    backgroundColor: backgroundColor,
    padding: padding,
    minHeight: winHeight
  }
  useEffect(() => {
    setWinHeight(window.innerHeight - 44 - `${isTab ? 47 : 0}`);
  }, [])

  return (
    <div className={className} style={{paddingTop: isTab ? '91px': "44px"}}>
      <div className={`${styleCommon.container}`} style={style}>
        {children}
      </div>
    </div>
  )
}

export default Container;
