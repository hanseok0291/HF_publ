import React from 'react';

// style
import styleRettoList from "../../styles/retto_pub/RettoList.module.css";
import Container from './common/Container';
import BottomSheetTurnChoice from './common/modal/BottomSheetTurnChoice';


const rettoNumber = [1, 6, 25, 29, 40, 43, 44];

const myRettoNumber = [[1, 6, 25, 29, 40, 43], [22, 24, 25, 29, 39, 42], [1, 24, 25, 29, 39, 42],]

const ListFail = () => {

  return (
    <>
      <Container padding="0" isTab>
        {/* <div className={`${styleRettoList.noResult} ${styleRettoList.type2}`}>
          <p>리또가 없어요.</p>
        </div> */}
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
              <dt>1071회차 보유 리또</dt>
              <dd><button type='button'>3개</button></dd>
            </dl>
          </div>
          <div>
            <div className={`${styleRettoList.borderBox} ${styleRettoList.botCon}`}>
              {myRettoNumber.map((item, index) => (
                <dl key={index}>
                  <dt>리또 번호</dt>
                  <dd>
                    <ul className={styleRettoList.myBallWrap}>
                      {item.map((numberItem, numberIndex) => {
                        let styleBall;
                        let discord;
                        if( 0 < numberItem && numberItem < 11){
                          styleBall = "type1";
                        } else if( 10 < numberItem && numberItem < 21 ) {
                          styleBall = "type2";
                        } else if( 20 < numberItem && numberItem < 31 ) {
                          styleBall = "type3";
                        } else if( 30 < numberItem && numberItem < 41 ) {
                          styleBall = "type4";
                        } else {
                          styleBall = "type5";
                        }

                        if(rettoNumber[numberIndex] === numberItem){
                          discord = ""
                        } else {
                          discord = "discord"
                        }

                        return (
                          <li key={numberIndex} className={`${styleRettoList.ball} ${styleBall}  ${discord}`}><span>{numberItem}</span></li>
                        )
                      })}
                    </ul>
                  </dd>
                  <dt>지급 일시</dt>
                  <dd>23.11.21 20:20:20</dd>
                  <dt>레벨</dt>
                  <dd><span className='jewelImg fail ruby'></span></dd>{/* 보석 이미지 ruby, emerald, diamond className 추가 */}
                </dl>
              ))}
              
            </div>
          </div>
        </div>
        
        <div className={styleRettoList.turnNavWrap}>
          <div className={styleRettoList.turnNavBox}>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.leftBtn}`}></button>
            <button type="button">
              <p className={styleRettoList.turnText}>1701회차</p>
              <p className={styleRettoList.turnDate}>추첨일 : 2023.11.25</p>
            </button>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.rightBtn} off`}></button>
          </div>
        </div>
      </Container>
      {/* <BottomSheetTurnChoice /> */}
    </>
  );
};

export default ListFail;
