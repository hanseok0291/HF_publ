import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleReceive from "../../styles/retto_pub/Receive.module.css";

const LayerRettoMoneyGet = () => {

  return (
    <div className={styleCommon.layer}>
      <div className={styleCommon.layerHeader}>
        <h2>내 당첨금 찾기</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={styleReceive.moneyGetWrap}>
        <div className={styleReceive.titleWrap}>
          <h2>당첨금 수령  신청 완료 !</h2>
          <p>두근두근... 우리 곧 만나요!</p>
        </div>
        <div className={styleReceive.borderBox}>
          <dl>
            <dt>머니</dt>
            <dd>78,040,000원</dd>
          </dl>
          <div className={styleReceive.infoText}>
            <p className={styleReceive.topText}><span className={styleReceive.bank}><img src="../../images/coupon/logo/brand/bank1.png" alt="" />카카오뱅크789</span>를 입금 계좌로 선택했어요.</p>
            <p className={styleReceive.botText}>
              <b>5만원을 초과하는 당첨금</b>또는 <br />
              <b>머니 보유 한도(200만원) 초과</b> 시 <span>계좌로 입금</span>돼요.
            </p>
          </div>
        </div>
        <div className={`${styleReceive.borderBox} ${styleReceive.botCon} ${styleReceive.addTopDot}`}>
          <dl>
            <dt>포인트</dt>
            <dd>11,000원</dd>
          </dl>
          <p className={styleReceive.subText}>지금 바로 들어왔어요!</p>
        </div>
        <div className={styleReceive.grayBox}>
          <p><span>제세공과금 처리를 위해</span><b>신분증 사본을 꼭 제출해 주세요!</b></p>
          <CopyToClipboard text={"010pay_event@hecto.co.kr"}>
            <button type='button' className={styleReceive.email}>010pay_event@hecto.co.kr</button>
          </CopyToClipboard>
          <ul>
            <li>제출 기한은 당첨일로 부터 91일이며, <b>미제출 시 당첨 이 취소</b>돼요.</li>
            <li>제출일 기준 다음 달 15일 안에 당첨금이 지급돼요.</li>
            <li>신분증 사본은 제세공과금 처리를 위해서만 사용돼요.</li>
            <li>이메일 주소는 [내 리또 리스트] &gt; [당첨 안내]에서 다시 볼 수 있어요.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LayerRettoMoneyGet;
