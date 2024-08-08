import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import GiftBox from "../../public/lotties/giftbox2.json";
import LottieComponent from './LottieComponent';

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";
import styleNotJoin from "../../styles/retto_pub/NotJoin.module.css";
import Button from './common/Button';
import FadeInSection from './common/FadeInSection';

const MyPageNotJoin = ({case1, case2}) => {
  const [isConOpen, SetIsConOpen] = useState(false);
  const handleClickIsCon = () => {
    SetIsConOpen(!isConOpen);
  }

  const duration = 300;

  return (
    <>
      <div className={styleNotJoin.container}>
        <FadeInSection>
          <div className={`${styleCommon.titleWrap} ${styleMyretto.titleWrap}`}>
            <p>무료로 자동 지급되는 리워드</p>
            <h2>매주 최대 1억원 당첨!</h2>
            <LottieComponent className={styleNotJoin.giftboxImg} animationData={GiftBox} isPaused delay={500} speed={2} />
          </div>
        </FadeInSection>
        {case1 &&
          <FadeInSection delay={200}>
            <div>
              <dl className={styleMyretto.borderBox}> 
                <dt className={styleMyretto.icon1}> 
                  <p className={styleMyretto.topTextBox}>내 보유 리또 <span className={styleMyretto.dday}>추첨 D-2</span></p>
                </dt>
                <dd><button type="button">1개</button></dd>
              </dl>
              <div className={`${styleMyretto.nextRetto} ${styleNotJoin.rettoListWrap}`}>
                <ul className={styleNotJoin.rettoList}>
                  <li>
                    <span className={styleNotJoin.ruby}></span>
                    <ul className={styleNotJoin.rettoNumberWrap}>
                      <li>6</li>
                      <li>12</li>
                      <li>14</li>
                      <li>26</li>
                      <li>40</li>
                      <li>45</li>
                    </ul>
                  </li>
                  <li>
                    <span className={styleNotJoin.emerald}></span>
                    <ul className={styleNotJoin.rettoNumberWrap}>
                      <li>6</li>
                      <li>12</li>
                      <li>14</li>
                      <li>26</li>
                      <li>40</li>
                      <li>45</li>
                    </ul>
                  </li>
                  <li>
                    <span className={styleNotJoin.diamond}></span>
                    <ul className={styleNotJoin.rettoNumberWrap}>
                      <li>6</li>
                      <li>12</li>
                      <li>14</li>
                      <li>26</li>
                      <li>40</li>
                      <li>45</li>
                    </ul>
                  </li>
                </ul>
                <button type='button' className={styleNotJoin.moreViewBtn}>더 많은 리또 보러가기</button>
              </div>
            </div>
          </FadeInSection>
        }
        {
          case2 &&
          <FadeInSection delay={300}>
            <div>
              <dl className={styleMyretto.borderBox}> 
                <dt className={styleMyretto.icon4}> 
                  <p className={styleMyretto.topTextBox}>다음주에 받을 리또</p>
                </dt>
                <dd><button type="button" className={styleMyretto.noArrow}>2개</button></dd>
              </dl>
              <div className={`${styleMyretto.nextRetto} ${styleNotJoin.rettoListWrap}`}>
                <ul className={styleNotJoin.rettoList}>
                  <li>
                    <span className={styleNotJoin.diamond}></span>
                    <ul className={styleNotJoin.rettoNumberWrap}>
                      <li>?</li>
                      <li>?</li>
                      <li>?</li>
                      <li>?</li>
                      <li>?</li>
                      <li>?</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInSection>
        }
        <FadeInSection delay={400}>
          <ul className={styleNotJoin.infoConWrap}>
            <li className={styleNotJoin.infoConBox}>
              <span className={styleNotJoin.numberText}>1</span>
              <p className={styleNotJoin.mainText}>리또 머니함에<br /><b>010PAY 머니 보관하기</b></p>
            </li>
            <li className={styleNotJoin.infoConBox}>
              <span className={styleNotJoin.numberText}>2</span>
              <p className={styleNotJoin.mainText}>매주 무료로<br /><b>리또 자동 지급 받기</b></p>
            </li>
            <li className={styleNotJoin.infoConBox}>
              <span className={styleNotJoin.numberText}>3</span>
              <p className={styleNotJoin.mainText}>최대 1억 당첨 행운의<br /><b>리또 즐기기</b></p>
            </li>
          </ul>
        </FadeInSection>
      </div>
      <div className={styleNotJoin.footerBtnWrap}>
        <Button>리또 받으러 가기</Button>
      </div>
    </>
  )
}

export default MyPageNotJoin;
