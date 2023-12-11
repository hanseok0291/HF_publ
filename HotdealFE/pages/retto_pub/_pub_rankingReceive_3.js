import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleReceive from "../../styles/retto_pub/Receive.module.css";

// component
import Header from "../../components/retto_pub/common/Header";
import Button from "../../components/retto_pub/common/Button";
import LayerRankingReceive from "../../components/retto_pub/LayerRankingReceive";
import LayerRankingMoneyGet from "../../components/retto_pub/LayerRankingMoneyGet";
import BottomSheetRankingGive from "../../components/retto_pub/common/modal/BottomSheetRankingGive";
import BottomSheetRankingOpinion from "../../components/retto_pub/common/modal/BottomSheetRankingOpinion";


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
      <Header title="랭킹 상금 찾기"  sideBtn="" />
      <Container padding="30px 20px 128px">
        <div className={`${styleCommon.titleWrap}`}>
          <h2><b>랭킹 상금을 수령해 볼까요?</b></h2>
          <p className={styleReceive.subTitle}>
            내 등수와 상금이 맞는지 확인해 보세요!
          </p>
        </div>
        <div className={styleReceive.rankingBorderboxWrap}>
          <div className={`${styleReceive.borderBox} ${styleReceive.topCon}`}>
            <div className={styleReceive.lineBox}>
              <span className={styleReceive.turnText}>1월 랭킹</span>
              <dl>
                <dt>6등</dt>
                <dd><span>포인트</span>10,000원</dd>
              </dl>
              <div className={styleReceive.receiveBtnWrap}>
                <button type="button">상금 받기</button>
              </div>
            </div>
          </div>
          <div className={`${styleReceive.borderBox} ${styleReceive.topCon}`}>
            <div className={styleReceive.lineBox}>
              <span className={styleReceive.turnText}>2월 랭킹</span>
              <dl>
                <dt>2등<span className={styleReceive.icon1}></span></dt>
                <dd><span>포인트</span>500,000원</dd>
              </dl>
              <div className={styleReceive.receiveBtnWrap}>
                <button type="button">상금 받기</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* 당첨 모달 */}
      {/* <BottomSheetRankingGive /> */}
      {/* 당첨 소감 */}
      {/* <BottomSheetRankingOpinion /> */}
      {/* 신청 완료 */}
      {/* <LayerRankingMoneyGet /> */}
      {/* 랭킹 상금 찾기 */}
      <LayerRankingReceive />
    </>
  );
};

export default index;
