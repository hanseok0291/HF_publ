import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import FadeIn from 'react-fade-in';

// style
import "swiper/css/pagination";
import styleHome from "../../styles/retto_pub/styleHome.module.css";
import Button from './common/Button';

const Home = () => {
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
  const duration = 300;

  return (
    <div className={styleHome.container}>
      <div className={styleHome.visualSection}>
        <div className={styleHome.titleWrap}>
          <FadeIn delay={150}>
            <div className={styleHome.prizeWrap}>
              1099회 <span>4,567명 1등 당첨!</span>
            </div>
            <h2>
              <span>자동으로 응모되는 리워드 로또</span>
              매주 최대 1억원의 행운
            </h2>
            <p>
              무료로 받은 6개의 리또번호와 실제 로또번호가 <br />
              일치하면 누구나 최대 1억원 행운 당첨
            </p>
          </FadeIn>
        </div>
        <div className={styleHome.character}>
          <div className={styleHome.characterBox}>
            <span className={styleHome.img1}></span>
          </div>
          <div className={styleHome.itemBox}>
            <span className={styleHome.img3}></span> 
            <span className={styleHome.img2}></span>
          </div>
        </div>
      </div>
      <div className={styleHome.mainSection}>
        <HomeSwiper content={contents[0]}/>
        <div className={styleHome.firstContent}>
          <span className={styleHome.tip}>TIP</span>
          <p>
            친구와 나 모두 카드 발급받고 <br />사이좋게 <b>다이아 리또 25개</b>
          </p>
        </div>
        <Button white large>신용카드 결제로 리또 받기</Button>
      </div>
      <div className={styleHome.mainSection}>
        <HomeSwiper content={contents[1]}/>
        <ul className={styleHome.secondContent}>
          <li>
            <strong>추가 혜택 1</strong>
            <p>
              리또 받기 연속 성공하면 <br />
              매주 쌓이는 리또가 최대 5개
            </p>
          </li>
          <li>
            <strong>추가 혜택 2</strong>
            <p>
              연속 10주 성공할 때마다 <br />
              쿠폰 선물까지
            </p>
          </li>
        </ul>
        <Button white large>머니 채우기로 리또 받기</Button>
      </div>
      <div className={styleHome.mainSection}>
        <HomeSwiper content={contents[2]}/>
        <Button white large>리또 선물하고 리또 받기</Button>
      </div>
      <div className={styleHome.buttonWrap}>
        <Button large>리또 받기</Button>
      </div>
    </div>
  )
}

const HomeSwiper = ({content: {indexText, titleText, imgClass}}) => {
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
    }, { threshold: 0.5 });

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
      <h4 ref={targetRef}>
        {titleText.map((item, index) => (
          <span onClick={() => goToSlide(index)} className={currentIndex === index ? styleHome.active : ''} key={index}>{item}</span>
        ))}
      </h4>
      <Swiper {...swiperParams} onSlideChange={handleSlideChange} onSwiper={setSwiper}>
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
