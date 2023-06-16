import { useState } from "react";

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import AddEntry from "../../100deal/AddEntry";
import InterestList from "../../100deal/InterestList";
import ResultItem from "../../100deal/ResultItem";

const ModalHundredResult = ({ isEntryOpen, closeEntryPopup }) => {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.hundredDeal} ${styleModal.open}`} onClick={closeEntryPopup}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideModal}`} onClick={handleContentClick}
      >
        <div
          className={`${styleModal.modalContent} ${styleModal.modalSelectAccount}`}
        >
          <div className={`${styleModal.modalHeader}`}>
            <button type="button" className={styleModal.slideCloseBtn} onClick={closeEntryPopup}></button>
          </div>
          <div className={`${styleModal.modalBody} ${styleModal.resultWrap}`}>
            <div className={styleModal.titleText}>
              <h4>양사랑님<br />당첨 축하드려요<em>💘</em></h4>
            </div>
            <div className={styleModal.botContent}>
              <div className={styleModal.textWrap}>
                <p className={styleModal.product}>죠스떡볶이 2인 세트</p>
                <p className={styleModal.subText}>
                  지금 선물함에 <br />
                  쿠폰이 도착했어요.
                </p>
              </div>
              <div className={styleModal.imgWrap}>
                <img src="../../../images/100deal/sample/img-02.png" alt="" />
              </div>
            </div>
            <button type="button" className={styleModal.defaultBtn}>확인하러 가기</button>
          </div>
        </div>
      </div>
    </div>
    // <div
    //   className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.hundredDeal} ${styleModal.open}`} onClick={closeEntryPopup}
    // >
    //   <div
    //     className={`${styleModal.modalDialog} ${styleModal.slideModal}`} onClick={handleContentClick}
    //   >
    //     <div
    //       className={`${styleModal.modalContent} ${styleModal.modalSelectAccount}`}
    //     >
    //       <div className={`${styleModal.modalHeader}`}>
    //         <button type="button" className={styleModal.slideCloseBtn} onClick={closeEntryPopup}></button>
    //       </div>
    //       <div className={`${styleModal.modalBody} ${styleModal.resultWrap}`}>
    //         <div className={`${styleModal.titleText} ${styleModal.fail}`}>
    //           <h4>양사랑님<br />정말 아쉬워요...</h4>
    //           <p>그래도 기회는 계속 찾아와요<i>!</i></p>
    //           <a href="#" className={styleModal.locate}>오늘의 딜 살펴보기</a>
    //         </div>
    //       </div>
    //       <ResultItem />
    //       <div className={styleModal.resultBtnWrap}>
    //         <button type="button" className={styleModal.defaultBtn}>확인</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
};

export default ModalHundredResult;
