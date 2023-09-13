import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";

const Stamp = () => {
  const [scrollState, setScrollState] = useState("top");
  const stampContainerRef = useRef();

  const stampContainerhandleScroll = () => {
    const scrollTop = stampContainerRef.current.scrollTop;
    const scrollBottom =
      stampContainerRef.current.scrollHeight -
      stampContainerRef.current.clientHeight -
      stampContainerRef.current.scrollTop;
    if (scrollTop < 1) {
      setScrollState("top");
    } else if (scrollBottom < 1) {
      setScrollState("bottom");
    } else {
      setScrollState("");
    }
  };

  useEffect(() => {
    if (stampContainerRef.current) {
      stampContainerRef.current.scrollTop =
        stampContainerRef.current.clientHeight;
    }
  }, []);

  return (
    <>
      <div className={`${styleCommon.titleWrap} ${styleMyretto.titleWrap}`}>
        <h2 className={styleMyretto.stampTitle}>도전~연속 리또 받기!</h2>
        <p className={styleMyretto.stampSubText}>
          머니 채우기로 매주 늘어가는 스탬프, <br />
          스탬프만큼 쌓여가는 리또와 쿠폰 선물!
        </p>
        <button type="button" className={styleMyretto.stampButton}>
          1억 행운 리또 받기
        </button>
        {/* 미참여자 */}
      </div>
      <div className={`${styleMyretto.stampBorderBox} emerald`}>
        {/* ruby emerald diamond className 추가 시 스타일 변경*/}
        <div className={styleMyretto.titleWrap}>
          <h4>
            MAX. <span className="jewelColor">다이아 리또</span>
          </h4>
          <button type="button">1주차</button>
        </div>
        <div className={`${styleMyretto.stampScrollWrap} ${scrollState}`}>{/* 초기 상태 일때 initial className 추가 */}
          <div
            className={`${styleMyretto.stampContainer}`}
            ref={stampContainerRef}
            onScroll={() => stampContainerhandleScroll()}
          >
            {/* <p className={styleMyretto.stampInfo}>최대 50주차까지만 보여요</p> */}
            <ul className={styleMyretto.stampWrap}>
              <li className="emerald">{/* ruby emerald diamond className 추가 시 스타일 변경*/}
                <div>
                  <span className="circle"></span>
                  <p>두근두근 <br />첫 스탬프</p>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>2주차</p>
                  <span className="stack stack2"></span>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>3주차</p>
                  <span className="stack stack3"></span>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>4주차</p>
                  <span className="stack stack4"></span>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>5주차</p>
                  <span className="stack stack5"></span>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>6주차</p>
                  <span className="stack stack5"></span>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>7주차</p>
                  <span className="stack stack5"></span>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>8주차</p>
                  <span className="stack stack5"></span>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>9주차</p>
                  <span className="stack stack5"></span>
                </div>
              </li>
              <li className="coupon">
                <div>
                  <span className="circle"></span>
                  <p>10주차</p>
                  <span className="stack stack5"></span>
                  <button type="button">띵동~선물 도착</button>
                  {/* <button type="button" className="disabled">선물이 사라졌어요</button> */}
                  {/* <img src="../../images/retto/stamp-starbucks.png" alt="스타벅스" /> */}
                  <img src="../../images/retto/stamp-cu.png" alt="cu" />
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>11주차</p>
                  <span className="stack stack5"></span>
                </div>
              </li>
              <li className="emerald">
                <div>
                  <span className="circle"></span>
                  <p>12주차</p>
                  <span className="stack stack5"></span>
                </div>
              </li>
              <li className="fail">
                <div>
                  <span className="circle"></span>
                  <p>13주차</p>
                  {/* <span className="stack stack5"></span> */}
                </div>
              </li>
              <li className="next">
                <div>
                  <span className="circle"></span>
                  {/* <p>14주차</p> */}
                  <p style={{color: "#ACACAC"}}>다음엔 <br /> 여기다 꾸욱~</p>
                  {/* <span className="stack stack5"></span> */}
                </div>
              </li>
              <li className="coupon">
                <div>
                  <span className="circle"></span>
                  <p>15주차</p>
                  {/* <span className="stack stack5"></span> */}
                </div>
              </li>
              <li>
                <div>
                  <span className="circle"></span>
                  <p>16주차</p>
                  {/* <span className="stack stack5"></span> */}
                </div>
              </li>
              <li>
                <div>
                  <span className="circle"></span>
                  <p>17주차</p>
                  {/* <span className="stack stack5"></span> */}
                </div>
              </li>
              <li>
                <div>
                  <span className="circle"></span>
                  <p>18주차</p>
                  {/* <span className="stack stack5"></span> */}
                </div>
              </li>
              <li>
                <div>
                  <span className="circle"></span>
                  <p>19주차</p>
                  {/* <span className="stack stack5"></span> */}
                </div>
              </li>
              <li>
                <div>
                  <span className="circle"></span>
                  <p>20주차</p>
                  {/* <span className="stack stack5"></span> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styleMyretto.botCon}>
          <a href="#" className={styleMyretto.button}>
            리또 레벨 변경
          </a>
          <a href="#" className={`${styleMyretto.button} ${styleMyretto.on}`}>
            자동 충전<span>ON</span>
          </a>
          {/* <a href="#" className={styleMyretto.button}>혜택 알림 켜기</a> */}
          {/* 혜택 알림 미동의 */}
        </div>
      </div>
      <div className={styleMyretto.bannerWrap} style={{ marginTop: 10 }}>
        <div className={`${styleMyretto.bottomBox} ${styleMyretto.type1}`}>
          <a href="#">
            <p>결제할 때마다 쌓이는 리또</p>
            <h4 className={styleMyretto.addArrowBlack}>신용카드 결제로 받기</h4>
          </a>
        </div>
      </div>
    </>
  );
};

export default Stamp;
