import { BottomSheet } from "react-spring-bottom-sheet";
import GiftBox from "../../../../public/lotties/giftbox.json";

//css
import "react-spring-bottom-sheet/dist/style.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";
import LottieComponent from "../../LottieComponent";


// 당첨 바텀 시트
const BottomSheetPrize = ({ closeHundredPopup }) => {

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
          <div className={`${styleModal.modalHeader} ${styleRettoModal.btnNone}`}>
            <button
              type="button"
              className={styleModal.slideCloseBtn}
              onClick={closeHundredPopup}
            ></button>
          </div>
        </>
      }
    >
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.rettoPrize}`}>
        <h2>와우! 축하해요!</h2>
        <p>
          1등 당첨이네요! <br />
          지금 당첨금을 찾아가세요.
        </p>
        <LottieComponent animationData={GiftBox} isPaused delay={500} speed={2} />
        <Button>바로 달려가기</Button>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetPrize;
