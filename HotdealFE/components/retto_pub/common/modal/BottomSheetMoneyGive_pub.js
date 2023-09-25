import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../Button";

// 기기알림 바텀 시트
const BottomSheetMoneyGive_pub = ({ closeHundredPopup }) => {

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
      {/* 초과 시 styleRettoModal.over className 추가 */}
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.moneyGive}`}>
        <h2>당첨금을 받았어요!</h2>
        <p><span>포인트 15,000원</span>이 지금 바로 들어왔어요.</p>
        <Button>확인</Button>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetMoneyGive_pub;
