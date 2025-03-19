import React from 'react';

//style
import styleCommon from '../../../styles/retto_pub/Common.module.css';

const Header = ({title = "발소 리워드 로또", sideBtn="안내", isborder=false}) => {
  
  return (
    <div className={`${styleCommon.header} ${isborder ? styleCommon.headerBorder : ""}`}> 
      <button type='button' className={styleCommon.backButton}>뒤로가기</button>
      <h1>{title}</h1> 
      {sideBtn !== "" && <button type='button' className={styleCommon.openBottomSheet}>{sideBtn}</button>}
    </div>
  )
}

export default Header
