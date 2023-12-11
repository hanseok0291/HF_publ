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
      <Container backgroundColor="#fff">
        <div className={styleRanking.blindWrap}>
          <div className={`${styleRanking.characterImg} ${styleRanking.end}`}></div>
          <div className={styleRanking.deadline}>마감되었어요!</div>
          <h3>
            랭킹은 10일 밤 12시 30분에 <br />
            발표됩니다!
          </h3>
        </div>
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
      {/* <LayerRankingInfo /> */}
    </>
  )
}

export default index;
