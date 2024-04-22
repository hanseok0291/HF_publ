import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import styleMyretto from "../../../../styles/retto_pub/Myretto.module.css";
import "react-spring-bottom-sheet/dist/style.css";


// 미참여자 바텀 시트
const BottomSheetBanner = ({ isHundredOpen, closeHundredPopup }) => {

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
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.rettoBanner}`}>
        <h2>어떤 방법으로 받아 볼까요?</h2>
        <div className={styleMyretto.bannerWrap}>
          <div className={`${styleMyretto.bottomBox} ${styleMyretto.type1}`}>
            <a href="#">
              <p>1만원 결제마다 리또 1개</p>
              <h4 className={styleMyretto.addArrowBlack}>010PAY 우리카드로 받기</h4>
            </a>
          </div>
          <div className={`${styleMyretto.bottomBox} ${styleMyretto.type2}`}>
            <a href="#">
              <p>채워만 둬도 쌓이는 리또</p>
              <h4 className={styleMyretto.addArrowBlack}>머니 채우기로 받기</h4>
            </a>
          </div>
          <div className={`${styleMyretto.bottomBox} ${styleMyretto.type3}`}>
            <a href="#">
              <p>친구에게 리또 선물하고</p>
              <h4 className={styleMyretto.addArrowBlack}>친구와 같이 받기</h4>
            </a>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetBanner;
