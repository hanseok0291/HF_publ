import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleTutorial from '../../styles/retto_pub/Tutorial.module.css';
import Button from './common/Button';

const LayerTutorial = ({type}) => {

  return (
    <div className={`${styleCommon.layer} ${styleTutorial.tutorial}`}>
      { type === "mypage" ? 
        <Swiper className={`${styleTutorial.slide} ${styleTutorial.slideWrap1}`} modules={[Pagination]} pagination={{clickable: true}} key="swiper1">
          <SwiperSlide className={styleTutorial.slide1}>
            <div className={styleTutorial.slideWrap}>
              <h2>회차 진행 기간</h2>
              <p className={styleTutorial.period}>10. 09<span>-</span>10 .15</p>
              <p className={styleTutorial.subText}>
                이번주 토요일 추첨하는 <br />
                진행 회차의 기간이 표시돼요!
              </p>
              <p className={styleTutorial.addInfo}>1주(월요일~일요일)를 기준으로 해요!</p>
            </div>
            <button type='button' className={styleTutorial.skipBtn}>SKIP</button>
          </SwiperSlide>
          <SwiperSlide className={styleTutorial.slide2}>
            <div className={styleTutorial.slideWrap}>
              <h2>내 보유 리또</h2>
              <p className={styleTutorial.subText}>
                진행 회차의 리또는 물론 <br />
                당첨 이력까지 확인할 수 있어요
              </p>
              <div className={styleTutorial.imgBox}></div>
              <p className={styleTutorial.addInfo}>당첨 결과는 일요일 00시에 업데이트 돼요!</p>
            </div>
            <button type='button' className={styleTutorial.skipBtn}>SKIP</button>
          </SwiperSlide> 
          <SwiperSlide className={styleTutorial.slide3}>
            <div className={styleTutorial.slideWrap}>
              <h2>보너스 미션</h2>
              <p className={styleTutorial.subText}>
                보너스 미션 기회를 <br />
                놓치지 않도록 알려드려요
              </p>
              <div className={styleTutorial.imgBox}></div>
              <p className={styleTutorial.addInfo}>
                실제 로또 번호 3개만 맞혀도 최대 1만 포인트~ <br />
                기프티몰에서 5천원 이상 구매 시 참여 가능해요!
              </p>
            </div>
            <button type='button' className={styleTutorial.skipBtn}>SKIP</button>
          </SwiperSlide>
          <SwiperSlide className={styleTutorial.slide4}>
            <div className={styleTutorial.slideWrap}>
              <h2>리또 레벨 변경</h2>
              <p className={styleTutorial.subText}>
                원하는 레벨로 언제든 <br />
                편하게 변경할 수 있어요
              </p>
              <p className={styleTutorial.addInfo}>리또를 쉽게 받는 꿀 Tip이에요!</p>
              <div className={styleTutorial.imgBox}></div>
            </div>
            <div className={styleTutorial.btnWrap}>
              <Button>이해했어요</Button>
            </div>
          </SwiperSlide>
        </Swiper> :
        <Swiper className={`${styleTutorial.slide} ${styleTutorial.slideWrap2}`}  modules={[Pagination]} pagination={{clickable: true}} key="swiper2" initialSlide={0}>
          <SwiperSlide className={styleTutorial.slide1}>
            <div className={styleTutorial.slideWrap}>
              <h2>이번 주 적립 현황은?</h2>
              <p className={styleTutorial.subText}>
                리또를 향해 한 걸음씩 <br />
                잘 나아가고 있는지 확인해보세요!
              </p>
              <div className={styleTutorial.imgBox}></div>
              <p className={styleTutorial.addInfo}>
                스탬프 연속 적립 시 매주 쌓이는 <br />
                리또가 최대 5개로 UP!
              </p>
            </div>
            <button type='button' className={styleTutorial.skipBtn}>SKIP</button>
          </SwiperSlide>
          <SwiperSlide className={styleTutorial.slide2}>
            <div className={styleTutorial.slideWrap}>
              <h2>쿠폰 선물이 기다려요</h2>
              <p className={styleTutorial.subText}>
                특별한 10번째 스탬프는 <br />
                쿠폰 선물로 뿌듯함을 더해드려요!
              </p>
              <div className={styleTutorial.imgBox}></div> 
            </div>
            <div className={styleTutorial.btnWrap}>
              <Button>이해했어요</Button>
            </div>
          </SwiperSlide>
        </Swiper>  
      }
    </div>
  )
}

export default LayerTutorial;
