import { BottomSheet } from "react-spring-bottom-sheet";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";

const BottomSheetAccount = ({ closeHundredPopup, title="충전 계좌 선택" }) => {

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
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.account}`}>
        <h2>{title}</h2>
        <ul className={styleRettoModal.accountListWrap}>
          {/* default 대표 계좌 */}
          <li className={`${styleRettoModal.active} ${styleRettoModal.default}`}><img src="../../images/coupon/logo/brand/bank1.png" alt="" /> 신한</li>
          <li><img src="../../images/coupon/logo/brand/bank1.png" alt="" /> 우리 345</li> 
        </ul>
        <button type="button" className={styleRettoModal.accountAdd}>계좌 추가</button>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetAccount;
