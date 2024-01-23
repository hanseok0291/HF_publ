import React, { useEffect, useRef, useState } from 'react';
import BottomSheetTurnChoice from './common/modal/BottomSheetTurnChoice';

// style
import styleRettoList from "../../styles/retto_pub/RettoList.module.css";

const rettoNumber = [1, 6, 25, 29, 40, 43, 44];

const DrawInfo = ({case1, case2, case3, case4, case5, case6, case7}) => {
  const results = {
    win : {
      winState: true,
      size: 3,
      list: [
        {
          grade: '1등',
          money: '100,000,000원',
          jewel: 'diamond',
          number: [1, 6, 25, 29, 40, 44],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
          isBottom: [true, 'type1']
        },
        {
          grade: '1등',
          money: '100,000,000원',
          jewel: 'ruby',
          number: [1, 6, 25, 29, 40, 43],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
          isBottom: [true, 'type2']
        },
        {
          grade: '보너스',
          money: '40원',
          jewel: 'diamond',
          number: [1, 6, 25, 29, 40, 43],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
          isBottom: [true, 'type3']
        },
        {
          grade: '보너스',
          money: '100원',
          jewel: 'diamond',
          number: [1, 6, 25, 29, 40, 43],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
          isBottom: [true, 'type4']
        }
      ]
    },
    lose : {
      winState: false,
      size: 4,
      list: [
        {
          jewel: 'diamond',
          number: [1, 6, 25, 29, 40, 43],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
        },
        {
          jewel: 'diamond',
          number: [1, 6, 25, 29, 40, 43],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
        },
        {
          jewel: 'diamond',
          number: [1, 6, 25, 29, 40, 43],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
        }
      ]
    },
    standby: {
      winState: 'standby',
      size: 4,
      list: [
        {
          jewel: 'diamond',
          number: [1, 6, 25, 29, 40, 43],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
        },
        {
          jewel: 'diamond',
          number: [1, 6, 25, 29, 40, 43],
          info: [
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00'],
            ['회수', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
        },
        {
          jewel: 'diamond',
          number: [],
          info: [
            ['회수', '결제 취소', '2024.01.01 오전 09:00'],
            ['지급', '신용카드 결제', '2024.01.01 오전 09:00']
          ],
        }
      ]
    }
  }

  const [isFirstFixed, setIsFirstFixed] = useState(false);
  const [isSecondFixed, setIsSecondFixed] = useState(false);

  const firstObserveRef = useRef(null);
  const secondObserveRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (firstObserveRef.current) {
        const firstRect = firstObserveRef.current.getBoundingClientRect();
        console.log(firstRect.height)
        setIsFirstFixed(firstRect.top - 22 <= 0);
      }
      if (secondObserveRef.current) {
        const secondRect = secondObserveRef.current.getBoundingClientRect();
        setIsSecondFixed(secondRect.top - 160 <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {case7 &&
        <div className={styleRettoList.winBanner}>
          <a href="#"> 
            <b>당첨금 780,000원</b>이 쌓여있어요!
          </a>
        </div>
      }
      <div className={`${styleRettoList.drawInfoContainer} ${case1 ? styleRettoList.noRetto : styleRettoList.isRetto}`} ref={firstObserveRef}>
        <div className={`${styleRettoList.turnNavWrap} ${isFirstFixed ? styleRettoList.fixed : ''}`}>
          <div className={styleRettoList.turnNavBox}>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.leftBtn}`}></button>
            <button type="button">
              <p className={styleRettoList.turnText}>1701회차</p>
            </button>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.rightBtn} off`}></button>
            {!case5 && !case1 && <p className={styleRettoList.infoTextBox}><span>추첨 예정 리또</span>가 있어요!</p>}
          </div>
          <div className={styleRettoList.turnNavBox}>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.leftBtn}`}></button>
            <button type="button">
              <p className={styleRettoList.turnText}>1701회차</p>
            </button>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.rightBtn} off`}></button>
          </div>
        </div>
        <div className={styleRettoList.listWinWrap}>
          <div className={styleRettoList.drawResultWrap}>
            <ul className={`${styleRettoList.ballWrap}`}> 
            {/* <ul className={`${styleRettoList.ballWrap} ${styleRettoList.off}`}>  */}
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

                if(index === 6 ) {
                  return (
                    <>
                      <li key={index} className={`${styleRettoList.plus}`}><span></span></li>
                      <li key={index + 1} className={`${styleRettoList.ball} ${styleBall}`}><span>{item}</span></li>
                    </>
                  )
                } else {
                  return (
                    <li key={index} className={`${styleRettoList.ball} ${styleBall}`}><span>{item}</span></li>
                  )
                }
              })}
            </ul>
            <div className={styleRettoList.drawResultText}>
              <p>추첨일 2023.12.02 <span className={styleRettoList.dDay}>D-2</span></p>
              {/* 당첨 있을때 */}
              <p>수령기한 2024.03.02</p>
            </div>
          </div>
          {case5 &&
            <div className={styleRettoList.winPriceInfoWrap} ref={secondObserveRef}>
              <div className={`${styleRettoList.winPriceInfo} ${isSecondFixed ? styleRettoList.fixed : ''}`}>
                <p>1등 최대 당첨금</p>
                <p>1백만원</p>
                <p>1천만원</p>
                <p>1억원</p>
              </div>
            </div>
          }
          {case6 && 
            <ul className={styleRettoList.infoContentsWrap}>
              <li>
                <div className={styleRettoList.textBox}>
                  <span className={styleRettoList.indexText}>1</span>
                  <p>
                    1만원 이상 결제하고 <br />
                    <b>최대 1억 당첨 행운 받기</b>
                  </p>
                </div>
              </li>
              <li>
                <div className={styleRettoList.textBox}>
                  <span className={styleRettoList.indexText}>2</span>
                  <p>
                    리또 머니 보관하고 <br />
                    <b>매주 자동 리또 받기</b>
                  </p>
                </div>
              </li>
              <li>
                <div className={styleRettoList.textBox}>
                  <span className={styleRettoList.indexText}>3</span>
                  <p>
                    친구에게 선물코드 전달하고 <br />
                    <b>리또 더 받기</b>
                  </p>
                </div>
              </li>
            </ul>
          }
          {/* 리또 없음 */}
          {case1 && 
            <div className={styleRettoList.emptyList}>
              <p>받은 리또가 없어요.</p>
            </div>
          }
          {/* 당첨 */}
          {case2 && 
            <ResultList data={results.win} />
          }
          {/* 미당첨 */}
          {case3 && 
            <ResultList data={results.lose} />
          }
          {/* 추첨 예정 */}
          {case4 &&
            <ResultList data={results.standby} />
          }
        </div>
      </div>
      
      {/* <BottomSheetTurnChoice /> */}
    </>
  );
};

