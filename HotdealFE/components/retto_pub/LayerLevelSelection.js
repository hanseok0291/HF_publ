import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import LevelSelection from './LevelSelection';
import styleFillBox from "../../styles/retto_pub/FillBox.module.css";

// 레벨 변경 레이어 팝업
// change true일 경우 선택하기 단계로 안감
const LayerLevelSelection = ({defalutValue}) => {
  const [jewel, setJewel] = useState(); // 보석 상태
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
          full={true} 
        />
      </div>

    <div className={styleCommon.noteWrap}>
        <ul>
          <li>- <b>다음주 월요일</b>부터 변경된 레벨의 첫 스탬프가 찍혀요!</li>
          <li>
            - 머니함 속 금액을 옮길 수 없으면 변경이 취소돼요.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LayerLevelSelection;
