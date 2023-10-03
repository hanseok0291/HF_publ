import React from 'react';

// style
import styleRettoList from "../../styles/retto_pub/RettoList.module.css";
import Container from './common/Container';
import BottomSheetTurnChoice from './common/modal/BottomSheetTurnChoice';

const rettoNumber = [1, 6, 25, 29, 40, 43, 44];

const myRettoNumber = [[1, 6, 25, 29, 40, 43, 44], [22, 24, 25, 29, 39, 43, 44]]

const ListWin = () => {

  return (
    <>
      <Container padding="0" isTab>
        {/* <div className={`${styleRettoList.noResult}`}>
          <p>당첨된 리또가 없어요.</p>
        </div> */}
        <div className={styleRettoList.winBanner}>
          <a href="#"> 
            <b>당첨금 100,010,000원</b>이 쌓여있어요!
          </a>
        </div>
        <div className={styleRettoList.listWinWrap}>
          <ul className={styleRettoList.ballWrap}>
            {rettoNumber.map((item, index) => {
              let styleBall;
              if( 0 < item && item < 11){
                styleBall = "type1";
              } else if( 10 < item && item < 21 ) {
                styleBall = "type2";
              } else if( 20 < item && item < 31 ) {
                styleBall = "type3";
              } else if( 30 < item && item < 41 ) {
                styleBall = "type4";
              } else {
                styleBall = "type5";
              }
              
              return (
                <li key={index} className={`${styleRettoList.ball} ${styleBall}`}><span>{item}</span></li>
              )
            })}
          </ul>
          <div className={`${styleRettoList.borderBox} ${styleRettoList.topCon}`}>
            <dl>
              <dt>1071회차 당첨 리또</dt>
              <dd><button type='button'>3개</button></dd>
            </dl>
          </div>
          <div>
            <div className={`${styleRettoList.borderBox} ${styleRettoList.botCon}`}>
              <dl>
                <dt>리또 번호</dt>
                <dd>
                  <ul className={styleRettoList.myBallWrap}>
                    {myRettoNumber[0].map((item, index) => {
                      let styleBall;
                      let discord;
                      if( 0 < item && item < 11){
                        styleBall = "type1";
                      } else if( 10 < item && item < 21 ) {
                        styleBall = "type2";
                      } else if( 20 < item && item < 31 ) {
                        styleBall = "type3";
                      } else if( 30 < item && item < 41 ) {
                        styleBall = "type4";
                      } else {
                        styleBall = "type5";
                      }

                      if(rettoNumber[index] === item){
                        discord = ""
                      } else {
                        discord = "discord"
                      }

                      return (
                        <li key={index} className={`${styleRettoList.ball} ${styleBall}  ${discord}`}><span>{item}</span></li>
                      )
                    })}
                  </ul>
                </dd>
                <dt>당첨금</dt>
                <dd className={styleRettoList.cash}>100,000,000원</dd>
                <dt>당첨 결과</dt>
                {/* 보석 이미지 ruby, emerald, diamond className 추가 */}
                <dd><span className='jewelImg diamond'></span><span className={styleRettoList.dot}></span>1등 당첨</dd>
                <dt>지급 일시</dt>
                <dd>23.11.21 20:20:20</dd>
                <dt>수령 기한</dt>
                <dd>23.12.31 까지</dd>
              </dl>
              <div className={styleRettoList.buttonWrap}>
                <button type='button'>당첨금 받기</button>
              </div>
            </div>
            <div className={`${styleRettoList.borderBox} ${styleRettoList.botCon}`}>
              <dl>
                <dt>리또 번호</dt>
                <dd>
                  <ul className={styleRettoList.myBallWrap}>
                    {myRettoNumber[1].map((item, index) => {
                      let styleBall;
                      let discord;
                      if( 0 < item && item < 11){
                        styleBall = "type1";
                      } else if( 10 < item && item < 21 ) {
                        styleBall = "type2";
                      } else if( 20 < item && item < 31 ) {
                        styleBall = "type3";
                      } else if( 30 < item && item < 41 ) {
                        styleBall = "type4";
                      } else {
                        styleBall = "type5";
                      }

                      if(rettoNumber[index] === item){
                        discord = ""
                      } else {
                        discord = "discord"
                      }

                      return (
                        <li key={index} className={`${styleRettoList.ball} ${styleBall}  ${discord}`}><span>{item}</span></li>
                      )
                    })}
                  </ul>
                </dd>
                <dt>당첨금</dt>
                <dd className={styleRettoList.cash}>5,000원</dd>
                <dt>당첨 결과</dt>
                {/* 보석 이미지 ruby, emerald, diamond className 추가 */}
                <dd><span className='jewelImg ruby'></span><span className={styleRettoList.dot}></span>1등 당첨</dd>
                <dt>지급 일시</dt>
                <dd>23.11.21 20:20:20</dd>
                <dt>수령 기한</dt>
                <dd>23.12.31 까지</dd>
              </dl>
              <div className={styleRettoList.buttonWrap}>
                {/* <button type='button'>당첨금 받기</button> */}
                <p className={styleRettoList.ing}>수령 신청을 완료했어요! 곧 만나요~</p>
                {/* <p className={styleRettoList.complete}>당첨금을 찾아갔어요!</p> */}
                {/* <p className={styleRettoList.fail}>수령 기한이 끝났어요.</p> */}
              </div>
            </div>
            <div className={`${styleRettoList.borderBox} ${styleRettoList.botCon}`}>
              <dl>
                <dt>리또 번호</dt>
                <dd>
                  <ul className={styleRettoList.myBallWrap}>
                    {myRettoNumber[1].map((item, index) => {
                      let styleBall;
                      let discord;
                      if( 0 < item && item < 11){
                        styleBall = "type1";
                      } else if( 10 < item && item < 21 ) {
                        styleBall = "type2";
                      } else if( 20 < item && item < 31 ) {
                        styleBall = "type3";
                      } else if( 30 < item && item < 41 ) {
                        styleBall = "type4";
                      } else {
                        styleBall = "type5";
                      }

                      if(rettoNumber[index] === item){
                        discord = ""
                      } else {
                        discord = "discord"
                      }

                      return (
                        <li key={index} className={`${styleRettoList.ball} ${styleBall}  ${discord}`}><span>{item}</span></li>
                      )
                    })}
                  </ul>
                </dd>
                <dt>당첨금</dt>
                <dd className={styleRettoList.cash}>5,000원</dd>
                <dt>당첨 결과</dt>
                {/* 보석 이미지 ruby, emerald, diamond className 추가 */}
                <dd><span className='jewelImg ruby'></span><span className={styleRettoList.dot}></span>1등 당첨</dd>
                <dt>지급 일시</dt>
                <dd>23.11.21 20:20:20</dd>
                <dt>수령 기한</dt>
                <dd>23.12.31 까지</dd>
              </dl>
              <div className={styleRettoList.buttonWrap}>
                {/* <button type='button'>당첨금 받기</button> */}
                {/* <p className={styleRettoList.ing}>수령 신청을 완료했어요! 곧 만나요~</p> */}
                {/* <p className={styleRettoList.complete}>당첨금을 찾아갔어요!</p> */}
                <p className={styleRettoList.fail}>수령 기한이 끝났어요.</p>
              </div>
            </div>
            <div className={`${styleRettoList.borderBox} ${styleRettoList.botCon}`}>
              <dl>
                <dt>리또 번호</dt>
                <dd>
                  <ul className={styleRettoList.myBallWrap}>
                    {myRettoNumber[1].map((item, index) => {
                      let styleBall;
                      let discord;
                      if( 0 < item && item < 11){
                        styleBall = "type1";
                      } else if( 10 < item && item < 21 ) {
                        styleBall = "type2";
                      } else if( 20 < item && item < 31 ) {
                        styleBall = "type3";
                      } else if( 30 < item && item < 41 ) {
                        styleBall = "type4";
                      } else {
                        styleBall = "type5";
                      }

                      if(rettoNumber[index] === item){
                        discord = ""
                      } else {
                        discord = "discord"
                      }

                      return (
                        <li key={index} className={`${styleRettoList.ball} ${styleBall}  ${discord}`}><span>{item}</span></li>
                      )
                    })}
                  </ul>
                </dd>
                <dt>당첨금</dt>
                <dd className={styleRettoList.cash}>5,000원</dd>
                <dt>당첨 결과</dt>
                {/* 보석 이미지 ruby, emerald, diamond className 추가 */}
                <dd><span className='jewelImg emerald'></span><span className={styleRettoList.dot}></span>보너스 미션</dd>
                <dt>지급 일시</dt>
                <dd>23.11.21 20:20:20</dd>
                <dt>수령 기한</dt>
                <dd>23.12.31 까지</dd>
              </dl>
              <div className={styleRettoList.buttonWrap}>
                {/* <button type='button'>당첨금 받기</button> */}
                {/* <p className={styleRettoList.ing}>수령 신청을 완료했어요! 곧 만나요~</p> */}
                <p className={styleRettoList.complete}>당첨금을 찾아갔어요!</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styleRettoList.turnNavWrap}>
          <div className={styleRettoList.turnNavBox}>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.leftBtn}`}></button>
            <button type="button">
              <p className={styleRettoList.turnText}>1701회차</p>
              <p className={styleRettoList.turnDate}>추첨일 : 23.11.25</p>
            </button>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.rightBtn} off`}></button>
          </div>
        </div>
      </Container>
      {/* <BottomSheetTurnChoice /> */}
    </>
  );
};

export default ListWin;
