import React, { useState, useRef } from "react";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleReceive from "../../styles/retto_pub/Receive.module.css";
import styleApply from "../../styles/coupon_pub/Apply.module.css";
import styleModal from "../../styles/coupon_pub/Modal.module.css";

// component
import Container from "./common/Container";
import Header from "./common/Header";
import Button from "./common/Button";

const LayerRankingReceive = () => {
  const [isToolTip, setIsToolTip] = useState(false);// 툴팁
  const [toolTipPos, setToolTipPos] = useState(false);

  const toolTipRef = useRef();


  const handleClick = () => {
    console.log(toolTipRef.current.getBoundingClientRect().top, window.innerHeight/ 1.2);
    setIsToolTip(!isToolTip)
    if(!isToolTip) {
      if(toolTipRef.current.getBoundingClientRect().top < window.innerHeight - 230) {
        setToolTipPos(true);
      } else {
        setToolTipPos(false);
      }
    }
  }

  return (
    <div className={styleCommon.layer}>
      <Header title="랭킹 상금 찾기" sideBtn=""/>
      <Container className={styleCommon.layerContainer}>
      <div className={`${styleCommon.titleWrap}`}>
          <h2><b>수령 신청 전 확인해 주세요!</b></h2>
          <p className={styleReceive.subTitle}>
          제세공과금 처리 관련 안내 사항이에요.
          </p>
        </div>
        <div className={styleReceive.topConWrap}>
          <div className={`${styleReceive.borderBox} ${styleReceive.topCon}`}>
            <div className={styleReceive.lineBox}>
              <span className={styleReceive.turnText}>2월 랭킹</span>
              <dl>
                <dt>2등<span className={styleReceive.icon1}></span></dt>
                <dd><span>포인트</span>500,000원</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className={styleReceive.borderBox}>
          <span className={styleReceive.divider}></span>
          <dl className={styleReceive.large}>
            <dt>예상 실수령액</dt>
            <dd>390,000원</dd>
          </dl>
          <dl>
            <dt className={styleReceive.addicon}>당첨금</dt>
            <dd>500,000원</dd>
          </dl>
          <dl>
            <dt className={styleReceive.addicon}>제세공과금
              <div className={styleReceive.toopTopWrap}>
                <span className={styleReceive.icon2} onClick={handleClick} ref={toolTipRef}></span>
                {isToolTip &&
                  <div className={`${styleReceive.tooltip} ${toolTipPos && styleReceive.reverse}`}>
                    <button type="button" className={styleReceive.closeBtn} onClick={handleClick}></button>
                    <h4>제세공과금이 붙어요!</h4>
                    <p>
                      소득세법 제 129조에 따라 <br />
                      <b>5만원을 초과하는 당첨금</b>은 <br />
                      <b>당첨금의 22% 제외 후 지급</b>돼요.
                    </p>
                    <span>당첨금 총액이 아닌 회차별로 계산</span>
                  </div>
                }
              </div>
            </dt>
            <dd>-110,000원</dd>
          </dl>
        </div>
        <div className={styleReceive.noticeWrap}>
          <h4>안내 사항</h4>
          <ul>
            <li>5만원 초과 당첨금이 있어 <b>신분증 사본 제출이 꼭 필요해요!</b> <br /><b>당첨일로부터 91일 내 미제출 시 당첨이 취소돼요.</b></li>
            <li>
              수령 신청 완료 전 <b>개인 정보 수집 관련 약관 동의가 꼭 필요해요!</b> <br />
              신분증 사본은 제세공과금 처리를 위해서만 사용되니 안심하세요.
            </li>
            <li>제출하실 주소는 수령 신청이 완료되면 안내해 드릴게요.</li>
          </ul>
        </div>
        <div className={`${styleReceive.btnWrap} ${styleReceive.noneFix}`}>
          <ul className={`${styleReceive.agreeList}`}>
            <li>
              <input type="checkbox" name="agree_01" id="agree_03_01" />
              <label htmlFor="agree_03_01">개인 정보 수집 이용 동의(필수)</label>
              <button type="button"></button>
            </li>
            <li>
              <input type="checkbox" name="agree_02" id="agree_03_02" />
              <label htmlFor="agree_03_02">고유 식별 정보 수집 및 이용 동의(필수)</label>
              <button type="button"></button>
            </li>
          </ul>
          <Button disabled={true}>상금 수령 신청하기</Button>
        </div>
      </Container>
  </div>
  )
}

export default LayerRankingReceive;
