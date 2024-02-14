import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";
import Toast from "../Toast";

// 레벨 변경 확인 모달
const ModalLevelChange = ({case1, case2}) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.levelChange}`}
    >
      <div className={styleModal.modalDialog}>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}>
          {/* 레벨 하향 시 styleRettoModal.leveldrop className 추가 */}
          <div className={`${styleRettoModal.jewelWrap} ${case1 ? styleRettoModal.leveldrop : styleRettoModal.noChange}`}>
          {/* 레벨 상향 시 styleRettoModal.noChange className 추가 */}
          {/* <div className={`${styleRettoModal.jewelWrap} ${styleRettoModal.noChange}`}> */}
            <span className="jewelImg diamond">{/* ruby emerald diamond className 추가 시 스타일 변경*/}
              {/* 레벨 하향시 나타나는 문구 */}
              {case1 && <span className={styleRettoModal.dropText}>최대 <b>1천만원</b></span>}
            </span>
            <span className={styleRettoModal.arrow}></span>
            <span className="jewelImg emerald">{/* ruby emerald diamond className 추가 시 스타일 변경*/}
              {/* 레벨 하향시 나타나는 문구 */}
              {case1 && <span className={styleRettoModal.dropText}>최대 <b>1백만원</b></span>}
            </span>
          </div>
          <div className={styleRettoModal.textWrap}>
            {/* 하향시 문구 */}
            {case1 && 
              <>
                <p className={styleRettoModal.mainText}>
                  루비 리또로 변경하면 <br /> 받을 수 있는 <b>당첨금이 줄어요</b>
                </p>
                <p className={styleRettoModal.subText}>그래도 <span>에메랄드 리또로 변경</span>할까요?</p>
              </>
            }
            {/* 상향시 문구 */}
            {case2 && 
              <>
                <p className={styleRettoModal.mainText}>
                  지금까지 진행한 레벨이 초기화되고 <br /> <b>다이아로 첫 스탬프가 </b> 찍혀요. 
                </p>
                <p className={styleRettoModal.subText}><span>10일 동안</span> 다른 레벨로 변경할 수 없어요.</p>
              </>
            }
          </div>
          <Button>변경하기</Button>
          <button type="button" className={styleRettoModal.bottomBtn}>닫기</button>
        </div>
      </div>
      <Toast>
        리또 레벨 변경을 신청했어요!
      </Toast>
      {/* <Toast>
        리또 레벨 변경이 취소됐어요!
      </Toast> */}
    </div>
  )
}

export default ModalLevelChange;
