import { useState } from "react";

//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleSlick from "../../../../styles/coupon_pub/Slick.module.css";

const ModalHundredArrivalCopy = () => {
  return (
    <>
      {/* 응모권 도착 */}
      {/* <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.hundredDealArrival} ${styleModal.open}`}
      >
        <div className={styleModal.modalDialog}>
          <div className={`${styleModal.modalContent}`}>
            <h4 className={styleModal.entryTitle}><span>응모권 1개 </span> 도착</h4>
            <p className={styleModal.entrySubtext}>
              이번 딜이 끝나면 사라져요. <br />
              응모 마감 전 사용해보세요<i>!</i>
            </p>
            <button type="button" className={styleModal.defaultBtn}>확인</button> 
          </div>
        </div>
      </div> */}
      {/* 선물하기 미션 성공 */}
      {/* <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.hundredDealArrival} ${styleModal.open}`}
      >
        <div className={styleModal.modalDialog}>
          <div className={`${styleModal.modalContent}`}>
            <h4 className={styleModal.entryTitle}>선물하기 미션 성공</h4>
            <p className={styleModal.entrySubtext}>
              친구가 선물을 확인하면 <br />
              응모권 5개가 생겨요<i>!</i>
            </p>
            <button type="button" className={styleModal.defaultBtn}>확인</button> 
          </div>
        </div>
      </div> */}
      {/* 미션응모권 룰렛 획득 */}
      <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.hundredDealArrival} ${styleModal.open}`}
      >
        <div className={styleModal.modalDialog}>
          <div className={`${styleModal.modalContent} ${styleModal.modalGet}`}>
            <h4 className={styleModal.entryTitle}><span>응모권 4개</span> 획득</h4>
            <p className={styleModal.entrySubtext}>
              이번 딜이 끝나면 사라져요. <br /> 
              지금 추가 응모에 사용해보세요<i>!</i>
            </p>
            <button type="button" className={styleModal.defaultBtn}>추가 응모하기</button> 
            <button type="button" className={styleModal.nextBtn}>다음에 하기</button> 
          </div>
        </div>
      </div>
      {/* 미션응모권 룰렛 획득 상품 1개 */}
      {/* <div
        className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.hundredDealArrival} ${styleModal.open}`}
      >
        <div className={styleModal.modalDialog}>
          <div className={`${styleModal.modalContent} ${styleModal.modalGet}`}>
            <h4 className={styleModal.entryTitle}><span>응모권 4개 </span> 획득</h4>
            <p className={styleModal.entrySubtext}>
              추가 응모에 <br /> 
              지금 바로 사용할게요<i>!</i>
            </p>
            <button type="button" className={styleModal.defaultBtn}>확인</button> 
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ModalHundredArrivalCopy;
