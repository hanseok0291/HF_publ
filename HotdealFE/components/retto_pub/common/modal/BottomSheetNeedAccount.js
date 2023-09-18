import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../Button";

const BottomSheetNeedAccount = ({ open, close }) => {
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
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.needAccount}`}>
        <h2>입금 계좌가 필요해요</h2>
        <p className={styleRettoModal.subTitle}>
          <b>5만원 초과 당첨 당첨금</b> 또는 <br />
          <b>머니 보유 한도(200만원) 초과</b> 시 <span>계좌로 입금</span>돼요.
        </p>
        
        <dl className={styleRettoModal.bankWrap}>
          <dt>입금 계좌</dt>
          <dd><button type="button"><img src="../../images/coupon/logo/brand/bank1.png" alt="" />카카오뱅크789</button></dd>
        </dl>
      </div>
      <div className={styleRettoModal.noticeWrap}>
        <h4>꼭 확인해 주세요!</h4>
        <ul>
          <li>5만원 초과 당첨금이 있어 <b>신분증 사본 제출이 꼭 필요해요!</b> <br /> 제출할 주소는 수령 신청이 완료되면 안내해 드릴게요.</li>
          <li>제출 기한은 당첨일로부터 91이며, <b>미제출 시 당첨이 취소</b>돼요.</li>
          <li>신분증 사본은 제세공과금 처리를 위해서만 사용돼요.</li>
        </ul>
        <div className={styleRettoModal.btnWrap}>
          <Button>수령 신청 완료</Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetNeedAccount;
