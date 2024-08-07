import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import NewsTicker from 'react-advanced-news-ticker'
import YouTube from 'react-youtube';

// style
import "swiper/css/pagination";
import styleHome from "../../styles/retto_pub/styleHome.module.css";
import Button from './common/Button';
import LottieComponent from './LottieComponent';
import ConfettiLottie from "../../public/lotties/confetti.json";
import FadeInSection from './common/FadeInSection';

// case1 추첨 예정 리또 있음 case2 토스트 팝업 노출
const Home = ({case1, case2}) => {
  // 슬라이드 내용
  const contents =[
    {
      indexText: '첫 번째',
      titleText: ['010PAY 우리카드', '결제 금액 1만원에 1개씩', '최대 1억원 당첨 리또 지급'],
      imgClass: ['card', 'receipt', 'money'],
      isVideo : true,
      videoText: ['010PAY 우리카드', '쓰기만 해도 행운이 쌓이는 리워드'],
      videoThumbnail: 'type3',
      videoId: '3TQnp7uW37c' //8ycblWwEfdU 임원희
    },
    {
      indexText: '두 번째',
      titleText: ['리또 머니함에 머니 보관', '최대 1억원 당첨 가능한', '리또 자동 지급'],
      imgClass: ['vault', 'money', 'present'],
      isVideo : true,
      videoText: ['리또 머니함에 넣어만 두면', '매주 알아서 행운이 쌓이는 리워드'],
      videoThumbnail: 'type1',
      videoId: '0RJFok7VE8I'
    },
    {
      indexText: '세 번째',
      titleText: ['친구에게 리또 선물하기', '친구가 내 선물코드 입력하면', '친구와 나, 모두 리또 받기'],
      imgClass: ['letter', 'code', 'present2'],
      isVideo : false,
      videoText: [],
      videoThumbnail: '',
      videoId: ''
    }
  ];

  // swiper option
  const reviewParams = {
    slidesPerView: "auto", 
    spaceBetween: 12,
    modules: [Autoplay],
    autoplay: { delay: 2000, disableOnInteraction: false },
    loop: true,
    
  };

  const reviews = [
    { 
      avatar: "img1",
      reviewer: "010PAY 회원 곽*규",
      content: ["리또 10번 이상 당첨!", "랭킹 100만원까지 감사합니다."]
    },
    { 
      avatar: "img2",
      reviewer: "머니***카페 *수",
      content: ["리또 이벤트 다 챙겼더니", "4만원 벌고 시작하네!"]
    },
    { 
      avatar: "img3",
      reviewer: "블로거 킴*",
      content: ["매주 리또 5장 받는데", "한 달 동안 2번 당첨됐어요!"]
    },
    { 
      avatar: "img4",
      reviewer: "블로거 에르*",
      content: ["짜잘한 혜택보다 로또 사는 효과!"]
    },
    { 
      avatar: "img5",
      reviewer: "꿈행**카페 김*",
      content: ["요즘 로또 명당 다니기", "귀찮은데 리또로 받으렵니다."]
    }
  ]
  const mainSectionRef = useRef(null);
  const [isToast, setIsToast] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const bottomToastRef = useRef(null);
  const [toastShow, setToastShow] = useState(true);

  const handleScrollEvent = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
      setToastShow(false);
    } else {
      setToastShow(true);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
  },[]);

  return (
    <div className={styleHome.container}>
      <div className={styleHome.visualSection}>
        <div className={styleHome.titleWrap}>
          <div className={styleHome.textWrap}>
            <FadeInSection>
              <div className={styleHome.prizeWrap}>
                <NewsTicker maxRows={1} rowHeight={18}>
                  <div>1099회 <span>4,567명 1등 당첨!</span></div>
                  <div>1099회 <span>4,567명 1등 당첨!</span></div>
                  <div>1099회 <span>4,567명 1등 당첨!</span></div>
                  <div>1099회 <span>4,567789798명 1등 당첨!</span></div>
                </NewsTicker>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
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
            </FadeInSection>
          </div>
          <p className={`${styleHome.balloonText} ${styleHome.isRetto}`}>리또번호와 로또번호가 일치하면 당첨!</p>
        </div>
        <div className={styleHome.character}></div>
        <span className={styleHome.hand}></span>
        <LottieComponent className={styleHome.confettiLottie} animationData={ConfettiLottie} isStopped autoplay={false} delay={1000}  />
      </div>
      <div className={styleHome.mainSectionWrap}>
        <Swiper {...reviewParams} className={styleHome.reviewWrap}>
          {
            reviews.map((item, index) => (
              <SwiperSlide key={index} className={styleHome.reviewContent}>
                <div className={`${styleHome.imgWrap} ${item.avatar}`}></div>
                <div className={styleHome.textWrap}>
                  <p className={styleHome.reviewer}>{item.reviewer}</p>
                  <p className={styleHome.content}>{item.content.map((item, idx) => <span key={idx}>{item} <br /></span>)}</p>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <h3 className={styleHome.middleTitle}>무료로 리또 받는 방법</h3>
        <div className={`${styleHome.mainSection} ${styleHome.firstSection}`} ref={mainSectionRef}>
          <HomeSwiper content={contents[0]} issueTarget={true} playingVideoId={playingVideoId}  setPlayingVideoId={setPlayingVideoId}/>
          {/* 신용카드 미발급  */}
          <Button white large>010PAY 우리카드로 리또 받기</Button>
          {/* 이미 카드 신청한 고객 */}
          {/* <Button white large>010PAY 우리카드 혜택 보기</Button> */}
        </div>
        <div className={styleHome.mainSection}>
          <HomeSwiper content={contents[1]} playingVideoId={playingVideoId} setPlayingVideoId={setPlayingVideoId}/>
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
          <HomeSwiper content={contents[2]} playingVideoId={playingVideoId}  setPlayingVideoId={setPlayingVideoId}/>
          <Button white large>리또 선물하고 리또 받기</Button>
        </div>
      </div>
      <div className={styleHome.noteWrap}>
        <h4>010PAY 우리카드 유의사항</h4>
        <ul className={styleHome.noteContent}>
          <li>010PAY 우리카드 연회비 : 국내전용, 해외겸용(Mastercard) : 12,000원</li>
          <li>
            상세혜택 및 이용조건은 카드를 발급받기 전에 <br />
            홈페이지(www.wooricard.com), 상품설명서 및 약관 등을 <br />
            통해 확인하시기 바랍니다.
          </li>
          <li>신용카드 발급이 부적정한 경우(개인신용평점 낮음 등) 카드발급이 제한될 수 있습니다.</li>
          <li>카드이용대금과 이에 수반되는 모든 수수료를 지정된 대금결제일에 상환합니다.</li>
          <li>
            금융소비자는 금융소비자보호법 제 19조 제1항에 따라 <br />
            해당상품 또는 서비스에 대하여 설명을 받을 권리가 있으며, <br />
            그 설명을 듣고 내용을 충분히 이해한 후 거래하시기 바랍니다.
          </li>
          <li className={styleHome.strongText}>
            상환능력에 비해 신용카드 사용액이 과도할 경우, <br />
            귀하의 개인신용평점이 하락할 수 있습니다.
          </li>
          <li className={styleHome.strongText}>개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.</li>
          <li className={styleHome.strongText}>
          일정기간 원리금을 연체할 경우, <br />
          모든 원리금을 변제할 의무가 발생할 수 있습니다.
          </li>
          <li className={styleHome.strongText}>
            연체이율: 회원별/이용상품별 정상이자율 + 최대 연 3% <br />
            (법정최고금리 연 20% 이내) <br />
            단, 연체발생 시점에 정상이자율이 없는 경우에는 아래와 같이 적용함
            <ul className={styleHome.innerContent}>
              <li>
                일시불거래 연체 시 : 거래발생시점의 최소 기간(2개월) <br />
                유이자 할부금리
              </li>
              <li>
                무이자할부거래 연체 시 : 거래발생시점의 동일한 <br />
                할부계약기간의 유이자 할부금리
              </li>
              <li>
                그 외의 경우 : 상사법정이율과 상호금융 가계자금대출금리* 중 높은 금리 적용
              </li>
              <li className={styleHome.grayText}>
                한국은행에서 매월 발표하는 가장 최근의 비은행 금융기관<br />
                가중평균대출금리(신규대출 기준)
              </li>
            </ul>
          </li>
          <li>
            ㈜헥토파이낸셜은 ㈜우리카드의 신용카드 회원 모집업무를 <br />
            대리·중개합니다.
          </li>
          <li>㈜헥토파이낸셜은 ㈜우리카드를 대리하거나 중개합니다.</li>
          <li>
            ㈜헥토파이낸셜은 ㈜우리카드의 금융상품에 대한 계약체결 권한이 없습니다.
          </li>
          <li className={styleHome.marginBottom}>㈜헥토파이낸셜은 금융관계법률에 따라 ㈜우리카드와 위탁계약을 체결한 금융상품 판매 대리·중개업자입니다.</li>
          <li>
            여신금융협회 심의필 제 2024 - C1h - 06370호 <br />
            (2024.05.28 ~ 2025.05.27)
          </li>
        </ul>
      </div>
      {case2 && isToast && (
        <div className={`${styleHome.toastWrap} ${!toastShow ? styleHome.toastHide : '' }`} ref={bottomToastRef}>
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

const HomeSwiper = ({content: {indexText, titleText, imgClass, isVideo, videoId, videoText, videoThumbnail}, issueTarget=false, playingVideoId, setPlayingVideoId}) => {
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
  const videoRef = useRef();
  const [isThumbnail, setIsThumbnail] = useState(true);

  const onReady = (e) => {
    videoRef.current = e.target;
  };
  

  const onEnd = () => {
    setIsThumbnail(true);
  }

  const playVideo = () => {
    if (videoRef.current) {
      setPlayingVideoId(videoId); // 현재 재생 중인 비디오 ID를 전역 상태에 저장
      videoRef.current.playVideo();
      setIsThumbnail(false);
    }
  };

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
    // 다른 비디오가 재생되면 현재 비디오 정지
    if (playingVideoId !== videoId && videoRef.current) {
      videoRef.current.pauseVideo();
    }
  }, [playingVideoId, videoId]);

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
      {isVideo && (
        <div className={styleHome.videoContainer}>
          <p className={styleHome.textWrap}>
            <span>{videoText[0]}</span>
            <b>{videoText[1]}</b>
          </p>
          <div className={styleHome.videoWrap}>
            <YouTube
              videoId={videoId}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0,// 자동 재생 여부 (0: 자동 재생 안 함, 1: 자동 재생)
                  rel: 0,
                  controls: 1
                },
              }}
              //이벤트 리스너 
              onReady={onReady}
              onEnd={onEnd}
              onPlay={() => setPlayingVideoId(videoId)}
            />
            {/* type1 머니함 완벽가이드 type2 임원희 */}
            {isThumbnail && <button type='button' className={`${styleHome.thumbnail} ${videoThumbnail}`} onClick={playVideo}></button>}
          </div>
        </div>
      )}
      <h4>
        {titleText.map((item, index) => (
          <span onClick={() => goToSlide(index)} className={currentIndex === index ? styleHome.active : ''} key={index}>{item}</span>
        ))}
      </h4>
      {issueTarget && (
        <>
          <p className={styleHome.swiperSubtext}>발급 대상: 신청일 기준 민법상 성년(만 19세 이상) 내국인</p>
          <p className={`${styleHome.swiperSubtext} ${styleHome.lastText}`}>결제 건당 최대 1,000개 지급</p>
        </>
      )}
      
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
