import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleTutorial from '../../styles/retto_pub/Tutorial.module.css';
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";
import styleNotJoin from "../../styles/retto_pub/NotJoin.module.css";
import Button from './common/Button';
import Header from './common/Header';
import Container from './common/Container';

const LayerTutorialStamp = ({type}) => {

  return (
    <div className={styleCommon.layer}>
      <div className={styleTutorial.background}>
        <Header />
        <ul className={styleMyretto.tabWrap}>
          <li>HOME</li>
          <li>추첨 정보</li>
          <li className={styleMyretto.active}>나의 리또</li>
        </ul>
        <Container padding="0">
          <div className={styleMyretto.stampBackground}>
            <div className={styleMyretto.rewardContentWrap}>
              <h4>친구와 리또해요</h4>
              <div className={styleMyretto.textWrap}>
                <p className={styleMyretto.leftCon}><em className={styleMyretto.iconGift}></em><strong>0명</strong><span>리또 선물 성공</span></p>
                <p className={styleMyretto.rightCon}><span>보상 리또</span><strong>0개</strong></p>
              </div>
            </div>
            <div className={`${styleMyretto.stampBorderBox}`}>
            <div className={styleMyretto.noApply}>
              <div className={`${styleCommon.titleWrap} ${styleMyretto.titleWrap}`}>
                <h2 className={styleMyretto.stampTitle}>도전~연속 리또 받기<i>!</i></h2>
                <p className={styleMyretto.stampSubText}>
                  머니 채우기로 매주 늘어가는 스탬프, <br />
                  스탬프만큼 쌓여가는 리또와 쿠폰 선물!
                </p>
                <ul className={styleMyretto.stampWrap}>
                  <li>
                    <div>
                      <span className="circle"></span>
                      <p>두근두근 <br />첫 스탬프</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span className="circle"></span>
                      <p>5주차</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span className="circle"></span>
                      <p>10주차</p>
                    </div>
                  </li>
                </ul>
                <button type="button" className={styleMyretto.stampButton}>
                  1억 행운 리또 받기
                </button>
              </div>
            </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={`${styleCommon.layer} ${styleTutorial.tutorial}`}>
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
          </SwiperSlide>
          <SwiperSlide className={styleTutorial.slide2}>
            <div className={styleTutorial.slideWrap}>
              <h2>쿠폰 선물이 기다려요</h2>
              <p className={styleTutorial.subText}>
                에메랄드, 다이아 레벨 <br />
                10주차마다 뿌듯함을 더해드려요!
              </p>
              <div className={styleTutorial.imgBox}></div> 
            </div>
            <div className={styleTutorial.btnWrap}>
              <Button>이해했어요</Button>
            </div>
          </SwiperSlide>
        </Swiper> 
      </div>
    </div>
  )
}

export default LayerTutorialStamp;
