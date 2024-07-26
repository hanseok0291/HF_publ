import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleRettoList from "../../styles/retto_pub/RettoList.module.css";

const LayerWinInfo = () => {

  return (
    <div className={styleCommon.layer}>
      <div className={styleCommon.layerHeader}>
        <h2>당첨 안내</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={`${styleRettoList.winInfoWrap}`}>
      <h4><span className={`${styleRettoList.number} ${styleRettoList.number1}`}></span>당첨 리워드</h4>
        
        <table className={styleRettoList.table}>
          <colgroup>
            <col width="11%"/>
            <col width="73px" />
            <col width="68px" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th rowSpan="2">등수</th>
              <th rowSpan="2">실제 로또 <br/> 당첨 번호 일치</th>
              <th rowSpan="2">실제 로또 <br /> 당첨금</th>
              <th colSpan="3">당첨 레벨별 리워드</th>
            </tr>
            <tr>
              <th>다이아</th>
              <th>에메랄드</th>
              <th>루비</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="6" style={{verticalAlign: 'baseline'}}>1등</td>
              <td rowSpan="6" style={{verticalAlign: 'baseline'}}>6개</td>
              <td>100억 이상</td>
              <td>
                1억원</td>
              <td>
                1천만원</td>
              <td>
                1백만원</td>
            </tr>
            <tr>
              <td>50억 이상 ~
                100억 미만</td>
              <td>
                5천만원</td>
              <td>
                5백만원</td>
              <td>
                50만원</td>
            </tr>
            <tr>
              <td>20억 이상 ~
                50억 미만</td>
              <td>
                2천만원</td>
              <td>
                2백만원</td>
              <td>
                20만원</td>
            </tr>
            <tr>
              <td>10억 이상 ~
                20억 미만</td>
              <td>
                1천만원</td>
              <td>
                1백만원</td>
              <td>
                10만원</td>
            </tr>
            <tr>
              <td>5억 이상 ~ 
                10억 미만</td>
              <td>
                5백만원</td>
              <td>
                50만원</td>
              <td>
                5만원</td>
            </tr>
            <tr>
              <td>5억 미만</td>
              <td>
                2백만원</td>
              <td>
                20만원</td>
              <td>
                2만원</td>
            </tr>
            <tr>
              <td rowSpan="5" style={{verticalAlign: 'baseline'}}>2등</td>
              <td rowSpan="5" style={{verticalAlign: 'baseline'}}>5개 + <br />
                보너스 번호</td>
              <td>8천만 이상</td>
              <td>
                80만원</td>
              <td>
                8만원</td>
              <td>
                8천원</td>
            </tr>
            <tr>
              <td>6천만 이상 ~
                8천만 미만</td>
              <td>
                60만원</td>
              <td>
                6만원</td>
              <td>
                6천원</td>
            </tr>
            <tr>
              <td>4천만 이상 ~
                6천만 미만</td>
              <td>
                40만원</td>
              <td>
                4만원</td>
              <td>
                4천원</td>
            </tr>
            <tr>
              <td>2천만 이상 ~
                4천만 미만</td>
              <td>
                20만원</td>
              <td>
                2만원</td>
              <td>
                2천원</td>
            </tr>
            <tr>
              <td>2천만 미만</td>
              <td>
                10만원</td>
              <td>
                1만원</td>
              <td>
                1천원</td>
            </tr>
            <tr>
              <td>3등</td>
              <td>5개</td>
              <td style={{textAlign: 'center'}}>-</td>
              <td>
                2만원</td>
              <td>
                2천원</td>
              <td>
                2백원</td>
            </tr>
            <tr>
              <td>4등</td>
              <td>4개</td>
              <td style={{textAlign: 'center'}}>-</td>
              <td colSpan={3}>
                당첨 리또와 동일 레벨 리또 30개  
              </td>
            </tr>
            <tr>
              <td>5등</td>
              <td>3개</td>
              <td style={{textAlign: 'center'}}>-</td>
              <td colSpan={3}>
                당첨 리또와 동일 레벨 리또 3개
              </td>
            </tr>
          </tbody>
        </table>

        <h4><span className={`${styleRettoList.number} ${styleRettoList.number2}`}></span>1, 2등 당첨</h4>
        <ul className={styleRettoList.firstCon}>
          <li>
            <strong>5만원 이하</strong>
            <p>다음 달 10일 내 <br /> <b>머니로 지급</b></p>
          </li>
          <li>
            <strong>5만원 초과</strong>
            <p>다음 달 15일 내 <br /> <b>계좌로 지급</b></p>
          </li>
          <li>
            <strong>보유 한도 초과<span>(머니 200만원 기준)</span></strong>
            <p>다음 달 15일 내 <br /> <b>계좌로 지급</b></p>
          </li>
        </ul>
        <div className={`${styleRettoList.secondCon} ${styleRettoList.type2}`}>
          <p>5만원 초과 당첨금은 <br /> 제세공과금 처리를 위해 <br /><b>신분증 사본 제출 필수</b></p>
          <ul>
            <li>
              <CopyToClipboard text={"010pay_event@hecto.co.kr"} onCopy={() => alert("이메일 주소가 복사되었습니다.")}>
                <button type='button' className={styleRettoList.email}>010pay_event@hecto.co.kr</button>
              </CopyToClipboard>
            </li>
            <li>
              미성년자의 경우 법정대리인의 신분증 사본, <br />
              가족관계 증명서와 당첨금 수령 동의 제출 필수
            </li>
            <li>
              당첨일로부터 91일 내 미제출 시 당첨 취소
            </li>
          </ul>
        </div>
        <h4><span className={`${styleRettoList.number} ${styleRettoList.number3}`}></span>3등 당첨</h4>
        <div className={styleRettoList.secondCon}>
          <p>당첨금 확인 즉시 <br /><b>포인트 지급</b></p>
        </div>

        <h4><span className={`${styleRettoList.number} ${styleRettoList.number4}`}></span>4, 5등 당첨</h4>
        <div className={`${styleRettoList.secondCon} ${styleRettoList.type4}`}>
          <p>추첨 결과 업데이트 즉시 <br /><b>리또 지급</b></p>
        </div>
      </div>
    </div>
  )
}

export default LayerWinInfo;