const ResultList = ({data: {winState, size, list}}) => {
  const [openList, setOpenList] = useState(true);

  const toggleList = () => {
    setOpenList(!openList)
  }

  return (
    <div className={`${styleRettoList.topConWrap} ${winState === true ? styleRettoList.win : ''}`}>
      <div className={`${styleRettoList.borderBox} ${styleRettoList.topCon}`}>
        {/* 클릭 영역 dl */}
        {
          winState !== 'standby' ? (
            <dl onClick={() => toggleList()} className={!openList ? styleRettoList.open : ''}>
              <dt>{winState === true ? '당첨': winState === false ? '미당첨' : ''}</dt>
              <dd><button type='button'>{size}개</button></dd>
            </dl>
          ) : (
            <dl>
              <dt><span className={styleRettoList.standbyIcon}></span>추첨 예정</dt>
              <dd><button type='button' className={styleRettoList.noArrow}>{size}개</button></dd>
            </dl>
          )
        }
        
        
      </div>
      {
        openList &&
        <ResultListItem list={list} />
      }
    </div>
  );
}

const ResultListItem = ({list}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleMenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      {
        list.map(({grade, money, jewel, number, info, isBottom}, index) => {
          const sortNumber = number.sort((a, b) => (a - b))
          return (
            <div className={`${styleRettoList.borderBox} ${styleRettoList.botCon}`} key={index}>
              {
                grade && 
                <div className={styleRettoList.winMoneyWrap}>
                  <span className={styleRettoList.gradeText}>{grade} 당첨</span>
                  <span className={styleRettoList.circle}></span>
                  <p className={styleRettoList.moneyText}>{money}</p>
                </div>
              }
              <dl onClick={() => toggleMenu(index)} className={`${styleRettoList.toggleBtn} ${sortNumber.length === 0 && styleRettoList.off} ${openIndex === index ? styleRettoList.open : ''}`}>
                <dt className={`${styleRettoList.jewelImg} ${jewel === 'diamond' ? styleRettoList.diamond : jewel === 'ruby' ? styleRettoList.ruby : jewel === 'emerald' ? styleRettoList.emerald :''}`}></dt>
                <dd>
                  {sortNumber.length > 0 ? 
                    <ul className={styleRettoList.myBallWrap}>
                      {sortNumber.map((item, index) => {
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

                        const discord = rettoNumber.includes(item) ? '' : 'discord';

                        return (
                          <li key={index} className={`${styleRettoList.ball} ${styleBall}  ${discord}`}><span>{item}</span></li>
                        )
                      })}
                    </ul> : 
                    <p>앗, 리또가 회수됐어요!</p>
                  }
                </dd>
              </dl>
              {
                openIndex === index &&
                <dl className={styleRettoList.resultInfoWrap}>
                  {info.map((infoItem) => {
                    const titleText = infoItem[1] === '결제 취소' ? <span className={styleRettoList.cancelText}>{infoItem[1]}</span> : infoItem[1] ;
                    return (
                      <>
                        <dt className={styleRettoList.dashDot}></dt>
                        <dd className={styleRettoList.resultInfo}>
                          <span className={styleRettoList.addText}>{infoItem[0]}</span>
                          <div className={styleRettoList.infoBox}>
                            <p className={styleRettoList.titleText}>{titleText}</p>
                            <p className={styleRettoList.dateText}>{infoItem[2]}</p>
                          </div>
                        </dd>
                      </>
                    )
                  })}
                </dl>
              }
              {
                isBottom &&
                <div className={styleRettoList.buttonWrap}>
                  {isBottom[1] === 'type1' && <button type='button'>당첨금 받기</button> }
                  {isBottom[1] === 'type2' && <p className={styleRettoList.ing}>수령 신청을 완료했어요! 곧 만나요~</p> }
                  {isBottom[1] === 'type3' && <p className={styleRettoList.complete}>당첨금을 찾아갔어요!</p> }
                  {isBottom[1] === 'type4' && <p className={styleRettoList.fail}>수령 기한이 끝났어요.</p> }
                </div>
              }
            </div>
          )
        })
      }
    </>
    
  );
}

export default DrawInfo;
