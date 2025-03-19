import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";
import Toast from "../Toast";

// 레벨 변경 확인 모달
const ModalLevelChange = ({ case1, case2, case3, case4, case5 }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.levelChange}`}
    >
      <div className={styleModal.modalDialog}>
        <div
          className={`${styleModal.modalContent} ${styleRettoModal.modalContent}`}
        >
          {/* 레벨 하향 시 styleRettoModal.leveldrop className 추가 */}
          <div
            className={`${styleRettoModal.jewelWrap} ${styleRettoModal.leveldrop}`}
          >
            {/* 레벨 상향 시 styleRettoModal.noChange className 추가 */}
            {/* <div className={`${styleRettoModal.jewelWrap} ${styleRettoModal.noChange}`}> */}
            <span className="jewelImg diamond">
              {/* ruby emerald diamond className 추가 시 스타일 변경*/}
            </span>
            <span className={styleRettoModal.arrow}></span>
            <span className="jewelImg emerald">
              {/* ruby emerald diamond className 추가 시 스타일 변경*/}
            </span>
          </div>
          <div className={styleRettoModal.textWrap}>
            {/* 하향시 문구 */}
            {case1 && (
              <>
                <p className={styleRettoModal.mainText}>
                  에메랄드로 변경하면 <br /> 10주차 성공 <b>선물이 작아져요.</b>
                </p>
                <p className={styleRettoModal.subText}>
                  그래도 <span>에메랄드로 변경</span>할까요?
                </p>
              </>
            )}
            {case2 && (
              <>
                <p className={styleRettoModal.mainText}>
                  루비로 변경하면 <br /> 10주차 성공{" "}
                  <b>선물을 받을 수 없어요.</b>
                </p>
                <p className={styleRettoModal.subText}>
                  그래도 <span>루비로 변경</span>할까요?
                </p>
              </>
            )}
            {/* 상향시 문구 */}
            {(case3 || case4 || case5) && (
              <>
                <p className={styleRettoModal.mainText}>
                  <b>
                    발소 리워드 로또 머니함에
                    <br />
                    머니를 옮겨둘게요.
                  </b>
                </p>
                <p className={styleRettoModal.subText}>
                  언제든 출금할 수 있으니 안심하세요.
                </p>
              </>
            )}
          </div>
          <Button>변경하기</Button>
          <button type="button" className={styleRettoModal.bottomBtn}>
            닫기
          </button>
        </div>
      </div>
      <Toast>레벨 변경을 완료했어요!</Toast>
    </div>
  );
};

export default ModalLevelChange;
