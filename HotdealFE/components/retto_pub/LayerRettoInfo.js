import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleApply from "../../styles/retto_pub/Apply.module.css";
import Header from './common/Header';

const LayerRettoInfo = () => {

  return (
    <div className={styleCommon.layer}>
      <div className={styleCommon.layerHeader}>
        <h2>리또 알아보기</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      
    </div>
  )
}

export default LayerRettoInfo;
