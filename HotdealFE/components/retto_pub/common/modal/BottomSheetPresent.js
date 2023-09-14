import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../Button";


// 당첨 바텀 시트
const BottomSheetPresent = ({ closeHundredPopup, case1 }) => {

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
        {!case1 ? 
          <>
            <h2>우와 연속 10번이에요!</h2>
            <p>축하 선물이 선물함에 도착했어요.</p>
          </>
          :
          <>
            <h2>선물이 사라져서 아쉬워요..!</h2>
            <p>91일 안에 받지 않아 사라졌어요.</p>
          </>
        }
        <div className={`${styleRettoModal.conWrap} ${case1 ? styleRettoModal.fail : ''}`}>{/*  추가 시 선물 증발 이미지 노출 */}
          <div className={`${styleRettoModal.imgWrap}`}>
            <img src="../../images/retto/stamp-present-01.png" alt="스타벅스" />
          </div>
          <p className={`${styleRettoModal.productName}`}>스타벅스 아이스 아메리카노</p>
          {/* <p>CU 2천원 할인권</p> */}
        </div>
        
        {!case1 ? <Button>확인하러 가기</Button> : <Button>확인했어요</Button>}
        
        
      </div>
    </BottomSheet>
  );
};

export default BottomSheetPresent;
