//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';


//css
import 'swiper/css';
import "slick-carousel/slick/slick.css";
import styleHundredDeal from "../../../styles/coupon_pub/HundredDeal.module.css";
import styleModal from "../../../styles/coupon_pub/Modal.module.css";

//components
import Slider from "react-slick";
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/100deal/Header";
import ModalEntry from "../../../components/coupon_pub/common/Modal/ModalEntry";
import ModalHundredArrival from "../../../components/coupon_pub/common/Modal/ModalHundredArrival";
import ModalHundredInfo from "../../../components/coupon_pub/common/Modal/ModalHundredInfo";
import ModalEntryAdd from "../../../components/coupon_pub/common/Modal/ModalEntryAdd";


const Index = () => {
  const router = useRouter();
  const [totalSlides, setTotalSlides] = useState(0); // 슬라이드 개수 상태
  const [isEntryOpen, setIsEntryOpen] = useState(false);
  const [isEntryAddOpen, setIsEntryAddOpen] = useState(false);
  const [isHundredOpen, setIsHundredOpen] = useState(false);
  const [navFixed, setNavFixed] = useState(false);

  const tabRef = useRef();
  const firstConRef = useRef();
  const secondConRef = useRef();
  const thirdConRef = useRef();
  const botConRef = useRef();

  const closeHundredPopup = () => {
    setIsHundredOpen(false);
  }

  const openHundredPopup = () => {
    setIsHundredOpen(true);
  }

  const openEntryPopup = () => {
    setIsEntryOpen(true);
  }

  const closeEntryPopup = () => {
    setIsEntryOpen(false);
  }

  const openEntryAddPopup = () => {
    setIsEntryAddOpen(true);
  }

  const closeEntryAddPopup = () => {
    setIsEntryAddOpen(false);
  }

  const handleSlideChange = (swiper) => {
    setTotalSlides(swiper.slides.length); // 슬라이드 개수 업데이트
  };

  const handleSheetDismiss = () => {
    console.log('바텀 시트 닫힘');
  };

  const handleScroll = () => {
    let firstCon = firstConRef.current.getBoundingClientRect().top - 112;
    let secondCon = secondConRef.current.getBoundingClientRect().top - 112;
    let thirdCon = thirdConRef.current.getBoundingClientRect().top - 112;
    let botCon = botConRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().height;

    if (firstConRef.current !== null) {
      if(firstCon < 0){
        setNavFixed(true);
        for(let i = 0; i < tabRef.current.childElementCount ; i++) {
          tabRef.current.children[i].classList.remove("on");
        }
      } else {
        setNavFixed(false);
      }
      if (firstCon < 0 && secondCon > 0) {
        tabRef.current.children[0].classList.add('on');
      } else if(thirdCon < 0 || botCon < 1) {
        tabRef.current.children[2].classList.add('on');
      } else if(secondCon < 0 && thirdCon > 0) {
        tabRef.current.children[1].classList.add('on');
      }
    }
  };

  const handleScrollToContent  = (content) => {
    window.scrollTo({
      top: content.current.offsetTop - 111,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", handleScroll);
    }
  }, []);

  const bigSlide = {
    // loop: true,
    slidesPerView:"auto",
    spaceBetween: 15,
  };

  const smallSlide = {
    slidesPerView:2,
    spaceBetween: 11,
  }

  return (
    <Layout>
      <Header openHundredPopup={openHundredPopup} />
      <div className={styleHundredDeal.hundredDeal}>
        <div className={styleHundredDeal.topBanner}>
          첫 응모는 미당첨 시 <b>최대 1만 포인트 드려요</b><i>!</i>
        </div>
        <div className={styleHundredDeal.topContent}>
          <p>
            매주 월·수·금 찾아오는 <br />
            <span>100원 득템 찬스<i>!</i></span>
          </p>
        </div>
        <div className={`${styleHundredDeal.tabBtnWrap} ${navFixed && styleHundredDeal.fixed}`} ref={tabRef}>
          <button type="button" className="on" onClick={() => handleScrollToContent(firstConRef)}>오늘의 딜</button>
          <button type="button" onClick={() => handleScrollToContent(secondConRef)}>미션 응모권</button>
          <button type="button" onClick={() => handleScrollToContent(thirdConRef)}>라인업</button>
        </div>
        <div className={`${styleHundredDeal.borderContent} ${styleHundredDeal.todayDeal}`}>
          <h3 ref={firstConRef}>
            포인트 100원으로 <br />
            <strong>인기 상품에 응모해요</strong>
          </h3>
          <dl className={styleHundredDeal.endTime}>
            <dt>남은 응모 시간</dt>
            {/* <dt>오픈까지 남은 시간</dt> */}
            <dd>
              <span>0일</span><span>15</span><em>:</em><span>45</span><em>:</em><span>00</span>
            </dd>
          </dl>
          <Swiper {...bigSlide} className="bigSlide">
          <SwiperSlide>
              <div className="imgWrap">
                <img src="../../images/100deal/sample/img-01.png" alt="" />
              </div>
              <div className="textWrap">
                <span className="people">50명</span>
                <p className="brand">노보텔 앰베서더 서울 동대문 앰베서더 서울 앰베서더 서울 </p>
                <p className="product">2인 관람권 팝콘 관람권 팝콘 세트</p>
                <p className="price"><span className="before">36,000</span><span className="after">100원</span></p>
                <button type="button" onClick={openEntryPopup}>응모하기</button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="imgWrap complete">
                <img src="../../images/100deal/sample/img-01.png" alt="" />
                <div className="completeText"><p><span>5회</span><br />응모 완료</p></div>
              </div>
              <div className="textWrap">
                <span className="people">50명</span>
                <p className="brand">메가박스</p>
                <p className="product">메가박스 2인 관람권 팝콘 세트</p>
                <p className="price"><span className="before">36,000</span><span className="after">100원</span></p>
                <button type="button" disabled>내일 10시 당첨자 발표</button>
                {/* <button type="button" onClick={openEntryPopup}>응모하기</button> */}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="imgWrap">
                <img src="../../images/100deal/sample/img-01.png" alt="" />
              </div>
              <div className="textWrap">
                <span className="people">50명</span>
                <p className="brand">메가박스</p>
                <p className="product">2인 관람권 팝콘 세트</p>
                <p className="price"><span className="before">36,000</span><span className="after">100원</span></p>
                <button type="button" disabled>Coming Soon</button> 
                {/* <button type="button" onClick={openEntryPopup}>응모하기</button> */}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <a href="#" className={styleHundredDeal.midBanner}>
          <p>
            내가 이전에 응모한 <br />
            <b>100원딜 추첨 결과는?</b>
          </p>
        </a>
        <div ref={botConRef} className={`${styleHundredDeal.borderContent} ${styleHundredDeal.restContent}`}>
          <h4 ref={secondConRef}>
            추가 응모하면 당첨 확률 UP <br />
            <strong>미션하고 응모권 받아요<i>!</i></strong>
          </h4>
          <div className={styleHundredDeal.pdLR25}>
            <div className={styleHundredDeal.newBox}>
              <span>1**5 님이 <b>5회 추가로 응모했어요</b></span>
            </div>
            <ul className={styleHundredDeal.entryContent}>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  router.push({pathname:router.pathname, query:{...router.query, modalProvider:"true"}}, undefined, {scroll:false});
                }}>
                  <p>
                    꽝 없는 포인트 룰렛으로 <br />
                    <b>매일 응모권 받기</b>
                  </p>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>
                    100원딜 공유할 때마다 <br />
                    <b>무제한 추가 응모</b>
                  </p>
                </a>
              </li>
              <li>
                <a href="#">
                  <p>
                    친구에게 상품 선물할 때마다 <br />
                    <b>응모권 5개 받기</b>
                  </p>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 ref={thirdConRef}>
              그냥 놓치기엔 아쉬운 <br />
              <strong>다음 딜을 소개해요<i>!</i></strong>
            </h4>
            <div className={styleHundredDeal.dealContentBox}>
              <p className={styleHundredDeal.dealDate}><span className={styleHundredDeal.before}></span>02. 13 월<span className={styleHundredDeal.after}></span></p>
              <Swiper {...smallSlide} className={`smallSlide`} onAfterInit={handleSlideChange}>
                <SwiperSlide>
                  <div className="imgWrap">
                    <img src="../../images/100deal/sample/img-01.png" alt="" />
                  </div>
                  <div className="textWrap">
                    <span className="people">50명</span>
                    <p className="brand">올리브영</p>
                    <p className="product">올리브영 모바일 상품권 올리브영 모바일 상품권 올리브영 모바일 상품권 올리브영 모바일 상품권</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="imgWrap">
                    <img src="../../images/100deal/sample/img-01.png" alt="" />
                  </div>
                  <div className="textWrap">
                    <span className="people">50명</span>
                    <p className="brand">메가박스</p>
                    <p className="product">2인 관람권 팝콘 세트</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="imgWrap">
                    <img src="../../images/100deal/sample/img-01.png" alt="" />
                  </div>
                  <div className="textWrap">
                    <span className="people">50명</span>
                    <p className="brand">메가박스</p>
                    <p className="product">2인 관람권 팝콘 세트</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className={styleHundredDeal.dealContentBox}>
              <p className={styleHundredDeal.dealDate}><span className={styleHundredDeal.before}></span>02. 15 수<span className={styleHundredDeal.after}></span></p>
              <Swiper {...smallSlide} className={`smallSlide`} onAfterInit={handleSlideChange}>
                <SwiperSlide>
                  <div className="imgWrap">
                    <img src="../../images/100deal/sample/img-01.png" alt="" />
                  </div>
                  <div className="textWrap">
                    <span className="people">50명</span>
                    <p className="brand">메가박스</p>
                    <p className="product">2인 관람권 팝콘 세트</p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="imgWrap">
                    <img src="../../images/100deal/sample/img-01.png" alt="" />
                  </div>
                  <div className="textWrap">
                    <span className="people">50명</span>
                    <p className="brand">메가박스</p>
                    <p className="product">2인 관람권 팝콘 세트</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className={styleHundredDeal.dealContentBox}>
              <p className={styleHundredDeal.dealDate}><span className={styleHundredDeal.before}></span>02. 17 금<span className={styleHundredDeal.after}></span></p>
              <Swiper {...smallSlide} className={`smallSlide`} onAfterInit={handleSlideChange}>
                <SwiperSlide>
                  <div className="imgWrap">
                    <img src="../../images/100deal/sample/img-01.png" alt="" />
                  </div>
                  <div className="textWrap">
                    <span className="people">50명</span>
                    <p className="brand">메가박스</p>
                    <p className="product">2인 관람권 팝콘 세트</p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className={styleHundredDeal.prevDeal}>
              <a href="#"><b>지난 100원딜 상품</b>이 궁금하신가요?</a>
            </div>
          </div>
        </div>
        <div className={styleHundredDeal.botBtnWrap}>
          <div className={styleHundredDeal.btnBox}>
            <div>보유 응모권 <span>1</span></div>
            {/* <button type="button">응모권 받기</button> */}
            {/* <button type="button">추가 응모에 사용 </button> */}
            <button type="button" onClick={openEntryAddPopup}>첫 응모에 사용 </button>
          </div>
        </div>
      </div>
      {/* 응모하기 */}
      <ModalEntry isEntryOpen={isEntryOpen} openEntryPopup={openEntryPopup} closeEntryPopup={closeEntryPopup} />
      {/* 100원딜? */}
      <ModalEntryAdd isEntryAddOpen={isEntryAddOpen} openEntryAddPopup={openEntryAddPopup} closeEntryAddPopup={closeEntryAddPopup} />
      {/* 추가 응모 */}
      <ModalHundredInfo isHundredOpen={isHundredOpen} openHundredPopup={openHundredPopup} closeHundredPopup={closeHundredPopup} />
      {/* 응모권 도착 */}
      {/* <ModalHundredArrival /> */}
    </Layout>
  );
};

export default Index;
