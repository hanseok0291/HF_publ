import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import styleResult from "../../../../styles/retto_pub/Result.module.css";
import "react-spring-bottom-sheet/dist/style.css";


// 당첨 바텀 시트
const BottomSheetMissionSuccess = ({ open, close }) => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(true);
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
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.rettoMission}`}>
        <h2>짝짝, 보너스 미션 성공</h2>
        <div>
          <p className={`${styleRettoModal.bodyText} ${styleRettoModal.success}`}>
            기프티몰 구매까지 해서 <br />
            깔끔하게 미션 클리어~
          </p>
          <span className={`${styleRettoModal.successSubtext}`}>9. 25 - 10. 01 동안  <b>19,500원 구매</b>했네요</span>
        </div>
        {!dropdown && <button type="butotn" className={styleRettoModal.detailView} onClick={handleDropdown}>자세한 내용 보기</button>}
        {dropdown &&
          <div className={styleRettoModal.dropBox}>
            <h4>보너스 미션이란?</h4>
            <p><b>1등 당첨 번호 3개만 맞히면</b> 최대 1만 포인트 랜덤 지급!</p>
            <h4>참여 대상은?</h4>
            <p className={styleRettoModal.midText}>
              당첨 결과 발표 회차 직전 1주(월~일) 동안 <br />
              <span>기프티몰에서 5천원 이상 구매 시 OK!</span>
            </p>
            <h4>포인트 지급 방식은?</h4>
            <p>당첨 결과에서 <b>내 당첨금을 누르면 즉시 지급!</b></p>
          </div>
        }
      </div>
    </BottomSheet>
  );
};

export default BottomSheetMissionSuccess;
