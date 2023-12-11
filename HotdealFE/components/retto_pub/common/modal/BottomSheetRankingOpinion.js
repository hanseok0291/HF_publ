import React, { useState } from 'react';
import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../Button";

// 기기알림 바텀 시트
const BottomSheetRankingOpinion = ({ closeHundredPopup }) => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= 100) {
      setText(newText);
    }
  };

  return (
    <BottomSheet
      open={true}
      onDismiss={closeHundredPopup}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
      blocking={false}
      sibling={
        <div
          className={styleModal.bottomSheetDim}
          onClick={closeHundredPopup}
        ></div>
      }
      className={styleModal.bottomSheet}
      style={{ position: "relative", zIndex: 1000 }}
      header={
        <>
          <div className={`${styleModal.modalHeader}`}>
            <button
              type="button"
              className={styleModal.slideCloseBtn}
              onClick={closeHundredPopup}
            ></button>
          </div>
        </>
      }
    >
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.rankingOpinion}`}>
        <h2>축하해요! 랭킹 20등이네요</h2>
        <p>지금 이 기쁨을 공유해 보세요!</p>
        <div className={styleRettoModal.rankingOpinionTextarea}>
          <textarea placeholder="상금은 소감 입력 후 받을 수 있어요." onChange={handleTextChange} value={text}></textarea>
          <span className={styleRettoModal.textLength}>{text.length} / 100</span>
        </div>
        <Button disabled={text.length > 0 ? false : true}>상금 받으러가기</Button>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetRankingOpinion;
