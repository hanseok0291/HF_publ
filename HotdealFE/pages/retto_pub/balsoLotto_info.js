import React, { useEffect, useRef, useState } from "react";
import balsoLottoInfo from "../../styles/retto_pub/balsoLottoInfo.module.css";
import BallLottie from "../../public/lotties/balso-lotto-intro";
import ConfettiLottie from "../../public/lotties/confetti_winner";
import LottieComponent from "@/components/retto_pub/LottieComponent";
import BottomSheetLottoAgree from "@/components/retto_pub/common/modal/BottomSheetLottoAgree";
import SlotCounter from 'react-slot-counter';

const FadeInSection = ({ children, sectionClass }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 각 children 요소에 애니메이션 클래스 추가
          const childElements = sectionRef.current.children;
          Array.from(childElements).forEach((child, index) => {
            child.style.transition = `opacity 0.7s ease-out ${index * 0.3}s, transform 0.7s ease-out ${index * 0.3}s`;
            child.style.opacity = 1;
            child.style.transform = "translateY(0)";
          });

          observer.disconnect(); // 한 번 실행 후 옵저버 해제
        }
      },
      { threshold: 0.5 } // 20% 이상 보이면 실행
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={sectionClass}>
      {React.Children.map(children, (child) => (
        <div
          style={{
            opacity: 0,
            transform: "translateY(10px)", // 초기 상태
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

const index = () => {
  const valueArr = [
    { amount: '4,075,100', index: 1 },
    { amount: '2,075,100', index: 2 },
    { amount: '7,075,100', index: 3 },
  ];
  const [openAgreeBs, setOpenAgreeBs] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState('4,075,100');
  const [hideClass, setHideClass] = useState(false);

  const handleAgreeBsClose = () => {
    setOpenAgreeBs(false);
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % valueArr.length);
      
    }, 2600); // 2초마다 변경
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newValue = 
      valueArr[currentIndex].amount;
    setHideClass(currentIndex === 0 || currentIndex === 1 ? true : false);
    setValue(newValue);
  }, [currentIndex]);

  return (
    <>
      <div>
        <div className={balsoLottoInfo.headerContainer}>
          <button type="button" className={balsoLottoInfo.backBtn}></button>
          <h2>발소 리워드 로또</h2>
        </div>
        <div className={balsoLottoInfo.mainContainer}>
          <FadeInSection sectionClass={balsoLottoInfo.section_1}>
            <h3 className={balsoLottoInfo.titleText}>실제 로또 번호와<br />5개 맞으면 1등!</h3>
            <p className={balsoLottoInfo.subText}>1,245,320명 참여중</p>
            <LottieComponent
              className={balsoLottoInfo.ballLottie}
              animationData={BallLottie}
              isStopped
              autoplay={false}
              delay={400}
            />
            <div className={balsoLottoInfo.botTextWrap}>
              <p className={balsoLottoInfo.topText}>이번주 총 예상 당첨금</p>
              
              <div className={`${balsoLottoInfo.boxText} ${hideClass ? balsoLottoInfo.hide : '' }`}><SlotCounter value={value} animateUnchanged useMonospaceWidth duration={1} /><p>원</p></div>
            </div>
          </FadeInSection>
          <FadeInSection sectionClass={balsoLottoInfo.section_2}>
            <div className={balsoLottoInfo.bgBox}>
              <LottieComponent
                className={balsoLottoInfo.confettiLottie}
                animationData={ConfettiLottie}
                autoplay={true}
                loop={true}
                delay={200}
              />
              <div className={balsoLottoInfo.topBox}>
                  <div className={balsoLottoInfo.avatarImg}></div>
                  <div className={balsoLottoInfo.textWrap}>
                    <p className={balsoLottoInfo.personText}>1,163회차 1등 김*민</p>
                    <p className={balsoLottoInfo.mountText}><span>5,000,000원</span> 당첨</p>
                  </div>
              </div>
              <p className={balsoLottoInfo.reviewText}>
                  “복권 1등 당첨은 마치 봄날의 따스한 <br />
                  햇살처럼 제 마음을 녹여주었어요. <br />
                  이제는 매일을 감사하며 살아갈 힘이 생겼답니다. 다음 1등도 도전해 볼게요!”
              </p>
            </div>
            <div className={balsoLottoInfo.botTextWrap}>
              <p className={balsoLottoInfo.topText}>
                실제 로또 당첨 번호와 <br />
                5개만 맞으면 상금을 드려요!
              </p>
              <p className={balsoLottoInfo.botText}>
                이제 6개 숫자를 다 맞출 필요 없어요 <br />
                5개만 맞혀도 1등 상금을 드리는 발소 리워드 로또! <br />
                지금 바로 도전하세요!
              </p>
            </div>
          </FadeInSection>
          <FadeInSection sectionClass={balsoLottoInfo.section_3}>
            <div className={balsoLottoInfo.visualImg}></div>
            <p className={balsoLottoInfo.topText}>
              머니 보관하고<br />
              매일 최대 3줄 받기
            </p>
            <p className={balsoLottoInfo.botText}>
              에메랄드, 다이아 레벨은 <br />
              10주마다 쿠폰 받으세요
            </p>
          </FadeInSection>
          <FadeInSection sectionClass={balsoLottoInfo.section_3}>
            <div className={balsoLottoInfo.visualImg2}></div>
            <p className={balsoLottoInfo.topText}>
            쿠팡 상품 구경하고 <br />
            매일 1줄 받기
            </p>
            <p className={balsoLottoInfo.botText}>
            하루에 한 번씩 쿠팡 방문만 하면 <br />
            발소 리워드 로또를 드려요
            </p>
          </FadeInSection>
          <FadeInSection>
            <div className={balsoLottoInfo.btnWrap}>
              <button type="button" onClick={() => setOpenAgreeBs(true)}>네, 알겠어요!</button>
            </div>
          </FadeInSection>
        </div>
      </div>
      {
        <BottomSheetLottoAgree close={handleAgreeBsClose} open={openAgreeBs} />
      }
    </>
  );
};

export default index;
