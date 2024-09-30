import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import NewsTicker from "react-advanced-news-ticker";
import BoostUp from "../../public/lotties/boostup.json";
import ConfettiLottie from "../../public/lotties/confetti.json";

// style
import "swiper/css/pagination";
import styleHome from "../../styles/retto_pub/styleHome.module.css";
import Button from "./common/Button";
import LottieComponent from "./LottieComponent";
import FadeInSection from "./common/FadeInSection";

// case1 추첨 예정 리또 있음 case2 토스트 팝업 노출 case3 1등 당첨
const Home = ({ case1, case2, case3 }) => {
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
      content: ["리또 10번 이상 당첨!", "랭킹 100만원까지 감사합니다."],
    },
    {
      avatar: "img2",
      reviewer: "머니***카페 *수",
      content: ["리또 이벤트 다 챙겼더니", "4만원 벌고 시작하네!"],
    },
    {
      avatar: "img3",
      reviewer: "블로거 킴*",
      content: ["매주 리또 5장 받는데", "한 달 동안 2번 당첨됐어요!"],
    },
    {
      avatar: "img4",
      reviewer: "블로거 에르*",
      content: ["짜잘한 혜택보다 로또 사는 효과!"],
    },
    {
      avatar: "img5",
      reviewer: "꿈행**카페 김*",
      content: ["요즘 로또 명당 다니기", "귀찮은데 리또로 받으렵니다."],
    },
  ];

  const winnerList = ["김헥토"];
  const mainSectionRef = useRef(null);
  const [isToast, setIsToast] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const bottomToastRef = useRef(null);
  const [toastShow, setToastShow] = useState(true);

  const handleScrollEvent = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      setToastShow(false);
    } else {
      setToastShow(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <div className={styleHome.container}>
      <div className={styleHome.visualSection}>
        <div className={styleHome.titleWrap}>
          <div className={styleHome.textWrap}>
            <FadeInSection>
              <div className={styleHome.prizeWrap}>
                <NewsTicker maxRows={1} rowHeight={18}>
                  <div>
                    1099회 <span>4,567명 1등 당첨!</span>
                  </div>
                  <div>
                    1099회 <span>4,567명 1등 당첨!</span>
                  </div>
                  <div>
                    1099회 <span>4,567명 1등 당첨!</span>
                  </div>
                  <div>
                    1099회 <span>4,567789798명 1등 당첨!</span>
                  </div>
                </NewsTicker>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div>
                <p>자동 응모되는 무료 리워드 로또</p>
                {!case3 ? (
                  <h2>
                    매주 최대
                    <br />
                    <span>1억원의 행운</span>
                  </h2>
                ) : (
                  <h2>
                    1132회 <span>1등 당첨</span> <br />
                    김*토, 헥*토, K*R님, K***************R님 <br />
                    <span>축하드려요!</span>
                  </h2>
                )}
              </div>
            </FadeInSection>
            {case1 && (
              <div className={styleHome.rettoSizeContainer}>
                <FadeInSection delay={200}>
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
                </FadeInSection>
              </div>
            )}
          </div>
          {!case3 && (
            <p className={`${styleHome.balloonText} ${styleHome.isRetto}`}>
              리또번호와 로또번호가 일치하면 당첨!
            </p>
          )}
        </div>
        <div className={styleHome.character}></div>
        <span className={styleHome.hand}></span>
        <LottieComponent
          className={styleHome.confettiLottie}
          animationData={ConfettiLottie}
          isStopped
          autoplay={false}
          delay={1000}
        />
      </div>
      <div className={styleHome.mainSectionWrap}>
        <Swiper {...reviewParams} className={styleHome.reviewWrap}>
          {reviews.map((item, index) => (
            <SwiperSlide key={index} className={styleHome.reviewContent}>
              <div className={`${styleHome.imgWrap} ${item.avatar}`}></div>
              <div className={styleHome.textWrap}>
                <p className={styleHome.reviewer}>{item.reviewer}</p>
                <p className={styleHome.content}>
                  {item.content.map((item, idx) => (
                    <span key={idx}>
                      {item} <br />
                    </span>
                  ))}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styleHome.boostUpWrap}>
          <div className={styleHome.topCon}>
            <div className={styleHome.textWrap}>
              <span className={styleHome.colorBox}>리또 부스트 업</span>
              <div className={styleHome.mainText}>
                010PAY 활동 지수에 따라 <br />
                <b>
                  매주 리또 <span>최대 100개 더!</span>
                </b>
              </div>
            </div>
            <LottieComponent
              className={styleHome.boostUpLottie}
              animationData={BoostUp}
              isPaused
              delay={500}
              speed={2}
              loop={true}
            />
          </div>
          <div className={styleHome.botCon}>
            <h4 className={styleHome.titleText}>010PAY 활동 지수는?</h4>
            <p className={styleHome.subText}>
              리또 머니함, 기프티몰, 출석 체크 등 <br />
              010PAY 서비스를 이용할수록 올라가는 활동 지수에요. <br />
              많은 활동으로 리또를 더 받으세요.
            </p>
          </div>
        </div>
        <div className={styleHome.rettoGetInfoWrap}>
          <h3 className={styleHome.middleTitle}>무료로 리또 받는 방법</h3>
          <div
            className={`${styleHome.mainSection} ${styleHome.firstSection}`}
            ref={mainSectionRef}
          >
            <span className={styleHome.topBox}>첫 번째</span>
            <h2 className={styleHome.mainText}>
              리또 머니함에 머니를 넣어만 두면 <br />
              리또 최대 5개 + 10주마다 쿠폰까지
            </h2>
            <div className={`${styleHome.imgBox} ${styleHome.coupon}`}></div>
            <ul className={styleHome.benefitContents}>
              <li>
                <strong>혜택 1</strong>
                <p>매주 리또 최대 5개 적립</p>
              </li>
              <li>
                <strong>혜택 2</strong>
                <p>
                  에메랄드, 다이아 레벨 <br className={styleHome.foldSize} />
                  10주마다 쿠폰 선물
                </p>
              </li>
              <li>
                <strong>혜택 3</strong>
                <p>매일 100원딜 응모권 지급</p>
              </li>
            </ul>
            {/* 신용카드 미발급  */}
            <Button white large>
              머니 채우기로 리또 받기
            </Button>
          </div>
          <div className={styleHome.mainSection}>
            <span className={styleHome.topBox}>두 번째</span>
            <h2 className={styleHome.mainText}>
              결제 금액 1만원에 1개씩 <br />
              쓰기만 해도 행운이 쌓이는 리워드
            </h2>
            <ul className={styleHome.listContents}>
              <li>결제 건당 최대 1,000개 지급</li>
              <li>발급 대상: 신청일 기준 민법상 성년(만 19세 이상) 내국인</li>
            </ul>
            <div className={`${styleHome.imgBox} ${styleHome.card}`}></div>

            <Button white large>
              010PAY 우리카드로 리또 받기
            </Button>
          </div>
          <div className={styleHome.mainSection}>
            <span className={styleHome.topBox}>세 번째</span>
            <h2 className={styleHome.mainText}>
              친구가 내 선물코드 입력하면 <br />
              친구와 나, 모두 리또 받아요
            </h2>
            <div className={`${styleHome.imgBox} ${styleHome.letter}`}></div>
            <div className={styleHome.rettoInfoContents}>
              <div className={styleHome.leftCon}>
                <b>639명</b>
                <span>명에게 선물 성공</span>
              </div>
              <div className={styleHome.rightCon}>
                <span>보상 리또</span>
                <b>639개</b>
              </div>
            </div>
            <Button white large>
              리또 선물하고 리또 받기
            </Button>
          </div>
        </div>
      </div>
      <div className={styleHome.noteWrap}>
        <h4>010PAY 우리카드 유의사항</h4>
        <ul className={styleHome.noteContent}>
          <li>
            010PAY 우리카드 연회비 : 국내전용, 해외겸용(Mastercard) : 12,000원
          </li>
          <li>
            상세혜택 및 이용조건은 카드를 발급받기 전에 <br />
            홈페이지(www.wooricard.com), 상품설명서 및 약관 등을 <br />
            통해 확인하시기 바랍니다.
          </li>
          <li>
            신용카드 발급이 부적정한 경우(개인신용평점 낮음 등) 카드발급이
            제한될 수 있습니다.
          </li>
          <li>
            카드이용대금과 이에 수반되는 모든 수수료를 지정된 대금결제일에
            상환합니다.
          </li>
          <li>
            금융소비자는 금융소비자보호법 제 19조 제1항에 따라 <br />
            해당상품 또는 서비스에 대하여 설명을 받을 권리가 있으며, <br />그
            설명을 듣고 내용을 충분히 이해한 후 거래하시기 바랍니다.
          </li>
          <li className={styleHome.strongText}>
            상환능력에 비해 신용카드 사용액이 과도할 경우, <br />
            귀하의 개인신용평점이 하락할 수 있습니다.
          </li>
          <li className={styleHome.strongText}>
            개인신용평점 하락 시 금융거래와 관련된 불이익이 발생할 수 있습니다.
          </li>
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
                그 외의 경우 : 상사법정이율과 상호금융 가계자금대출금리* 중 높은
                금리 적용
              </li>
              <li className={styleHome.grayText}>
                한국은행에서 매월 발표하는 가장 최근의 비은행 금융기관
                <br />
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
            ㈜헥토파이낸셜은 ㈜우리카드의 금융상품에 대한 계약체결 권한이
            없습니다.
          </li>
          <li className={styleHome.marginBottom}>
            ㈜헥토파이낸셜은 금융관계법률에 따라 ㈜우리카드와 위탁계약을 체결한
            금융상품 판매 대리·중개업자입니다.
          </li>
          <li>
            여신금융협회 심의필 제 2024 - C1h - 06370호 <br />
            (2024.05.28 ~ 2025.05.27)
          </li>
        </ul>
      </div>
      {case2 && isToast && (
        <div
          className={`${styleHome.toastWrap} ${
            !toastShow ? styleHome.toastHide : ""
          }`}
          ref={bottomToastRef}
        >
          <div className={styleHome.toastBox}>
            <a href="#">
              <div className={styleHome.textWrap}>
                <span>1099회차</span>
                <p>오늘 리또를 2개 받았어요!</p>
              </div>
            </a>
            <button
              type="button"
              className={styleHome.closeBtn}
              onClick={() => setIsToast(false)}
            ></button>
          </div>
        </div>
      )}

      <div className={`${styleHome.buttonWrap}`}>
        <Button large>리또 받기</Button>
      </div>
    </div>
  );
};

export default Home;
