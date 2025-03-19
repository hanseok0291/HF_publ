import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import LevelSelection from './LevelSelection';

// 레벨 변경 레이어 팝업
// change true일 경우 선택하기 단계로 안감
// full true 시 채우기 금액 충족
// case1 레벨 동일 시
const LayerLevelSelection = ({full, rettoLevel=26, case1, case2, case3, case4, case5}) => {
  
  const [jewel, setJewel] = useState(null); // 보석 상태
  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = () => {
    setIsModal(!isModal);
  };

  return (
    <div className={`${styleCommon.layer} ${styleCommon.levelSelectionWrap}`}>
      <div className={styleCommon.layerHeader}>
        <h2>발소 리워드 로또 변경</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={styleCommon.borderBox} style={{margin: "20px 20px 82px", paddingBottom: 0}}>
        <LevelSelection 
          change={true}
          buttonText="이 레벨로 바꿀게요"
          jewel={jewel}
          setJewel={setJewel}
          handleModalToggle={handleModalToggle}
          rettoLevel={rettoLevel}
          full={full} 
          case1={case1}
          case2={case2}
          case3={case3}
          case4={case4}
          case5={case5}
        />
      </div>

    <div className={styleCommon.noteWrap}>
        <ul>
          <li>- <b>진행 중인 단계는 초기화</b>되고 새로 시작해요.</li>
          <li>
            - 변경하면 <b>10일 동안</b> 다시 변경할 수 없어요.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LayerLevelSelection;
