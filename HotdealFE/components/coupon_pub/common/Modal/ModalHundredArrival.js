import { useState } from "react";

//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleSlick from "../../../../styles/coupon_pub/Slick.module.css";

const ModalHundredArrival = ({type1, type2, type3, type4, type5}) => {
  return (
    <>
      {/* 응모권 도착 */}
      {type1 && (
        <div
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
        </div>
      )}
      {/* 선물하기 미션 성공 */}
      {type2 && (
        <div
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
        </div>
      )}
      {/* 100원딜 회차 없음 */}
      {type3 && (
        <div
          className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.hundredDealArrival} ${styleModal.open}`}
        >
          <div className={styleModal.modalDialog}>
            <div className={`${styleModal.modalContent} ${styleModal.modalGet}`}>
              <h4 className={styleModal.entryTitle}><span>응모권 1개</span> 획득</h4>
              <p className={styleModal.entrySubtext}>
                딜 오픈 후 응모해 주세요!
              </p>
              <button type="button" className={styleModal.defaultBtn}>확인</button> 
            </div>
          </div>
        </div>
      )}
      {/* 당일 첫 참여 & 100원딜 기응모자 */}
      {type4 && (
        <div
          className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.hundredDealArrival} ${styleModal.open}`}
        >
          <div className={styleModal.modalDialog}>
            <div className={`${styleModal.modalContent} ${styleModal.modalGet}`}>
              <h4 className={styleModal.entryTitle}><span>응모권 4개 </span> 획득</h4>
              <p className={styleModal.entrySubtext}>
                추가 응모에 지금 바로 사용할게요!
              </p>
              <button type="button" className={styleModal.defaultBtn}>확인</button> 
            </div>
          </div>
        </div>
      )}
      {/* 당일 첫 참여 & 100원딜 미참여 */}
      {type5 && (
        <div
          className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.hundredDealArrival} ${styleModal.open}`}
        >
          <div className={styleModal.modalDialog}>
            <div className={`${styleModal.modalContent} ${styleModal.modalGet}`}>
              <h4 className={styleModal.entryTitle}><span>응모권 1개 </span> 획득</h4>
              <p className={styleModal.entrySubtext}>
                지금 바로 응모하세요!
              </p>
              <button type="button" className={styleModal.defaultBtn}>확인</button> 
            </div>
          </div>
        </div>
      )}
    </>
    
  );
};

export default ModalHundredArrival;
