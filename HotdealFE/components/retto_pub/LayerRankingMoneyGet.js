import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleReceive from "../../styles/retto_pub/Receive.module.css";

const LayerRankingMoneyGet = () => {

  return (
    <div className={styleCommon.layer}>
      <div className={styleCommon.layerHeader}>
        <h2>랭킹 상금 찾기</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={styleReceive.moneyGetWrap}>
        <div className={styleReceive.titleWrap}>
          <h2>랭킹 상금 수령 신청 완료 !</h2>
          <p>두근두근... 우리 곧 만나요!</p>
        </div>
        <div className={styleReceive.borderBox}>
          <dl>
            <dt>머니</dt>
            <dd>11,000원</dd>
          </dl>
          <div className={`${styleReceive.infoText} ${styleReceive.ranking}`}>
            <p className={styleReceive.topText}>5만원을 초과하는 상금은 22% 제외 후 지급해 드려요.</p>
            <p className={styleReceive.botText}>
              제출 서류를 확인해 주세요. <br />
              <b>보유 한도를 초과</b> 시 <span>적립 대기로 보관</span>돼요!
            </p>
          </div>
        </div>
        <div className={styleReceive.grayBox}>
          <p><span>제세공과금 처리를 위해</span><b>신분증 사본을 꼭 제출해 주세요!</b></p>
          <CopyToClipboard text={"010pay_event@hecto.co.kr"}>
            <button type='button' className={styleReceive.email}>010pay_event@hecto.co.kr</button>
          </CopyToClipboard>
          <ul>
            <li>당첨일로부터 91일 내 <b>미제출 시 당첨이 취소</b>돼요.</li>
            <li>당첨금은 제출일 기준 다음 달 15일 안에 지급돼요.</li>
            <li>신분증 사본은 제세공과금 처리를 위해서만 사용돼요.</li>
            <li>이메일 주소는 [내 리또 리스트] &gt; [당첨 안내]에서 다시 볼 수 있어요.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LayerRankingMoneyGet;
