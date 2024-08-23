import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../Button";


// 당첨 바텀 시트
const BottomSheetPresent = ({ closeHundredPopup }) => {

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
      {/* 선물 증발 추가 */}
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.rettoPresent}`}>
        <h2>10주 연속 성공하셨네요!</h2>
        <p>쿠폰 선물함에서 선물을 확인하세요.</p>
        <div className={`${styleRettoModal.conWrap}`}>{/*  추가 시 선물 증발 이미지 노출 */}
          <div className={`${styleRettoModal.imgWrap}`}>
          </div>
        </div>
        <Button>확인하러 가기</Button>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetPresent;
