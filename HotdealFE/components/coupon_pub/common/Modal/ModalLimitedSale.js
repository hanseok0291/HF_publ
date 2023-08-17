import rhp from "html-react-parser";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalLimitedSale = ({repeat}) =>  (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleModal.limitedSale}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={styleModal.modalContent}>
          <div className={styleModal.modalBody}>
            {repeat ? (
              <>
                <h2>한정 할인 상품<br /><em>내일 재오픈!</em></h2>
                <p>
                오늘은 전부 품절됐어요! <br />
                지금은 일반 상품만 구매 가능해요.
                </p>
              </>
            ): (
              <>
                <h2>한정 할인 상품은 <br />품절 됐어요!</h2>
                <p>지금은 일반 상품만 구매 가능해요.</p>
              </>
            )
            }
            
          </div>
          <div className={styleModal.modalFooter}>
            <button
              type="button"
              className={`${styleModal.btn} ${styleModal.btnConfirm} ${styleModal.background}`}
            >
              지금 구매하기
            </button>
            <button
              type="button"
              className={`${styleModal.btn} ${styleModal.btnConfirm} ${styleModal.modalClose}`}
            >
              {repeat ? "내일 다시 올게요": "다음에 하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

export default ModalLimitedSale;
