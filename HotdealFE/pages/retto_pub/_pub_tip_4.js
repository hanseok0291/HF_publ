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
  const emptyBoxRef = useRef(null);
  const botTextWrapRef = useRef(null);
  const [floatState, setFloatState ] = useState(3);//0 flaot 미노출, 1 스크롤 안내 노출, 2 포인트 지급 노출, 3 중복 참여 노출
  const [bannerFixed, setBannerFixed] = useState(true);
  const [botTextWrapHeight, setBotTextWrapHeight] = useState(0);

  const handleScroll = () => {
    if(floatState === 1){
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        setFloatState(2);
        setBotTextWrapHeight(botTextWrapRef.current.clientHeight);
      }
    }
    if(emptyBoxRef.current.getBoundingClientRect().bottom <= window.innerHeight - botTextWrapHeight){
      setBannerFixed(false);
    } else {
      setBannerFixed(true);
    }
  };

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    }
  }, [botTextWrapHeight]);

  return (
    <>
      <Header />
      <HomeTab activeTab={5} />
      <Container isTab padding="0" backgroundColor="#fff" className={styleCommon.hidden}>
        <div className={styleRettoTip.topContent}>
            <h2 className={styleRettoTip.titleText}>
              최대 1억! 당첨 행운 <br />
              <span>리또 활용 TIP</span>
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
            <h4 className={styleRettoTip.titleText}>지금 이순간에도 많은 사람들이<br />리또를 받아가고 있어요!</h4>
            <ul className={styleRettoTip.infoWrap}>
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.target}>리또 고객</p>
                  <p className={styleRettoTip.people}>60만 명+</p>
                  <p className={styleRettoTip.info}>*24년 5월 기준 누적 리또 지급 고객 수</p>
                </div>
              </li>
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.target}>리또 당첨자</p>
                  <p className={styleRettoTip.people}>2.5만 명+</p>
                  <p className={styleRettoTip.info}>*24년 5월 기준 누적 리또 당첨자 수</p>
                </div>
              </li>
              <li>
                <div className={styleRettoTip.imgWrap}></div>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.target}>매주 평균 당첨자</p>
                  <p className={styleRettoTip.people}>1천 명</p>
                  <p className={styleRettoTip.info}>*1097회 ~ 1120회 평균 당첨자 수</p>
                </div>
              </li>
            </ul>
          </div>
          <FadeInSection>
            <h3 className={styleRettoTip.subtitleText}>
              <span>50만 명이 반한 리또,</span> <br />
              다른 리워드와 어떻게 다르죠?
            </h3>
          </FadeInSection>
          <FadeInSection>
            <div className={`${styleRettoTip.roundedBox} ${styleRettoTip.gray} ${styleRettoTip.first}`}> 
              <h4>짠테크 대신 편한 앱테크</h4>
              <p>
                시간과 노력이 드는 앱테크 대신 <br />
                <b>간단한 미션으로 편하게 받는 리또</b>
              </p>
              <div className={styleRettoTip.mokup1}></div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className={`${styleRettoTip.roundedBox} ${styleRettoTip.gray}`}> 
              <h4>다양한 당첨금 활용 방법</h4>
              <p>
                당첨된 포인트와 머니는 <b>앱 내 구매 및 <br />
                카드 결제, 현금화</b>로 활용 가능
              </p>
              <div className={styleRettoTip.mokup2}></div>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className={`${styleRettoTip.roundedBox} ${styleRettoTip.gray}`}> 
              <h4>로또 마니아도 즐기는 무료 리워드</h4>
              <p>
                매주 리또와 로또 번호를 비교하며 <br />
                <b>한 주 동안의 기대와 설렘이 있는 리또</b>
              </p>
              <div className={styleRettoTip.mokup3}></div>
            </div>
          </FadeInSection>
        </div>
        <div className={styleRettoTip.secondContent}>
          <div className={styleRettoTip.subtitleWrap}>
            <h3 className={styleRettoTip.subtitleText}>리또가 많으면 행운이 찾아와요</h3>
            <h3 className={styleRettoTip.subtitleText}>리또 랭킹 당첨자들의 리얼 후기</h3>
          </div>
          <ul className={styleRettoTip.reviewWrap}>
            <li className={styleRettoTip.medal1}>
              <p className={styleRettoTip.name}>010PAY 회원 곽*규</p>
              <p className={styleRettoTip.titleText}>
                리또 랭킹으로 <br />
                100만 원 받았어요.
              </p>
              <p className={styleRettoTip.mainText}>
                두 달 동안 리또 17번 <br />
                당첨됐습니다! <br />
                010PAY 감사합니다.
              </p>
            </li>
            <li className={styleRettoTip.medal2}>
              <p className={styleRettoTip.name}>010PAY 회원 황*철</p>
              <p className={styleRettoTip.titleText}>
                선물같은 리또 <br />
                너무 좋아요.
              </p>
              <p className={styleRettoTip.mainText}>
                4월만 10번 당첨에 <br />
                이번에 리또 랭킹으로 <br />
                추가 상금까지 <br />
                받았어요!
              </p>
            </li>
            <li className={styleRettoTip.medal1}>
              <p className={styleRettoTip.name}>010PAY 회원 장*기</p>
              <p className={styleRettoTip.titleText}>
                리또 1등 노리는 <br />
                재미가 있어요!
              </p>
              <p className={styleRettoTip.mainText}>
                5월 당첨만 50번 넘게 <br />
                됐는데, 랭킹 1위까지 <br />
                하니 기쁩니다!
              </p>
            </li>
            <li className={styleRettoTip.medal2}>
              <p className={styleRettoTip.name}>010PAY 회원 권*영</p>
              <p className={styleRettoTip.titleText}>
                리또 정말 당첨이 <br />
                잘되네요!
              </p>
              <p className={styleRettoTip.mainText}>
                리또 3등에 여러 번 <br />
                당첨됐어요. 50만 원<br />
                상금까지 기분이 <br />
                짱입니다.
              </p>
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
                    짜잘한 혜택보다 확실해요. 리또는 <br />
                    무료로 로또 사는 효과가 있어요.
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
                    <span>웬만한 재테크보다 수익률 좋아요</span>
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>블로거 혜무**</p>
                  <p className={styleRettoTip.mainText}>
                    <span>조건 따질 필요 없이 </span> <br />
                    스트레스 없는 재테크 가능해서 <br />
                    바쁜 직장들에게도 추천
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>블로거 이*</p>
                  <p className={styleRettoTip.mainText}>
                    앱만 설치하면 누구나 쉽게 받는 <br />
                    리또! <span>100원딜, 기프티콘까지 <br />
                    추가 혜택도 좋아요~</span>
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
              <li>
                <div className={styleRettoTip.textWrap}>
                  <p className={styleRettoTip.name}>블로거 사진**</p>
                  <p className={styleRettoTip.mainText}>
                    머니 보관, 결제 둘 다 하는데 <br />
                    <span>다이아 리또가 잘 나와서 <br />
                    매주 주말만 기다립니다!</span>
                  </p>
                </div>
                <div className={styleRettoTip.imgWrap}></div>
              </li>
            </ul>
          </Marquee>
        </div>
        <div className={`${styleRettoTip.thirdContent} ${floatState !== 0 ? styleRettoTip.isFixed : ''} ${floatState === 2 ? styleRettoTip.type2 : ''}`}>
          <div className={styleRettoTip.textWrap}>
            <h4>이제, 리또를 받아볼까요?</h4>
            <p>
              {floatState === 0 ?
                <>
                  내 재테크 성향에 맞는 것으로 선택해 보세요!
                </>
                :
                <>
                  결제할 때마다 리또가 쌓이는 카드로 받아보세요.
                </>
              }
            </p>
          </div>
          {/* <div className={styleRettoTip.bannerWrap}>
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
          </div> */}
          {floatState !== 0 && 
            <div className={styleRettoTip.floatContent}>
              <div className={styleRettoTip.bottomBoxWrap}>
                <div className={styleRettoTip.emptyBox} ref={emptyBoxRef}></div>
                <div className={`${styleMyretto.bottomBox} ${styleMyretto.type5} ${styleRettoTip.bottomBox} ${bannerFixed ? styleRettoTip.fixed : ''} ${floatState === 2 ? styleRettoTip.type2 : '' }`}>
                  <a href="#">
                    <p>매주 로또산다면? 무료 리또</p>
                    <h4 className={styleMyretto.addArrowBlack}>010PAY 카드로 받기</h4>
                  </a>
                </div>
              </div>
              <div className={styleRettoTip.botTextWrap} ref={botTextWrapRef}>
                {floatState === 1 ?
                  <div className={styleRettoTip.textWrap}>
                    <div className={styleRettoTip.arrowWrap}>
                      <span></span>
                      <span></span>
                    </div>
                    <p className={styleRettoTip.text}>스크롤을 끝까지 내리면 <span>포인트 1천원</span> 증정!</p>
                  </div>
                  :
                  <div>
                    {
                      <>
                        {floatState === 2 &&
                          <>
                            <p className={`${styleRettoTip.text} ${styleRettoTip.coin}`}>
                              <span>포인트 1천원</span>이 지급되었어요!
                            </p>
                            <p className={styleRettoTip.subText}>쿠팡 7%적립 프로모션도 놓치지 마세요!</p>
                          </>
                        }
                        {floatState === 3 &&
                          <p className={`${styleRettoTip.text} ${styleRettoTip.coin}`}>
                            <span>포인트 1천원</span>을 이미 받으셨어요!
                          </p>
                        }
                      </>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </Container> 
    </>
  )
}

export default index;
