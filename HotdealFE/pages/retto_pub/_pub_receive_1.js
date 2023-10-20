import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleReceive from "../../styles/retto_pub/Receive.module.css";

// component
import Header from "../../components/retto_pub/common/Header";
import Button from "../../components/retto_pub/common/Button";
import LayerRettoInfo from "../../components/retto_pub/LayerRettoInfo";
import LayerRettoMoneyGet from "../../components/retto_pub/LayerRettoMoneyGet";
import LayerReceive from "../../components/retto_pub/LayerReceive";


const index = () => {
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

  // useEffect(() => {
  //   if (process.browser) {
  //     window.addEventListener("scroll", handleScroll);
  //   }
  // }, [isToolTip]);
  return (
    <>
      <Header title="내 당첨금 찾기"  sideBtn="" />
      <Container padding="30px 20px 128px">
        <div className={`${styleCommon.titleWrap}`}>
          <h2><b>이제 당첨금을 찾아 볼까요?</b></h2>
          <p className={styleReceive.subTitle}>
            내 당첨 내역이 맞는지 확인해 보세요!
          </p>
        </div>
        <div className={styleReceive.topConWrap}>
          <div className={`${styleReceive.borderBox} ${styleReceive.topCon}`}>
            <div className={styleReceive.lineBox}>
              <span className={styleReceive.turnText}>1071회차</span>
              <dl>
                <dt>2등</dt>
                <dd><span>머니</span>40,000원</dd>
              </dl>
              <dl>
                <dt>보너스미션</dt>
                <dd><span>포인트</span>5,000원</dd>
              </dl>
            </div>
            <div className={styleReceive.lineBox}>
              <span className={styleReceive.turnText}>1071회차</span>
              <dl>
                <dt>보너스미션</dt>
                <dd><span>포인트</span>1,000원</dd>
              </dl>
              <dl>
                <dt>보너스미션</dt>
                <dd><span>포인트</span>5,000원</dd>
              </dl>
            </div>
            <div className={styleReceive.lineBox}>
              <span className={styleReceive.turnText}>1071회차</span>
              <dl>
                <dt>보너스미션</dt>
                <dd><span>포인트</span>1,000원</dd>
              </dl>
              <dl>
                <dt>보너스미션</dt>
                <dd><span>포인트</span>5,000원</dd>
              </dl>
            </div>
            <div className={styleReceive.lineBox}>
              <span className={styleReceive.turnText}>1070회차</span>
              <dl>
                <dt>1등<span className={styleReceive.icon1}></span></dt>
                <dd><span>머니</span>100,000,000원</dd>
              </dl>
            </div>
            <div className={styleReceive.lineBox}>
              <span className={styleReceive.turnText}>1069회차</span>
              <dl>
                <dt>보너스미션</dt>
                <dd><span>포인트</span>1,000원</dd>
              </dl>
              <dl>
                <dt>보너스미션</dt>
                <dd><span>포인트</span>5,000원</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className={styleReceive.borderBox}>
          <span className={styleReceive.divider}></span>
          <dl className={styleReceive.large}>
            <dt>예상 실수령액</dt>
            <dd>78,051,000원</dd>
          </dl>
          <dl>
            <dt className={styleReceive.addicon}>당첨금</dt>
            <dd>100,051,000원</dd>
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
            <dd className={styleReceive.off}>-22,000,000원</dd>
          </dl>
        </div>
        <div className={styleReceive.btnWrap}>
          <Button>찾으러 가기</Button>
        </div>
      </Container>
      {/* 내 당첨금 찾기 */}
      {/* <LayerReceive /> */}
      {/* 신청 완료 레이어 */}
      {/* <LayerRettoMoneyGet /> */}
      {/* 제세공과금 설명 */}
    </>
  );
};

export default index;
