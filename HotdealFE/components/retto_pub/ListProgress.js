import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';


// Import Swiper styles
import "swiper/css";

// style
import styleRettoList from "../../styles/retto_pub/RettoList.module.css";
import Container from './common/Container';

const myRettoNumber = [
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
];

const ListProgress = () => {
  return (
    <>
      <div className={styleRettoList.progressInfo}>
        <strong>1071회</strong><span>추첨일 2023.12.02</span>
      </div> 

      <div className={styleRettoList.progressWrap}>
        <div className={styleRettoList.borderBox}> 
          <Swiper navigation={true} modules={[Navigation]} className={styleRettoList.progressSwiper}>
            <SwiperSlide>
              <div className={`${styleRettoList.progressTopCon} ${styleRettoList.set}`}>{/* ruby emerald diamond set className 추가 시 이미지 변경 */}
                <div className={`${styleRettoList.jewelImg}`}></div>
              </div>
              <ul className={styleRettoList.jewelLengthWrap}>
                <li>
                  <p className={styleRettoList.jewelName}>루비</p>
                  <p className={styleRettoList.jewelLength}>9개</p>
                </li>
                <li>
                  <p className={styleRettoList.jewelName}>에메랄드</p>
                  <p className={styleRettoList.jewelLength}>0 개</p>
                </li>
                <li>
                  <p className={styleRettoList.jewelName}>다이아</p>
                  <p className={styleRettoList.jewelLength}>1개</p>
                </li>
              </ul>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${styleRettoList.progressTopCon} ${styleRettoList.diamond}`}>{/* ruby emerald diamond set className 추가 시 이미지 변경 */}
                <div className={`${styleRettoList.jewelImg}`}></div>
              </div>
              <ul className={styleRettoList.jewelLengthWrap}>
                <li>
                  <p className={styleRettoList.jewelName}>다이아</p>
                  <p className={styleRettoList.jewelLength}>1개</p>
                </li>
              </ul>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${styleRettoList.progressTopCon} ${styleRettoList.emerald}`}>{/* ruby emerald diamond set className 추가 시 이미지 변경 */}
                <div className={`${styleRettoList.jewelImg}`}></div>
              </div>
              <ul className={styleRettoList.jewelLengthWrap}>
                <li>
                  <p className={styleRettoList.jewelName}>에메랄드</p>
                  <p className={styleRettoList.jewelLength}>0</p>
                </li>
              </ul>
            </SwiperSlide>
            <SwiperSlide>
              <div className={`${styleRettoList.progressTopCon} ${styleRettoList.ruby}`}>{/* ruby emerald diamond set className 추가 시 이미지 변경 */}
                <div className={`${styleRettoList.jewelImg}`}></div>
              </div>
              <ul className={styleRettoList.jewelLengthWrap}>
                <li>
                  <p className={styleRettoList.jewelName}>루비</p>
                  <p className={styleRettoList.jewelLength}>9개</p>
                </li>
              </ul>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className={styleRettoList.lineImgBox}>
          <div className={`${styleRettoList.borderBox} ${styleRettoList.botCon}`}>
            {myRettoNumber.map((item,index) => (
                <dl key={index} className={styleRettoList.progressRettoWrap}>
                  <dt>
                    <p className={styleRettoList.topText}>지급 일시</p>
                    <p className={styleRettoList.botText}>2023.11.21 20:20:20</p>
                  </dt>
                  <dd>
                    <ul className={styleRettoList.myBallWrap}>
                      {item.map((rettoItem, rettoIndex) => {
                        let styleBall;
                        let discord;
                        if( 0 < rettoItem && rettoItem < 11){
                          styleBall = "type1";
                        } else if( 10 < rettoItem && rettoItem < 21 ) {
                          styleBall = "type2";
                        } else if( 20 < rettoItem && rettoItem < 31 ) {
                          styleBall = "type3";
                        } else if( 30 < rettoItem && rettoItem < 41 ) {
                          styleBall = "type4";
                        } else {
                          styleBall = "type5";
                        }

                        if(myRettoNumber[rettoIndex] === rettoItem){
                          discord = ""
                        } else {
                          discord = "discord"
                        }

                        return (
                          <li key={rettoIndex+100} className={`${styleRettoList.ball} ${styleBall}  ${discord}`}><span>{rettoItem}</span></li>
                        )
                      })}
                    </ul>
                  </dd>
                </dl>
            ))}
          </div>  
          {/* 11개 부터 더 보기 버튼 생성 */}
          <button type='button' className={styleRettoList.addView}>더 보기</button>
        </div>
      </div> 
    </>
  );
};

export default ListProgress;
