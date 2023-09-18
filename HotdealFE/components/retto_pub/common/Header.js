import React from 'react';

//style
import styleCommon from '../../../styles/retto_pub/Common.module.css';

const Header = ({title = "리또", sideBtn="리또란?"}) => {
  
  return (
    <div className={styleCommon.header}> 
      <button type='button' className={styleCommon.backButton}>뒤로가기</button>
      <h1>{title}</h1> 
      {sideBtn !== "" && <button type='button' className={styleCommon.openBottomSheet}>{sideBtn}</button>}
    </div>
  )
}

export default Header
