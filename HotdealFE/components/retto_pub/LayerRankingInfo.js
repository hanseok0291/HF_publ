import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleRanking from "../../styles/retto_pub/Ranking.module.css";

const LayerRankingInfo = () => {

  return (
    <div className={styleCommon.layer}>
      <div className={`${styleCommon.layerHeader} ${styleCommon.borderNone}`}>
        <h2>랭킹 안내</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={`${styleRanking.winInfoWrap}`}>
        <h4><span className={`${styleRanking.number} ${styleRanking.number1}`}></span>랭킹 운영 기준</h4>
        <div className={styleRanking.firstCon}>
          <p>랭킹에 참여하면 <br /><b>포인트 최대 100만원</b></p>
          <ul>
            <li>
              <span className={styleRanking.left}>참여 대상:</span><span className={styleRanking.right}>리또 보유 고객</span>
            </li>
            <li>
              <span className={styleRanking.left}>운영 기간:</span><span className={styleRanking.right}>월별 운영 <br /><em><i className={styleRanking.iconStar}></i>1일 00시 00분 00초 ~ 말일 23시 59분 59초</em></span>
            </li>
            <li>
              <span className={styleRanking.left}>결과 발표:</span><span className={styleRanking.right}>월집계 마감 후 익월 10일 00시 30분</span>
            </li>
            <li>
              <span className={styleRanking.left}>랭킹 기준:</span><span className={styleRanking.right}>월별 보유 누적 리또 점수 <br /><em><i className={styleRanking.iconStar}></i>순위는 일별로 업데이트</em></span>
            </li>
          </ul>
        </div>
        <h4><span className={`${styleRanking.number} ${styleRanking.number2}`}></span>랭킹 산정 방법</h4>
        <div className={styleRanking.secondCon}>
          <ul>
            <li>
              <span className={styleRanking.left}>동점일 경우:</span>
              <div className={styleRanking.right}>
                <div>
                  <span className={styleRanking.iconDia}></span> 최대 보유 고객<span className={styleRanking.iconArrow}></span>
                  <span className={styleRanking.iconRuby}></span> 최대 보유 고객<span className={styleRanking.iconArrow}></span>
                </div>
                <div>
                  <span className={styleRanking.iconEmerald}></span> 최대 보유 고객<span className={styleRanking.iconArrow}></span>
                  고객 이름 ‘가나다순’
                </div>
              </div>
            </li>
            <li>
              일별로 집계된 보유 리또 레벨 수량 x 가중치 <br />
              <span className={styleRanking.smallText}><i className={styleRanking.iconStar}></i>다이아 리또 보유 고객은 일별 보유장수 x3으로 점수가 계산돼요!</span>
            </li>
          </ul>
          <table className={styleRanking.table}>
          <colgroup>
            <col width="50%"/>
            <col width="50%" />
          </colgroup>
            <thead>
              <tr>
                <th>레벨</th>
                <th>가중치</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>다이아</td>
                <td>x3</td>
              </tr>
              <tr>
                <td>에메랄드</td>
                <td>x2</td>
              </tr>
              <tr>
                <td>루비</td>
                <td>x1</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4><span className={`${styleRanking.number} ${styleRanking.number3}`}></span>블라인드 기간</h4>
        <div className={`${styleRanking.firstCon} ${styleRanking.type3}`}>
          <p>마감 3일 전부터 <br /><b>랭킹 현황 비공개</b></p>
          <span className={styleRanking.smallText}>포인트 30원으로 랭킹 순위 확인 가능</span>
        </div>
        <h4><span className={`${styleRanking.number} ${styleRanking.number4}`}></span>랭킹 상금 및 수령 방법</h4>
        <div className={styleRanking.secondCon}>
          <ul>
            <li>
              <span className={styleRanking.left}>수령 기한: 랭킹 발표일로부터 31일</span>
            </li>
            <li>
              <span className={styleRanking.left}>5만원 이하 랭킹 상금: 수령 신청일 기준 즉시 포인트로 지급</span>
            </li>
            <li>
              5만원 초과 당첨금
              <div className={styleRanking.innerText}>
                : 제세공과금 처리를 위해 신분증 사본(미성년자의 경우 법정대리인의 신분증 사본, 가족관계 증명서와 당첨금 수령 동의) 제출 필수 <br />
                : 신분증 사본 제출일 기준 익월 10일 내 포인트로 지급
              </div>
            </li>
          </ul>
          <table className={styleRanking.table}>
          <colgroup>
            <col width="50%"/>
            <col width="50%" />
          </colgroup>
            <thead>
              <tr>
                <th>등수</th>
                <th>상금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1등</td>
                <td>포인트 100만원</td>
              </tr>
              <tr>
                <td>2등</td>
                <td>포인트 50만원</td>
              </tr>
              <tr>
                <td>3등</td>
                <td>포인트 20만원</td>
              </tr>
              <tr>
                <td>4-20등</td>
                <td>포인트 1만원</td>
              </tr>
            </tbody>
          </table>
          <p className={styleRanking.botText}><i className={styleRanking.iconStar}></i>포인트 상금의 유효기간은 91일이며, 미사용 상금은 이후 자동 소멸됩니다.</p>
          <div className={styleRanking.botBanner}>
            <p className={styleRanking.text1}>리또에 대해 더 알아보고 싶다면?</p>
            <p className={styleRanking.text2}>지금 바로 알아보기</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayerRankingInfo;
