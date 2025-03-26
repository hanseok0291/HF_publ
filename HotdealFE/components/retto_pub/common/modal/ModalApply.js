import { useState } from "react";

//slick
import "slick-carousel/slick/slick.css";

import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import Button from "../Button";
import Toast from "../Toast";

const ModalApply = ({jewel, handleModalToggle}) => {
  const [agree, setAgree] = useState(null);

  const handleAgreeToggle = () => {
    setAgree(!agree);
  }

  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalCommon} ${styleModal.open} ${styleRettoModal.retto} ${styleRettoModal.applyAgree}`}
    >
      <div className={styleModal.modalDialog}>
        <button type="button" className={styleRettoModal.modalClose} onClick={handleModalToggle}>닫기</button>
        <div className={`${styleModal.modalContent} ${styleRettoModal.modalContent} ${jewel.eng}`}>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
          <div className='jewelImg'></div>
          <p className={styleRettoModal.mainText}>
            <b>{jewel.cash}만원까지</b> 채우면 <br /> 
            <b>{jewel.level} <span className="jewelColor">발소 리워드 로또</span></b> 받을 준비 끝!
          </p>
          <p className={styleRettoModal.subText}>부족한 머니는 충전 후 <br />머니함에 따로 넣어둘게요.</p>
          <div className={styleRettoModal.grayBox}>
            <dl>
              <dt>보유 일반 머니</dt>
              <dd>15,000원</dd>
            </dl>
            <dl>
              <dt>
                채우기
                <span className={styleRettoModal.accountWrap}><img src="../../images/coupon/logo/brand/bank1.png" alt="신한은행" />신한678</span>
              </dt>
              <dd className="jewelColor">85,000원</dd>
            </dl>
          </div>
          {/* 동의 미노출 영역 */}
          <div className={styleRettoModal.benefitAlertWrap}>
            <div className={styleRettoModal.text}>
              혜택 알림 동의
              <p className={styleRettoModal.innerText}>서비스 및 이벤트 관련 마케팅 정보를 받아요.</p>
            </div>
            <div className={`${styleRettoModal.toggleWrap} ${agree && styleRettoModal.checked}`} onClick={handleAgreeToggle}>
              <button type="button"></button>
            </div>
          </div>
          {/* 동의 미노출 영역 end */}
          <Button disabled={!agree}>좋아요</Button>
        </div>
      </div>
      {agree && <Toast>
        2023.08.31 <br />
        010PAY 마케팅 수신을 동의하셨습니다.
      </Toast>}
      {agree === false && <Toast>
        2023.08.31 <br />
        마케팅 수신 동의를 철회하셨습니다.
      </Toast>}
    </div>
  );
};

export default ModalApply;
