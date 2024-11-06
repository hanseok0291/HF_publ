import React, { useState, useEffect, useRef } from 'react';

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";
import styleRettoTip from "../../styles/retto_pub/RettoTip.module.css";


// component
import Header from "../../components/retto_pub/common/Header";
import Container from "../../components/retto_pub/common/Container";
import FadeInSection from '../../components/retto_pub/common/FadeInSection';
import HomeTab from '../../components/retto_pub/HomeTab';


const Marquee = ({ children }) => {
  return (
    <div className={styleRettoTip.marquee}>
      <div className={styleRettoTip.marqueeContent}>
        <div>{children}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const index = () => {
  const animationRef = useRef(null);
  const botTextWrapRef = useRef(null);
  const [botTextWrapHeight, setBotTextWrapHeight] = useState(0);


  useEffect(() => {
    if(botTextWrapRef.current){
      setBotTextWrapHeight(botTextWrapRef.current.clientHeight);
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styleRettoTip.animation);
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(animationRef.current);


    return () => {
      observer.disconnect();
    }
  }, [botTextWrapHeight]);

  return (
    <>
      <Header />
      <HomeTab activeTab={5} />
      <Container isTab padding="0" backgroundColor="#fff" className={styleCommon.hidden}>
        <div className={styleRettoTip.topContent}>
            <h2 className={styleRettoTip.titleText}>
              최대 1억! 행운 <br />
              <span>리또 1등 당첨 TIP</span>
            </h2>
            <p className={styleRettoTip.subText}>리또를 많이 받는 방법부터 생생한 당첨 후기까지</p>
            <div className={styleRettoTip.visualImg}>
              1억원
              <span className={styleRettoTip.twinkle1}></span> 
              <span className={styleRettoTip.twinkle2}></span>
              <span className={styleRettoTip.twinkle3}></span>
            </div>
        </div>
        <div className={styleRettoTip.firstContent}>
          <div className={styleRettoTip.titleWrap}>
            <h3 className={styleRettoTip.titleText}>재테크가 되는 리워드 <br />이제 리또로 받아보세요</h3>
            <p className={styleRettoTip.subText}>
              010PAY만의 특별한 리워드 로또로, <br />
              로또 번호와 리또가 일치하면 <b>최대 1억</b> 당첨
            </p>
          </div>
          <div className={`${styleRettoTip.roundedBox} ${styleRettoTip.gradient}`} ref={animationRef}>
            <h4 className={styleRettoTip.titleText}>010PAY가 <span>당첨 명당</span>인 이유!</h4>
            <ul className={styleRettoTip.infoWrap}>
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.target}>매주 당첨 맛집</p>
                  <p className={styleRettoTip.people}>1등 4회 <span>당첨</span></p>
                  <p className={styleRettoTip.info}>*1141회 ~ 1144회 1등 당첨</p>
                </div>
              </li>
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.target}>리또 당첨</p>
                  <p className={styleRettoTip.people}>60만 건+</p>
                  <p className={styleRettoTip.info}>*24년 10월 기준 누적 리또 당첨자 수</p>
                </div>
              </li>
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.target}>1주 평균 당첨</p>
                  <p className={styleRettoTip.people}>3만 건+</p>
                  <p className={styleRettoTip.info}>*24년 7월 ~ 9월 누적 리또 당첨자 수</p>
                </div>
              </li>
            </ul>
          </div>
          <FadeInSection>
            <h3 className={styleRettoTip.subtitleText}>
            당첨금 외에도, <br />
            <span>리또 혜택은 무궁무진해요!</span>
            </h3>
          </FadeInSection>
          <FadeInSection>
            <ul className={`${styleRettoTip.roundedBox} ${styleRettoTip.gray} ${styleRettoTip.first}`}> 
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <p className={styleRettoTip.textWrap}>
                  시간낭비 짠테크 대신 <br />
                  <b>간단한 미션으로 편하니까!</b>
                </p>
              </li>
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <p className={styleRettoTip.textWrap}>
                  앱 내 구매, 카드 결제, 현금 등 <br />
                  <b>당첨금 활용처가 다양하니까!</b>
                </p>
              </li>
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <p className={styleRettoTip.textWrap}>
                  한 주 동안의 희망 <br />
                  <b>설렘으로 즐거우니까!</b>
                </p>
              </li>
            </ul>
          </FadeInSection>
        </div>
        <div className={styleRettoTip.secondContent}>
          <div className={styleRettoTip.subtitleWrap}>
            <h3 className={styleRettoTip.subtitleText}>1등 당첨이 진짜 되네요</h3>
            <h3 className={styleRettoTip.subtitleText}>리또 1등 당첨자들의 리얼 후기</h3>
          </div>
          <ul className={styleRettoTip.reviewWrap}>
            <li>
              <div className={styleRettoTip.leftBox}>
                <div className={styleRettoTip.imgWrap}>
                  <span className={styleRettoTip.count}>1141회</span>
                </div>
                <p className={styleRettoTip.name}>010PAY 회원 음**엘</p>
              </div>
              <div className={styleRettoTip.rightBox}>
                <h4>
                  리또 1등 당첨! <br />
                  꿈만 같아요.
                </h4>
                <p>
                  010PAY 체크카드부터 <br />
                  이용한 찐유저로서 보상받는 <br />
                  기분입니다.
                </p>
              </div>
            </li>
            <li>
              <div className={styleRettoTip.leftBox}>
                <div className={styleRettoTip.imgWrap}>
                  <span className={styleRettoTip.count}>1142회</span>
                </div>
                <p className={styleRettoTip.name}>010PAY 회원 박*규</p>
              </div>
              <div className={styleRettoTip.rightBox}>
                <h4>
                  생활비 걱정 없애는 <br />
                  1등 당첨!
                </h4>
                <p>
                  1등 당첨 늘 상상만 해봤는데,  <br />
                  진짜 당첨되니 답답한 마음이 <br />
                  뚫리는것 같아요.
                </p>
              </div>
            </li>
            <li>
              <div className={styleRettoTip.leftBox}>
                <div className={styleRettoTip.imgWrap}>
                  <span className={styleRettoTip.count}>1143회</span>
                </div>
                <p className={styleRettoTip.name}>010PAY 회원 이*선</p>
              </div>
              <div className={styleRettoTip.rightBox}>
                <h4>
                  조상님 꿈 꾸지 않고도 <br />
                  1등 당첨됐어요!
                </h4>
                <p>
                  특별한 꿈 많이 꾼다는데,  <br />
                  전 평소처럼 지내다가 1등 당첨 <br />
                  연락 받았어요!
                </p>
              </div>
            </li>
          </ul>
          <div className={styleRettoTip.subtitleWrap}>
            <h3 className={styleRettoTip.subtitleText}>리또는 다른 앱테크보다 쉬워요!</h3>
            <h3 className={styleRettoTip.subtitleText}>실제 유저들도 만족한 리워드 로또</h3>
          </div>
          <Marquee>
            <ul className={styleRettoTip.slideWrap}>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>블로거 에르*</p>
                  <p className={styleRettoTip.mainText}>
                    <span>매주 로또 사신다면 매우 추천!</span> <br />
                    짜잘한 혜택보다 확실해요. <br />
                    리또는 무료로 로또 사는 <br />
                    효과가 있어요.
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>블로거 길*</p>
                  <p className={styleRettoTip.mainText}>
                    리또가 쌓일수록 <br />
                    당첨 기대감 급상승 중! <br />
                    <span>웬만한 재테크보다 수익률<br /> 좋아요</span>
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>4월 리또 랭킹 1위 회원 곽*규</p>
                  <p className={styleRettoTip.mainText}>
                    이번에 리또 랭킹 1등으로 <br />
                    100만원을 받네요. <br />
                    <span>두달 동안 리또 17번 당첨</span> <br />
                    됐습니다!
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>블로거 혜무**</p>
                  <p className={styleRettoTip.mainText}>
                    <span>조건 따질 필요 없이</span> 스트레스 <br />
                    없는 재테크 가능해서 바쁜  <br />
                    직장인들에게도 추천
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>4월 리또 랭킹 2위 황*철</p>
                  <p className={styleRettoTip.mainText}>
                    선물 같은 리또 너무 좋아요. <br />
                    <span>4월만 10번 당첨에 이번에 <br />
                    리또 랭킹으로 추가 상금</span>까지  <br />
                    받았어요!
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>4월 리또 랭킹 4위 서*철</p>
                  <p className={styleRettoTip.mainText}>
                    <span>리또 3등에도 여러번 당첨 <br />
                    됐어요!</span> 덕분에 보너스 상금 <br />
                    까지 기쁘네요.
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
            </ul>
          </Marquee>
        </div>
        <div className={`${styleRettoTip.thirdContent}`}>
          <div className={styleRettoTip.textWrap}>
            <h4>이번 1등은 혹시 내 차례?</h4>
            <p>
              세 가지 다 하면 당첨 확률 UP! <br />
              리또 받을 방법을 선택해보세요.
            </p>
          </div>
          <div className={styleRettoTip.bannerWrap}>
            <div className={`${styleMyretto.bottomBox} ${styleMyretto.type4}`}>
              <a href="#">
                <p>쉬운 앱테크 찾는다면</p>
                <h4 className={styleMyretto.addArrowBlack}>머니함에 돈 보관하기</h4>
              </a>
            </div>
            <div className={`${styleMyretto.bottomBox} ${styleMyretto.type5}`}>
              <a href="#">
                <p>소액결제 자주 한다면</p>
                <h4 className={styleMyretto.addArrowBlack}>신용카드 결제하기</h4>
              </a>
            </div>
            <div className={`${styleMyretto.bottomBox} ${styleMyretto.type6}`}>
              <a href="#">
                <p>친구와 지인이 많다면</p>
                <h4 className={styleMyretto.addArrowBlack}>리또 선물하기</h4>
              </a>
            </div>
          </div>
        </div>
      </Container> 
    </>
  )
}

export default index;
