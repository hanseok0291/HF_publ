import React, { useState, useEffect, useRef } from 'react';
import FadeIn from 'react-fade-in';

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleRanking from "../../styles/retto_pub/Ranking.module.css";


// component
import Container from "../../components/retto_pub/common/Container";
import Header from "../../components/retto_pub/common/Header";
import BottomSheetRankingTurn from '../../components/retto_pub/common/modal/BottomSheetRankingTurn';
import LayerRankingInfo from '../../components/retto_pub/LayerRankingInfo';

const index = () => {
  const data = [
    {
      rank: 4,
      rankChange: 50,
      state: 'up',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 5,
      rankChange: 40,
      state: 'down',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 6,
      rankChange: 'NEW',
      state: 'new',
      name: '이노베이션',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헬스케어',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    },
    {
      rank: 7,
      rankChange: '',
      state: 'none',
      name: '헥토파이낸셜',
      score: 4244
    }
  ];

  

  const [isBottom, setIsBottom] = useState(false);
  const listWrapRef = useRef(null);
  const listBoxRef = useRef(null);

  const checkIfScrolledToBottom = () => {
    const { scrollTop, scrollHeight, clientHeight } = listBoxRef.current;
    if (scrollTop + clientHeight === scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    const listBoxElement = listBoxRef.current;
    if (listBoxElement) {
      listBoxElement.addEventListener('scroll', checkIfScrolledToBottom);
    }
    return () => {
      if (listBoxElement) {
        listBoxElement.removeEventListener('scroll', checkIfScrolledToBottom);
      }
    };
  }, []);

  return (
    <>
      <Header title="리또 랭킹" sideBtn="안내" />
      <Container>
          {/* <div className={styleRanking.blindWrap}>
            <div className={styleRanking.characterImg}></div>
            <div className={styleRanking.deadline}>마감까지 <span>2일 07 : 00 : 00</span></div>
            <h3>
              마감 3일 전, <br />
              블라인드 기간이에요!
            </h3>
            <p>내 포인트: 1,147P</p>
            <button className={styleRanking.rankingCheckBtn}>포인트 30원으로 랭킹 확인</button>
          </div> */}
          <FadeIn delay={300}>
            <div>
              {/* 데이터 없음 type1 진행중 type2 랭킹발표 폭죽 type3 랭킹 발표 폭죽 x type4 */}
              <div className={`${styleRanking.topCon}`}>
                <div className={`${styleRanking.characterImg} ${styleRanking.type4}`}>
                  <span className={styleRanking.deco1}></span>
                  <span className={styleRanking.deco2}></span>
                  <span className={styleRanking.deco3}></span>
                  <span className={styleRanking.deco4}></span>
                  <span className={styleRanking.deco5}></span>
                  <span className={styleRanking.deco6}></span>
                </div>
                <div className={styleRanking.titleWrap}>
                  {/* 진행중 */}
                  {/* <h2>
                    리또만 있다면 <br />
                    <b>포인트 최대 100만원!</b>
                  </h2>
                  <div className={styleRanking.deadline}>
                    마감까지 <span>7일 07 : 00 : 00</span>
                  </div> */}
                  {/* 발표 */}
                  <h2>
                    축하해요 <br />
                    <b>이달의 랭킹왕!</b>
                  </h2>
                  <div className={styleRanking.deadline}>
                    리또만 있다면 누구나 도전!
                  </div>
                </div>
              </div>
              <div className={styleRanking.tierWrap}>
                <div className={`${styleRanking.tierBox} ${styleRanking.second}`}>
                  <div className={styleRanking.imgBox}></div>
                  <div className={styleRanking.textBox}>
                    <p className={styleRanking.name}>김*희</p>
                    <p className={styleRanking.score}>404,244점</p>
                  </div>
                </div>
                <div className={`${styleRanking.tierBox} ${styleRanking.first}`}>
                  <div className={styleRanking.imgBox}>
                    <span className={styleRanking.deco1}></span>  
                    <span className={styleRanking.deco2}></span>  
                    <span className={styleRanking.deco3}></span>  
                  </div> 
                  <div className={styleRanking.textBox}>
                    <p className={styleRanking.name}>김*희</p>
                    <p className={styleRanking.score}>404,244점</p>
                  </div>
                </div>
                <div className={`${styleRanking.tierBox} ${styleRanking.third}`}>
                  <div className={styleRanking.imgBox}></div>
                  <div className={styleRanking.textBox}>
                    <p className={styleRanking.name}>김*희</p>
                    <p className={styleRanking.score}>404,244점</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styleRanking.listWrap} ${isBottom ? styleRanking.bottom : ''}`} ref={listWrapRef}>
              {/* <div className={styleRanking.listEmpty}>
                아직 랭킹을 확인할 수 없어요.
              </div> */}
              <div className={styleRanking.myRanking}>
                {/* 랭킹 발표 리또 미보유 */}
                {/* <p className={styleRanking.completeText}>리또 받고 <b>랭킹 참여하자!</b></p> */}
                {/* 랭킹 발표 리또 x등 */}
                {/* <p className={styleRanking.completeText}>축하해요! <b>x등이에요.</b></p> */}
                {/* <>
                  <span className={styleRanking.number}>50</span>
                  <span className={`${styleRanking.state} ${styleRanking.new}`}>NEW</span>
                  <span className={styleRanking.name}>김헥토</span>
                  <span className={styleRanking.score}>5점</span>
                </> */}
                <>
                  <span className={styleRanking.name}>김헥토</span>
                  <span className={styleRanking.score}>5점</span>
                </>
                {/* <>
                  <span className={styleRanking.number}>50</span>
                  <span className={`${styleRanking.state} ${styleRanking.null}`}></span>
                  <span className={styleRanking.name}>김헥토</span>
                  <span className={styleRanking.score}>5점</span>
                </> */}
              </div>
              <ul className={styleRanking.listBox} ref={listBoxRef}>
                {
                  data.map(({rankChange, state, name, score }, index) => {
                    if (name.length <= 2) {
                      return name;
                    }
                    const firstChar = name.charAt(0);
                    const lastChar = name.charAt(name.length - 1);
                    const masked = '*'.repeat(name.length - 2);

                    const finalChar =  firstChar + masked + lastChar;
                    return (
                      <li key={index} style={{animationDelay: `${(index + 1) * 0.25}s`}}>
                        <span className={styleRanking.number}>{index + 4}</span>
                        <span className={`${styleRanking.state} ${state === 'up' ? styleRanking.up : '' } ${state === 'down' ? styleRanking.down : '' } ${state === 'new' ? styleRanking.new : '' } ${state === 'none' ? styleRanking.none : '' }`}>{rankChange}</span>
                        <span className={styleRanking.name}>{finalChar}</span>
                        <span className={styleRanking.score}>{score}점</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </FadeIn>
          <div className={styleRanking.turnNavWrap}>
              <div className={styleRanking.turnNavBox}>
                <button type="button" className={`${styleRanking.moveBtn} ${styleRanking.leftBtn}`}></button>
                <button type="button">
                  <p className={styleRanking.turnText}>2023년 8월</p>
                </button>
                <button type="button" className={`${styleRanking.moveBtn} ${styleRanking.rightBtn} off`}></button>
              </div>
            </div>
      </Container>
      {/* 회차 선택 */}
      {/* <BottomSheetRankingTurn /> */}
      {/* 랭킹 안내 */}
      <LayerRankingInfo beforeVersion={false} />
    </>
  )
}

export default index;
