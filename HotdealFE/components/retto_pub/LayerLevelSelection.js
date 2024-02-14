import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import LevelSelection from './LevelSelection';

// 레벨 변경 레이어 팝업
// change true일 경우 선택하기 단계로 안감
// full true 시 채우기 금액 충족
// case1 레벨 동일 시
const LayerLevelSelection = ({full,rettoLevel=26, initial, case1, case2, case3, case4, case5}) => {
  const initialJewel = {
    eng: 'emerald',
    kor: '에메랄드',
    cash: '50',
    prize: '1천만원',
    level: "Lv. 2"
  }
  const [jewel, setJewel] = useState(initialJewel); // 보석 상태
  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = () => {
    setIsModal(!isModal);
  };

  return (
    <div className={`${styleCommon.layer} ${styleCommon.levelSelectionWrap}`}>
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
          rettoLevel={rettoLevel}
          full={full} 
          initial={initialJewel}
          case1={case1}
          case2={case2}
          case3={case3}
          case4={case4}
          case5={case5}
        />
      </div>

    <div className={styleCommon.noteWrap}>
        <ul>
          <li>- <b>진행 중인 레벨이 초기화</b>되고 변경된 레벨로 새로 시작해요.</li>
          <li>
            - 레벨 변경 후 <b>10일 동안</b> 다른 레벨로 변경할 수 없어요. 
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LayerLevelSelection;
