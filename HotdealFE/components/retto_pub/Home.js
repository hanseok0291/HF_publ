import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import FadeIn from 'react-fade-in';
import NewsTicker from 'react-advanced-news-ticker'
import YouTube from 'react-youtube';

// style
import "swiper/css/pagination";
import styleHome from "../../styles/retto_pub/styleHome.module.css";
import Button from './common/Button';
import LottieComponent from './LottieComponent';
import ConfettiLottie from "../../public/lotties/confetti.json";

// case1 추첨 예정 리또 있음 case2 영상 노출 case3 토스트 팝업 노출
const Home = ({case1, case2, case3}) => {
  // 슬라이드 내용
  const contents =[
    {
      indexText: '첫 번째',
      titleText: ['010PAY 우리카드 발급', '1만원 이상 결제할 때마다', '최대 1억 당첨 리또 자동 지급'],
      imgClass: ['card', 'receipt', 'money']
    },
    {
      indexText: '두 번째',
      titleText: ['리또 머니함에 머니 보관', '최대 1억 당첨 가능한', '리또 자동 지급'],
      imgClass: ['vault', 'money', 'present']
    },
    {
      indexText: '세 번째',
      titleText: ['친구에게 리또 선물하기', '친구가 내 선물코드 입력하면', '친구와 나, 모두 리또 받기'],
      imgClass: ['letter', 'code', 'present2']
    }
  ]
  const mainSectionRef = useRef(null);
  const videoRef = useRef();
  const [isThumbnail, setIsThumbnail] = useState(true);
  const [isToast, setIsToast] = useState(true);

  const onReady = (e) => {
    videoRef.current = e.target;
  }

  const onEnd = () => {
    setIsThumbnail(true);
  }

  const playVideo = () => {
    if(videoRef.current){
      videoRef.current.playVideo();
      setIsThumbnail(false);
    }
  }

  return (
    <div className={styleHome.container}>
      <div className={styleHome.visualSection}>
        <div className={styleHome.titleWrap}>
          <div className={styleHome.textWrap}>
            <FadeIn delay={150}>
              <div className={styleHome.prizeWrap}>
                <NewsTicker maxRows={1} rowHeight={18}>
                  <div>1099회 <span>4,567명 1등 당첨!</span></div>
                  <div>1099회 <span>4,567명 1등 당첨!</span></div>
                  <div>1099회 <span>4,567명 1등 당첨!</span></div>
                  <div>1099회 <span>4,567789798명 1등 당첨!</span></div>
                </NewsTicker>
              </div>
              <div>
                <p>자동 응모되는 무료 리워드 로또</p>
                <h2>
                  매주 최대<br /><span>1억원의 행운</span>
                </h2>
              </div>
              {
                case1 && (
                  <div className={styleHome.rettoSizeContainer}>
                    <h4>추첨 예정 리또</h4>
                    <div className={styleHome.rettoSizeWrap}>
                      <a href="#" className={styleHome.rettoSizeBox}>
                        <span className={styleHome.firstText}>1115회</span>
                        <span className={styleHome.secondText}>10개</span>
                      </a>
                      <a href="#" className={styleHome.rettoSizeBox}>
                        <span className={styleHome.firstText}>1116회</span>
                        <span className={styleHome.secondText}>12개</span>
                      </a>
                    </div>
                  </div>
                )
              }
            </FadeIn>
          </div>
          <p className={`${styleHome.balloonText} ${case1 && styleHome.isRetto}`}>리또번호와 로또번호가 일치하면 당첨!</p>
        </div>
        <div className={styleHome.character}></div>
        <span className={styleHome.hand}></span>
        <LottieComponent className={styleHome.confettiLottie} animationData={ConfettiLottie} isStopped autoplay={false} delay={1000}  />
      </div>
      <div className={styleHome.mainSectionWrap}>
        {case2 && (
          <div className={styleHome.videoContainer}>
            {/* <p className={styleHome.textWrap}>
              임원희가 알려주는 <br />
              <b>매주 리또를 얻는 3가지 방법</b>
            </p> */}
            <p className={styleHome.textWrap}>
              리또 머니함에 넣어만 두면 <br />
              <b>매주 알아서 쌓이는 리워드 로또란?</b>
            </p>
            <div className={styleHome.videoWrap}>
              <YouTube
                videoId={'0RJFok7VE8I'}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 0,       // 자동 재생 여부 (0: 자동 재생 안 함, 1: 자동 재생)
                    mute: 1,
                    rel: 0,
                    controls: 1
                  },
                }}
                //이벤트 리스너 
                onReady={onReady}
                onEnd={onEnd}
              />
              {/* type1 머니함 완벽가이드 type2 임원희 */}
              {isThumbnail && <button type='button' className={`${styleHome.thumbnail} ${styleHome.type1}`} onClick={playVideo}></button>}
            </div>
          </div>
        )}
        <div className={`${styleHome.mainSection} ${styleHome.firstSection}`} ref={mainSectionRef}>
          <HomeSwiper content={contents[0]} issueTarget={true} />
          {/* 신용카드 미발급  */}
          {/* <Button white large>신용카드 결제로 리또 받기</Button> */}
          {/* 이미 카드 신청한 고객 */}
          {/* <Button white large>카드 추천하고 리또 더 받기</Button> */}
        </div>
        <div className={styleHome.mainSection}>
          <HomeSwiper content={contents[1]}/>
          <ul className={styleHome.secondContent}>
            <li>
              <strong>추가 혜택 1</strong>
              <p>
                리또 받기 연속 성공하면 <br className={styleHome.foldSize} />
                매주 쌓이는 리또가 최대 5개
              </p>
            </li>
            <li>
              <strong>추가 혜택 2</strong>
              <p>
                에메랄드, 다이아 레벨 연속 10주 <br className={styleHome.foldSize} />
                성공할 때마다 쿠폰 선물
              </p>
            </li>
            <li>
              <strong>추가 혜택 3</strong>
              <p>
                리또 머니함에 머니 보관하고 <br className={styleHome.foldSize} />
                매일 100원딜 응모권 받기
              </p>
            </li>
          </ul>
          <Button white large>머니 채우기로 리또 받기</Button>
          {/* <Button white large>나의 리또 보러가기</Button> */}
        </div>
        <div className={styleHome.mainSection}>
          <HomeSwiper content={contents[2]}/>
          <Button white large>리또 선물하고 리또 받기</Button>
        </div>
        <div className={styleHome.bottomBanner}></div>
      </div>
      {case3 && isToast && (
        <div className={styleHome.toastWrap}>
          <div className={styleHome.toastBox}>
            <a href="#">
              <div className={styleHome.textWrap}>
                <span>1099회차</span>
                <p>오늘 리또를 2개 받았어요!</p>
              </div>
            </a>
            <button type='button' className={styleHome.closeBtn} onClick={() => setIsToast(false)}></button>
          </div>
        </div>
      )}
      
      <div className={`${styleHome.buttonWrap}`}>
        <Button large>리또 받기</Button>
      </div>
    </div>
  )
}

