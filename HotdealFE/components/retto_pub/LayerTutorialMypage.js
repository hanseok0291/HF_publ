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

const LayerTutorialMypage = ({type}) => {

  return (
    <div className={styleCommon.layer}>
      <div className={styleTutorial.background}>
        <Header />
        <ul className={styleMyretto.tabWrap}>
          <li className={styleMyretto.active}>나의 리또 현황</li>
          <li>리또 스탬프</li>
          <li>당첨 결과</li>
        </ul>
        <Container>
          <div className={`${styleCommon.titleWrap} ${styleMyretto.titleWrap}`}>
            <h2>매주 최대 1억 행운 리또</h2>
            <div className={styleMyretto.prizeWrap}>
              김*틀  <span>1억원 당첨</span>
            </div>
          </div>
          <div>
            <dl className={styleMyretto.borderBox}> 
              <dt className={styleMyretto.icon1}> 
                <p className={styleMyretto.topTextBox}>내 보유 리또 <span className={styleMyretto.dday}>추첨 D-3</span></p>
              </dt>
              <dd><button type="button">10개</button></dd>
            </dl>
            <div className={`${styleMyretto.nextRetto} ${styleNotJoin.rettoListWrap}`}>
              <ul className={styleNotJoin.rettoList}>
                <li>
                  <span className={styleNotJoin.ruby}></span>
                  <ul className={styleNotJoin.rettoNumberWrap}>
                    <li>6</li>
                    <li>12</li>
                    <li>14</li>
                    <li>26</li>
                    <li>40</li>
                    <li>45</li>
                  </ul>
                </li>
                <li>
                  <span className={styleNotJoin.emerald}></span>
                  <ul className={styleNotJoin.rettoNumberWrap}>
                    <li>22</li>
                    <li>24</li>
                    <li>25</li>
                    <li>29</li>
                    <li>33</li>
                    <li>43</li>
                  </ul>
                </li>
                <li>
                  <span className={styleNotJoin.diamond}></span>
                  <ul className={styleNotJoin.rettoNumberWrap}>
                    <li>2</li>
                    <li>3</li>
                    <li>11</li>
                    <li>29</li>
                    <li>40</li>
                    <li>45</li>
                  </ul>
                </li>
              </ul>
              <button type='button' className={styleNotJoin.moreViewBtn}>더 많은 리또 보러가기</button>
            </div>
          </div>
          <div className={`${styleMyretto.jewelBox}`}>
            <div className={`${styleMyretto.topCon} diamond`}>
              <span className="jewelImg"></span>
              <div>
                <p className={styleMyretto.jewelName}>MAX. <span  className="jewelColor">다이아</span></p>
                <p className={styleMyretto.jewelInfo}>100만원 채워 관리 중이에요</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={`${styleCommon.layer} ${styleTutorial.tutorial}`}>
        <Swiper className={`${styleTutorial.slide} ${styleTutorial.slideWrap1}`} modules={[Pagination]} pagination={{clickable: true}} key="swiper1">
          <SwiperSlide className={styleTutorial.slide1}>
            <div className={styleTutorial.slideWrap}>
              <h2>내 보유 리또</h2>
              <p className={styleTutorial.subText}>
              이번주 토요일에 추첨하는 <br /> 리또 정보를 확인해요
              </p>
              <dl className={styleMyretto.borderBox}> 
                <dt className={styleMyretto.icon1}> 
                  <p className={styleMyretto.topTextBox}>내 보유 리또 <span className={styleMyretto.dday}>추첨 D-3</span></p>
                </dt>
                <dd><button type="button">10개</button></dd>
              </dl>
              <p className={styleTutorial.addInfo}>당첨 결과는 일요일에 업데이트 돼요!</p>
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

export default LayerTutorialMypage;
