import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import RettoSwiperItem from "../RettoSwiperItem";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";

const turnText = ["7월","8월","9월"]

const BottomSheetRankingTurn = ({ open, close }) => {
  const [turnActive, setTurnActive] = useState(0);

  const handleTurnActiveClick = (index) => {
    setTurnActive(index);
  }

  return (
    <BottomSheet
      open={true}
      onDismiss={close}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
      blocking={false}
      sibling={
        <div
          className={styleModal.bottomSheetDim}
          onClick={close}
        ></div>
      }
      className={styleModal.bottomSheet}
      style={{ position: "relative", zIndex: 1000 }}
      header={
        <>
          <div className={`${styleModal.modalHeader} ${styleRettoModal.btnNone}`}>
            <button
              type="button"
              className={styleModal.slideCloseBtn}
              onClick={close}
            ></button>
          </div>
        </>
      }
    >
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.turnChoice} ${styleRettoModal.ranking}`}>
        <div className={styleRettoModal.topCon}>
          <div>
            <p className={styleRettoModal.turnText}>월 선택</p>
            <p className={styleRettoModal.turnDate}>랭킹은 최근 3개월까지 보여집니다.</p>
          </div>
        </div>
        <ul className={styleRettoModal.turnListWrap}>
          {turnText.map((item, index) => <li key={index} className={`${turnActive === index && styleRettoModal.active}`} onClick={() => handleTurnActiveClick(index)}>{item}</li>)}
        </ul>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetRankingTurn;
