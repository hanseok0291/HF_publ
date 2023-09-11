import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../Button";


// 당첨 바텀 시트
const BottomSheetPresent = ({ isHundredOpen, closeHundredPopup }) => {

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
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.rettoPresent}`}>
        <h2>우와 연속 10번이에요!</h2>
        <p>
          축하 선물이 선물함에 도착했어요.
        </p>
        <div className={`${styleRettoModal.imgWrap} ${styleRettoModal.cu}`}></div>{/* cu starbucks class 추가 시 이미지 및 텍스트 변경 */}
        <Button>확인하러 가기</Button>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetPresent;
