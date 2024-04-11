import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleRanking from "../../styles/retto_pub/Ranking.module.css";
import styleFillBox from "../../styles/retto_pub/FillBox.module.css";

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
        <div className={styleRanking.rettoInfoWrap}>
          <h4><em>리또 랭킹</em>이란?</h4>
          <p className={styleRanking.topText}>
            내가 모은 리또가 점수로 나온다? <br />
            <b>나의 리또 수 X 가중치로 집계되는 랭킹</b>
          </p>
          <p className={styleRanking.botText}>
            월별로 진행되며, 리또 1개라도 있다면 자동 참여 ! <br />
            리또 모아서 100만원 상금의 주인공이 되세요.
          </p>
        </div>
        <h4><span className={`${styleRanking.number} ${styleRanking.number1}`}></span>리또와 리또 랭킹 상금을 함께 받는 방법</h4>
        <ul className={`${styleRanking.wayCon}`}>
          <li>
            <b>첫번째</b>
            <p>
              010PAY 우리카드로 <br />
              1만원 이상 결제하고 리또 받기
            </p>
          </li>
          <li>
            <b>두번째</b>
            <p>
              리또 머니 보관하고 <br />
              매주 자동으로 리또 받기
            </p>
          </li>
          <li>
            <b>세번째</b>
            <p>
              친구한테 리또 선물하고 <br />
              리또 더 받기
            </p>
          </li>
        </ul>
        <h4><span className={`${styleRanking.number} ${styleRanking.number2}`}></span>리또 랭킹 운영 기준</h4>
        <div className={styleRanking.firstCon}>
          <p>리또 랭킹에 참여하고<br /><b>1등하면 100만원!</b></p>
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
        <h4><span className={`${styleRanking.number} ${styleRanking.number3}`}></span>리또 랭킹 산정 방법</h4>
        <div className={styleRanking.secondCon}>
          <ul>
            <li>
              <span className={styleRanking.left}>일별 점수: 현재 보유한 리또 레벨의 수량 x 가중치</span>
            </li>
            <li>
              <span className={styleRanking.left}>월별 점수: 일별로 집계된 점수의 총 합</span>
            </li>
            <li>
              <span className={styleRanking.left}>동점일 경우:</span>
              <div className={styleRanking.right}>
                <div>
                  <span className={styleRanking.iconDia}></span> 최대 보유 고객<span className={styleRanking.iconArrow}></span>
                  <span className={styleRanking.iconRuby}></span> 최대 보유 고객<span className={styleRanking.iconArrow}></span>
                </div>
                <div>
                  <span className={styleRanking.iconEmerald}></span> 최대 보유 고객
                </div>
              </div>
            </li>
          </ul>
          <table className={styleRanking.table}>
          <colgroup>
            <col width="80px"/>
            <col />
            <col width="80px" />
            <col width="80px" />
          </colgroup>
            <thead>
              <tr>
                <th>레벨</th>
                <th>보유 리또 수량 (A)</th>
                <th>가중치 (B)</th>
                <th>점수 (AxB)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>다이아</td>
                <td>10개</td>
                <td>x3</td>
                <td>30점</td>
              </tr>
              <tr>
                <td>에메랄드</td>
                <td>10개</td>
                <td>x2</td>
                <td>20점</td>
              </tr>
              <tr>
                <td>루비</td>
                <td>10개</td>
                <td>x1</td>
                <td>10점</td>
              </tr>
              <tr>
                <td colSpan={3}>일별 총 점수</td>
                <td>60점</td>
              </tr>
            </tbody>
          </table>
          <p className={styleRanking.botText}>* 위 표는 이해를 돕기 위한 예시입니다.</p>
        </div>
        <h4><span className={`${styleRanking.number} ${styleRanking.number4}`}></span>블라인드 기간</h4>
        <div className={`${styleRanking.firstCon} ${styleRanking.type3}`}>
          <p>마감 3일 전부터 <br /><b>랭킹 현황 비공개</b></p>
          <span className={styleRanking.smallText}>포인트 30원으로 랭킹 순위 확인 가능</span>
        </div>
        <h4><span className={`${styleRanking.number} ${styleRanking.number5}`}></span>랭킹 상금 및 수령 방법</h4>
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
          <div className={styleRanking.botBanner}>
            <p className={styleRanking.text1}>리또에 대해 더 알아보고 싶다면?</p>
            <p className={styleRanking.text2}>지금 바로 알아보기</p>
          </div>
        </div>
      </div>
      <div className={styleFillBox.noteWrap}>
        <p><span className={styleFillBox.alertIcon}></span>꼭 확인하세요</p>
        <ul>
          <li>리또 1장이라도 보유 시 리또 랭킹은 자동 참여 됩니다. </li>
          <li>리또 랭킹 운영 방침은 내부 사정에 따라 변경될 수 있습니다.</li>
          <li>반복되는 카드 결제/취소로 인한 부당한 행위 적발 시 리또 랭킹 참여 대상에서 제외될 수 있습니다.</li>
          <li>상금은 010PAY 포인트로 지급됩니다.  </li>
          <li>리또 랭킹의 상금 수령 기한은 당첨일로 부터 31일 내 입니다. </li>
          <li>010PAY 포인트 상금의 유효기간은 91일 이며,  미사용 상금은 자동 소멸됩니다.</li>
          <li>상금 수령기한내 미수령 시 자동 소멸됩니다. (이후 상금 수령 불가)</li>
          <li>010PAY 앱 탈퇴 시 보유 포인트는 소멸됩니다. </li>
          <li>010PAY 포인트 및 010PAY 머니 인당 보유 한도는 각 200만원으로, 보유 한도 초과 시 상금 리워드는 더 이상 적립되지 않습니다. </li>
          <li>본 이벤트는 헥토파이낸셜 에서 제공하며, 헥토파이낸셜의 사정에 따라 운영 방침이 변경/종료될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  )
}

export default LayerRankingInfo;
