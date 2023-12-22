import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import FadeIn from 'react-fade-in';

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";
import Toast from './common/Toast';

const MyPage = ({case1, case2, case3, case4, case5, case6, case7, case8}) => {
  const [isConOpen, SetIsConOpen] = useState(false);
  const handleClickIsCon = () => {
    SetIsConOpen(!isConOpen);
  }

  const duration = 300;

  return (
    <>
      <a href='#' className={styleMyretto.topLineBanner}>
        카드 추천인 적고 다이아 리또 받아요!
        {/* 카드 추천하고 친구랑 다이아 리또 받아요! */}
      </a>
      <FadeIn transitionDuration={duration}>
        <div className={`${styleCommon.titleWrap} ${styleMyretto.titleWrap} ${styleMyretto.isTopBanner}`}>
          <h2>매주 최대 1억 행운 리또</h2>
          {case4 && 
            <div className={styleMyretto.prizeWrap}>
              김*틀  <span>5,000원 당첨</span>
            </div>
          }
        </div>
      </FadeIn>
      <FadeIn delay={100} transitionDuration={duration}>
        {case5 && 
          <div className={styleMyretto.celebrationWrap}>
            <p className={styleMyretto.title}>당첨금 찾아가세요 !</p>
            <p className={styleMyretto.subtext}>수령 기간이 곧 끝나요</p>
            <p className={styleMyretto.link}>지금 찾으러 가기</p>
          </div>
        }
      </FadeIn>
      <FadeIn delay={200} transitionDuration={duration}>
        <div>
          <dl className={styleMyretto.borderBox}>
            <dt className={styleMyretto.icon1}>
              <p className={styleMyretto.topTextBox}>내 보유 리또 <span className={styleMyretto.dday}>추첨 D-2</span></p> <span>이번 주 토요일에 추첨해요</span>
            </dt>
            <dd><button type="button">1개</button></dd>
          </dl>
          {case6 &&
            <dl className={styleMyretto.nextRetto}>
              <dt>다음주에 받을 리또</dt>
              <dd>26개</dd>
            </dl>
          }
        </div>
      </FadeIn>
      <FadeIn delay={200} transitionDuration={duration}>
        <div>
          <dl className={`${styleMyretto.borderBox} ${styleMyretto.friendRetto} ${ isConOpen ? styleMyretto.open : styleMyretto.close}`}>
            <dt className={`${styleMyretto.icon3}`} onClick={handleClickIsCon}>
              12월 친구와 리또해요
            </dt>
            {isConOpen && 
              <dd>
                <div className={styleMyretto.textWrap}>
                  <p className={styleMyretto.titleText}>선물한 친구</p>
                  <p className={`${styleMyretto.subText} ${styleMyretto.active}`}>1명</p>
                </div>
                <div className={styleMyretto.textWrap}>
                  <p className={styleMyretto.titleText}>카드 만든 친구</p>
                  <p className={styleMyretto.subText}>0명</p>
                </div>
                <div className={styleMyretto.textWrap}>
                  <p className={styleMyretto.titleText}>보상 리또</p>
                  <p className={styleMyretto.subText}>0개</p>
                </div>
              </dd>
            }
            
          </dl>
        </div>
      </FadeIn>
      <FadeIn delay={400} transitionDuration={duration}>
        <dl className={`${styleMyretto.borderBox}`}>
          <dt className={styleMyretto.icon2}>내 당첨금</dt>
          <dd><button type="button" className={`${!case7 ? styleMyretto.off : ''}`}>0원</button></dd>
        </dl>
      </FadeIn>
      <FadeIn delay={500} transitionDuration={duration}>
        {case1 && 
          <div className={`${styleMyretto.jewelBox}`}>
            <div className={`${styleMyretto.topCon} emerald`}>{/* ruby emerald diamond className 추가 시 스타일 변경*/}
              {/* <span className={styleMyretto.alertBox}>100만원에서 줄어들었어요!</span> */}
              {/* <span className={styleMyretto.alertBox}>이번 기회는 아쉽게 놓쳤어요!</span> */}{/* 스탬프 받기 이번주 실패 */}
              {/* <span className={styleMyretto.alertBox}>혜택 알림이 꺼져있어요!</span> */}{/* 혜택 알림 미동의 */}
              {/* <span className={styleMyretto.alertBox}>리또 머니함이 비어 있어요!</span> */}
              <span className={`${styleMyretto.alertBox} ${styleMyretto.blue}`}>1주 보관은 월요일부터 시작!</span>{/* 재신청 > 월요일 시작 전이라 보관은 미시작 상태 */}
              {/* 채우기상자 off  */}
              {/* <span className={`${styleMyretto.alertBox} ${styleMyretto.blue}`}>변경된 레벨은 월요일부터 적용!</span> */}
              {/* 혜택 알림 미동의 */}
              <span className="jewelImg"></span>
              <div>
                <p className={styleMyretto.jewelName}>MAX. <span  className="jewelColor">다이아</span></p>
                <p className={styleMyretto.jewelInfo}>100만원 채워 관리 중이에요</p>
                {/* <p className={styleMyretto.jewelInfo}>오늘밤 11시까지 다시 채워주세요</p> */}{/* 스탬프 당일 받기 실패 */}
                {/* <p className={styleMyretto.jewelInfo}>월요일이 되기 전 다시 채워주세요</p> */}{/* 스탬프 받기 이번주 실패 */}
                {/* <p className={styleMyretto.jewelInfo}>리또를 받으려면 알림을 꼭 켜주세요</p> */}{/* 혜택 알림 미동의 */}
                {/* <p className={styleMyretto.jewelInfo}>월요일 전까지 50만원을 채워주세요</p> */}{/* 재신청 > 머니함 채운후 월요일 전에 다시 비웠을 때 */}
                {/* <p className={styleMyretto.jewelInfo}>머니함에 50만원을 넣어뒀어요</p> */}{/* 재신청 > 월요일 시작 전이라 보관은 미시작 상태 */}
              </div>
            </div>
            {/* 다이아일 때 리또 레벨 변경 영역 미노출 */}
            <div className={styleMyretto.botCon}>
              <a href="#" className={styleMyretto.button}>리또 레벨 변경</a>
            </div>
          </div>
        }
      </FadeIn>
      {case8 && 
        <FadeIn delay={600} transitionDuration={duration}>
          <div className={styleMyretto.bannerWrap}>
            <div className={`${styleMyretto.bottomBox} ${styleMyretto.type1}`}>
              <a href="#">
                <p>결제할 때마다 쌓이는 리또</p>
                <h4 className={styleMyretto.addArrowBlack}>신용카드 결제로 받기</h4>
              </a>
            </div>
            <div className={`${styleMyretto.bottomBox} ${styleMyretto.type2}`}>
              <a href="#">
                <p>채워만 둬도 쌓이는 리또</p>
                <h4 className={styleMyretto.addArrowBlack}>머니 채우기로 받기</h4>
              </a>
            </div>
          </div>
        </FadeIn>
      }
      
      
      {/* <Toast>
        2023.08.31 <br /> 
        권아현님이 010PAY 마케팅 <br />
        수신을 동의하셨습니다.
      </Toast> */}
    </>
  )
}

export default MyPage;
