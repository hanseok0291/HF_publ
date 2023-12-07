import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import Header from './common/Header';
import LevelSelection from './LevelSelection';

// 레벨 변경 레이어 팝업
// change true일 경우 선택하기 단계로 안감
const LayerLevelSelection = ({defalutValue}) => {
  const [jewel, setJewel] = useState(); // 보석 상태
  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = () => {
    setIsModal(!isModal);
  };

  return (
    <div className={styleCommon.layer}>
      <div className={styleCommon.layerHeader}>
        <h2>리또 레벨 변경</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={styleCommon.borderBox} style={{margin: "20px", paddingBottom: 0}}>
        <LevelSelection 
          change={true}
          buttonText="이 리또로 바꿀게요"
          jewel={jewel}
          setJewel={setJewel}
          handleModalToggle={handleModalToggle}
          full={true} 
        />
      </div>
    </div>
  )
}

export default LayerLevelSelection;
