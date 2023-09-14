import React, { useEffect } from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../../styles/retto_pub/Common.module.css';

function Container({children, backgroundColor="#F9F9F9", padding="30px 20px 48px"}) {
  const [winHeight, setWinHeight] = useState(null);
  const style = {
    backgroundColor: backgroundColor,
    padding: padding,
    minHeight: winHeight
  }
  useEffect(() => {
    setWinHeight(window.innerHeight - 44);
  }, [])

  return (
    <div className={styleCommon.container} style={style}>
      {children}
    </div>
  )
}

export default Container;
