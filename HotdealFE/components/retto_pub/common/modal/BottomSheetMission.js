import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import RettoSwiperItem from "../RettoSwiperItem";


// 당첨 바텀 시트
const BottomSheetMission = ({ open, close }) => {
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
        <h2>아직은 구매 금액이 부족해요</h2>
        <p>
          이번 주엔 <b>3,000원 구매</b>했네요
        </p>
        <div>
          <p className={styleRettoModal.bodyText}>
            <em className={styleRettoModal.highlightBg}>1072회차 보너스 미션 참여</em>를 원한다면? <br />
            5천원 이상인 이런 상품들을 추천해요!
          </p>
        </div>
        <RettoSwiperItem 
          paddingTop={25}
          paddingBottom={10}
        />
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

export default BottomSheetMission;
