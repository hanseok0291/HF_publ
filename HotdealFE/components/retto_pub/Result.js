import React from "react";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleResult from "../../styles/retto_pub/Result.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";
import BottomSheetMissionSuccess from "./common/modal/BottomSheetMissionSuccess";
import BottomSheetMissionFail from "./common/modal/BottomSheetMissionFail";

const Result = ({case1, case2}) => {
  const rettoNumber = [1, 4, 14, 20, 40, 43, 27];

  return (
    // <div className={`${styleResult.resultWrap} ${styleResult.fail}`}> 미당첨시 styleResult.fail 추가
    <div className={`${styleResult.resultWrap} ${case1 ? styleResult.fail : ''}`}>
      <div className={styleResult.partyWrap}>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
        <span className={styleResult.item}></span>
      </div>
      <div className={`${styleCommon.titleWrap} ${styleResult.titleWrap}`}>
        <div className={styleResult.turnBox}><span className={styleResult.turn}>1070회차</span></div>
        {!case1 ?
          <>
            {!case2 ?
              <h2 className={styleResult.title}>세상에나, <em className={styleCommon.highlightBg}>1등 당첨</em>이에요 <br />저희가 다 기뻐요!</h2>
              :
              <h2 className={styleResult.title}><em className={styleCommon.highlightBg}>보너스 미션 성공!</em><br /> 소소한 행운이 찾아왔어요</h2>
            }
          </>
          :
          <h2 className={styleResult.title}>다음 기회가 있어요...!</h2>
        }
      </div>
      <div className={`${styleResult.rettoWrap}`}>
        <div className={styleResult.bgBox}></div>
        <ul className={`${styleResult.ballWrap}`}>
          {rettoNumber.map((item, index) => {
            let styleBall;
            if( 0 < item && item < 11){
              styleBall = "type1";
            } else if( 10 < item && item < 21 ) {
              styleBall = "type2";
            } else if( 20 < item && item < 31 ) {
              styleBall = "type3";
            } else if( 30 < item && item < 41 ) {
              styleBall = "type4";
            } else {
              styleBall = "type5";
            }
            
            return (
              <li key={index} className={`${styleResult.ball} ${styleBall}`}>
                <span>{item}</span>
                {index === 6 && <div className={styleResult.plusIcon}></div> }
              </li>
            )
          })}
        </ul>
        {/* 3등일때만 노출 */}
        {case2 && 
          <div className={styleResult.coinWrap}>
            <span className={styleResult.coin1}></span>
            <span className={styleResult.coin2}></span>
            <span className={styleResult.coin3}></span> 
          </div>
        }
      </div>
      <dl className={`${styleMyretto.borderBox} ${styleResult.borderBox}`}>
        <dt className={styleMyretto.icon1}>
          당첨된 내 리또
        </dt>
        <dd><button type="button">2개</button></dd>
      </dl>
      <dl className={`${styleMyretto.borderBox}`}>
        <dt className={styleMyretto.icon2}>내 당첨금</dt>
        <dd><button type="button" className={styleMyretto.off}>100,005,000원</button></dd>
      </dl>
      <div className={styleMyretto.bannerWrap}>
        <div className={`${styleResult.bonusMission}`}>
          <a href="#">
            <p>축하해요~ <b>자세한 미션 결과</b>를 확인해보세요!</p>
            {/* <p><b>보너스 미션 기회</b>는 어땠을지 확인해보세요!</p> */}
          </a>
        </div>
        <div className={`${styleMyretto.bottomBox} ${styleMyretto.type1}`}>
          <a href="#">
            <p>결제할 때마다 쌓이는 리또</p>
            <h4 className={styleMyretto.addArrowBlack}>신용카드 결제로 받기</h4>
          </a>
        </div>
        <div className={`${styleMyretto.bottomBox} ${styleMyretto.type2}`}>
          <a href="#">
            <p>채워만 둬도 쌓이는 리또</p>
            <h4 className={styleMyretto.addArrowBlack}>머니 채우기로 받기</h4>
          </a>
        </div>
      </div>
      {/* 미션 성곰 */}
      {/* <BottomSheetMissionSuccess /> */}
      {/* 미션 실패 */}
      {/* <BottomSheetMissionFail /> */}
    </div>
  );
};

export default Result;
