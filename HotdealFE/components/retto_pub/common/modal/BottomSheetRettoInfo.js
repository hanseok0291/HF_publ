import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import styleCommon from '../../../../styles/retto_pub/Common.module.css';
import "react-spring-bottom-sheet/dist/style.css";

// 미참여자 바텀시트
const BottomSheetRettoInfo = ({ isHundredOpen, closeHundredPopup }) => {

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
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.rettoInfo}`}>
        <h2>리또 레벨 알아보기</h2>
        <p>
          선택 전 차분히 살펴보세요 <br />
          <b>레벨에 따라 최대 당첨금이 달라요!</b>
        </p>
        <div>
          <div className={`${styleCommon.jewelWrap} ${styleRettoModal.jewelWrap}`}>
            <div className={styleCommon.jewelBox}>
              <span className={styleCommon.jewelImg}></span>
              <p>Lv. 1 <span className={styleCommon.jewelColor}>루비</span></p>
            </div>
            <div className={`${styleCommon.jewelBox} ${styleRettoModal.jewelBox}`}>
              <span className={styleCommon.jewelImg}></span>
              <p>Lv. 2 <span className={styleCommon.jewelColor}>에메랄드</span></p>
            </div>
            <div className={styleCommon.jewelBox}>
              <span className={styleCommon.jewelImg}></span>
              <p>MAX. <span className={styleCommon.jewelColor}>다이아</span></p>
            </div>
          </div>
          <ul className={styleRettoModal.textWrap}>
            <li>
              <span>최대</span>
              <strong>1백만원</strong>
            </li>
            <li>
              <span>최대</span>
              <strong>1천만원</strong>
            </li>
            <li>
              <span>최대</span>
              <strong>1억원</strong>
            </li>
          </ul>
        </div>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetRettoInfo;
