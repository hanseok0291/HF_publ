import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import RettoSwiperItem from "../RettoSwiperItem";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";

const turnText = [1700, 1669, 1668, 1667, 1666, 1665, 1664, 1663, 1662, 1661]

const BottomSheetTurnChoice = ({ open, close }) => {
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
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.turnChoice}`}>
        <div className={styleRettoModal.topCon}>
          <button type="button" className={styleRettoModal.leftBtn}></button>
          <div>
            <p className={styleRettoModal.turnText}>회차 선택</p>
            <p className={styleRettoModal.turnDate}>1669회차 - 1700회차</p>
          </div>
          <button type="button" className={styleRettoModal.rightBtn}></button>{/* 최신 회차일 때 미노출 */}
        </div>
        <ul className={styleRettoModal.turnListWrap}>
          {turnText.map((item, index) => <li key={index} className={`${turnActive === index && styleRettoModal.active} ${styleRettoModal.disabled}`} onClick={() => handleTurnActiveClick(index)}>{item}</li>)}
        </ul>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetTurnChoice;