const HomeSwiper = ({content: {indexText, titleText, imgClass}, issueTarget=false}) => {
  // swiper option
  const swiperParams = {
    slidesPerView: 1,
    modules: [Pagination, Autoplay],
    pagination: true,
    autoplay: { delay: 2000, disableOnInteraction: false },
    loop: true
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const targetRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };
  
  // 특정 슬라이드로 이동하는 함수
  const goToSlide = (index) => {
    if (swiper) {
      swiper.slideToLoop(index);
    }
  };

  useEffect(() => {
    if (!swiper || !swiper.autoplay) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          swiper.autoplay.start();
        } else {
          swiper.autoplay.stop();
        }
      });
    }, { threshold: 0.8 });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [swiper]);

  return (
    <>
      <span className={styleHome.topBox}>{indexText}</span>
      <h4>
        {titleText.map((item, index) => (
          <span onClick={() => goToSlide(index)} className={currentIndex === index ? styleHome.active : ''} key={index}>{item}</span>
        ))}
      </h4>
      {issueTarget && <p className={styleHome.swiperSubtext}>발급 대상: 신청일 기준 민법상 성년(만 19세 이상) 내국인</p>}
      <Swiper {...swiperParams} onSlideChange={handleSlideChange} onSwiper={setSwiper} ref={targetRef}>
        {imgClass.map((imgItem, imgIndex) => (
          <SwiperSlide key={imgIndex}>
            <div className={`img-box ${imgItem}`}></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Home;
