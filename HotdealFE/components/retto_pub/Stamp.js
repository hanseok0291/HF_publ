import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import FadeIn from 'react-fade-in';
import YouTube from 'react-youtube';

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleRettoList from "../../styles/retto_pub/RettoList.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";

//나의 리또 case1 미신청자 case2 스탬프 10주까지만
const Stamp = ({case1, case2}) => {
  const [scrollState, setScrollState] = useState("top");
  const [isInfo, setIsInfo] = useState(false);
  const stampContainerRef = useRef();

  const infoBtnhandleClick = () => (
      setIsInfo(!isInfo)
  );

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
      <div className={`${styleRettoList.winBanner} ${styleRettoList.gift}`}>
        <a href="#"> 
          리또 선물하고 친구랑 같이 받아요!
        </a>
      </div>
      <div className={`${styleRettoList.winBanner} ${styleRettoList.card}`}>
        <a href="#"> 
          카드 추천인 적고 다이아 리또 받아요!
        </a>
      </div>
      <div className={`${styleRettoList.winBanner} ${styleRettoList.issue}`}>
        <a href="#"> 
          카드 추천하고 친구랑 다이아 리또 받아요!
        </a>
      </div>
      <div className={styleMyretto.stampBackground}>
        <FadeIn>
          <div className={styleMyretto.rewardContentWrap}>
            <h4>친구와 리또해요</h4>
            <div className={styleMyretto.textWrap}>
              <p className={styleMyretto.leftCon}><em className={styleMyretto.iconGift}></em><strong>0명</strong><span>리또 선물 성공</span></p>
              <p className={styleMyretto.rightCon}><span>보상 리또</span><strong>0개</strong></p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div className={styleMyretto.rewardContentWrap}>
            <h4>친구에게 카드 추천해요</h4>
            <div className={styleMyretto.textWrap}>
              <p className={styleMyretto.leftCon}><em className={styleMyretto.iconCard}></em><strong>0명</strong><span>카드 발급 성공</span></p>
              <p className={styleMyretto.rightCon}><span>보상 리또</span><strong>0개</strong></p>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <div className={`${styleMyretto.stampBorderBox}`}>
            {
              case1 && (
                <div className={styleMyretto.noApply}>
                  <div className={`${styleCommon.titleWrap} ${styleMyretto.titleWrap}`}>
                    <h2 className={styleMyretto.stampTitle}>도전~연속 리또 받기<i>!</i></h2>
                    <p className={styleMyretto.stampSubText}>
                      머니 채우기로 매주 늘어가는 스탬프, <br />
                      스탬프만큼 쌓여가는 리또와 쿠폰 선물!
                    </p>
                    <ul className={styleMyretto.stampWrap}>
                      <li className="diamond">
                        <div>
                          <span className="circle"></span>
                          <p>두근두근 <br />첫 스탬프</p>
                        </div>
                      </li>
                      <li className="diamond">
                        <div>
                          <span className="circle"></span>
                          <p>5주차</p>
                        </div>
                      </li>
                      <li className="coupon starbucks">
                        <div>
                          <span className="circle"></span>
                          <p>10주차</p>
                        </div>
                      </li>
                    </ul>
                    <button type="button" className={styleMyretto.stampButton}>
                      1억 행운 리또 받기
                    </button>
                  </div>
                </div>
              )
            }
            {!case1 && 
              <>
                <div className={styleMyretto.innerTitleWrap}>
                  <div className={`${styleMyretto.topCon} diamond`}>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
                    {/* <span className={styleMyretto.alertBox}>리또 머니함이 비어 있어요!</span> */}
                    {/* <span className={styleMyretto.alertBox}>이번 기회는 아쉽게 놓쳤어요!</span> */}{/* 스탬프 받기 이번주 실패 */}
                    {/* <span className={styleMyretto.alertBox}>혜택 알림이 꺼져있어요!</span> */}{/* 혜택 알림 미동의 */}
                    <span className={`${styleMyretto.alertBox} ${styleMyretto.blue}`}>1주 보관은 월요일부터 시작!</span>{/* 재신청 > 월요일 시작 전이라 보관은 미시작 상태 */}
                    {/* 채우기상자 off  */}
                    {/* <span className={`${styleMyretto.alertBox} ${styleMyretto.blue}`}>변경된 레벨은 월요일부터 적용!</span> */}
                    {/* 혜택 알림 미동의 */}
                    <span className="jewelImg"></span>
                    <div>
                      <p className={styleMyretto.jewelName}>
                        MAX. <span  className="jewelColor">다이아</span>
                        <button className={styleMyretto.weekInfoBtn} type="button">1주차</button>
                        {/* 혜택 알림 미동의 */}
                        <button className={styleMyretto.alarmOnBtn} type="button">알림 켜기</button>
                      </p>
                      <p className={styleMyretto.jewelInfo}>100만원 채워 관리 중이에요</p>
                      {/* <p className={styleMyretto.jewelInfo}>오늘밤 11시까지 다시 채워주세요<em className={styleMyretto.arrowBtn}></em></p> */}{/* 스탬프 당일 받기 실패 */}
                      {/* <p className={styleMyretto.jewelInfo}>월요일이 되기 전 다시 채워주세요<em className={styleMyretto.arrowBtn}></em></p> */}{/* 스탬프 받기 이번주 실패 */}
                      {/* <p className={styleMyretto.jewelInfo}>리또를 받으려면 알림을 꼭 켜주세요</p> */}{/* 혜택 알림 미동의 */}
                      {/* <p className={styleMyretto.jewelInfo}>월요일 전까지 50만원을 채워주세요<em className={styleMyretto.arrowBtn}></em></p> */}{/* 재신청 > 머니함 채운후 월요일 전에 다시 비웠을 때 */}
                      {/* <p className={styleMyretto.jewelInfo}>머니함에 50만원을 넣어뒀어요</p> */}{/* 재신청 > 월요일 시작 전이라 보관은 미시작 상태 */}
                      {/* <p className={styleMyretto.jewelInfo}>알림 설정하고 리또 받으세요</p> */}{/* 혜택 알림 미동의 */}
                    </div>
                  </div>
                </div>
                <div className={`${styleMyretto.stampScrollWrap} ${scrollState} ${case2 ? 'initial' : ''}`}>{/* 초기 상태 일때 initial className 추가 */}
                  <div
                    className={`${styleMyretto.stampContainer}`}
                    ref={stampContainerRef}
                    onScroll={() => stampContainerhandleScroll()}
                  >
                    <p className={styleMyretto.stampInfo}>최대 50주차까지만 보여요</p>
                    <ul className={styleMyretto.stampWrap}>
                      <li className="diamond">{/* ruby emerald diamond className 추가 시 스타일 변경*/}
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
                      {!case2 && 
                        <>
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
                        </>
                      }
                    </ul>
                  </div>
                </div>
              </>
            }
            
            {!case1 && 
              <div className={styleMyretto.botCon}>
                {/* <a href="#" className={styleMyretto.button}>
                  리또 레벨 변경
                </a> */}
                <p className={styleMyretto.button}>
                  <em className={styleMyretto.disabled}>리또 레벨 변경</em>
                  <button type="button" className={styleMyretto.infoBtn} onClick={infoBtnhandleClick}>
                    {isInfo && <span><b>2.11(수)</b>부터 레벨 변경 가능 <br /> 레벨 변경 후 <b>10일동안</b> 다른 레벨로 <br /> 변경할 수 없어요.</span>}
                  </button>
                </p>
              </div>
            }
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div className={styleMyretto.bannerWrap} style={{ marginTop: 10 }}>
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
            <div className={`${styleMyretto.bottomBox} ${styleMyretto.type3}`}>
              <a href="#">
                <p>친구에게 리또 선물하고</p>
                <h4 className={styleMyretto.addArrowBlack}>친구와 같이 받기</h4>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default Stamp;
