import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleMoneyboxEmpty from '../../styles/retto_pub/LayerMoneyboxEmpty.module.css'
import Button from './common/Button';
import ButtonText from './../common_refactoring/Button';
import FadeInSection from './common/FadeInSection';
import ModalHundredInfo from '../coupon_pub/common/modal/ModalHundredInfo';
import ModalFillBox from './common/modal/ModalFillBox';
import Header from "./common/Header";

const LayerMoneyboxEmpty = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styleCommon.layer}>
        <Header title="리또 머니함 비우기" sideBtn={false}/>

        <div className={styleMoneyboxEmpty.container}>
          <div className={styleMoneyboxEmpty.content1}>
            <FadeInSection>
              <h4 className={styleMoneyboxEmpty.title}>
                잠시만요! <br />
                지금 이 순간에도 많은 사람들이 <br />
                리또를 받아 가고 있어요!
              </h4>
            </FadeInSection>
            <FadeInSection delay={200}>
              <ul className={styleMoneyboxEmpty.box1}>
                <li>
                  <b>60만 명+</b>
                  <p>리또 고객</p>
                </li>
                <li>
                  <b>2.5만 명+</b>
                  <p>누적 당첨자</p>
                </li>
                <li>
                  <b>1천 명</b>
                  <p>매주 평균 당첨자</p>
                </li>
              </ul>
            </FadeInSection>
            <FadeInSection delay={400}>
              <div className={styleMoneyboxEmpty.box2}>
                <p>
                  지금 리또 머니함을 비우면 <br />
                  <span>월 최대 31,000원</span> 혜택이 사라져요
                </p>
                <div className={styleMoneyboxEmpty.boxWrap}>
                  <dl>
                    <dt>매주 복권 5개씩 총 20개</dt>
                    <dd>20,000원</dd>
                  </dl>
                  <dl>
                    <dt>10주마다 커피 기프티콘 1개</dt>
                    <dd>2,000원</dd>
                  </dl>
                  <dl>
                    <dt>100원딜 응모권 90개</dt>
                    <dd>9,000원</dd>
                  </dl>
                  <dl>
                    <dt>총 혜택 금액</dt>
                    <dd>31,000원</dd>
                  </dl>
                </div>
              </div>
            </FadeInSection>
          </div>
          <div className={styleMoneyboxEmpty.content2}>
            <FadeInSection>
              <h4 className={styleMoneyboxEmpty.title}>
                매일, 매주, 매월 받는 리또 혜택!
              </h4>
            </FadeInSection>
            <FadeInSection>
              <div className={`${styleMoneyboxEmpty.box} ${styleMoneyboxEmpty.box1}`}>
                <span className={styleMoneyboxEmpty.leftTopText}>매일</span>
                <p className={styleMoneyboxEmpty.mainText}>
                  리또 머니함에 머니 보관하고 <br />
                  <span>매일 100원딜 응모권</span> 받아요!
                </p>
                <button type='button' className={styleMoneyboxEmpty.modalBtn} onClick={() => setSheetOpen(true)}>100원딜이란?</button>
                <div className={styleMoneyboxEmpty.infoWrap}>
                  <p>레벨별 응모권 지급 개수</p>
                  <ul>
                    <li>1개 지급</li>
                    <li>2개 지급</li>
                    <li>3개 지급</li>
                  </ul>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className={`${styleMoneyboxEmpty.box} ${styleMoneyboxEmpty.box2}`}>
                <span className={styleMoneyboxEmpty.leftTopText}>매주</span>
                <p className={styleMoneyboxEmpty.mainText}>
                  <span>매주 알아서 최대 1억원</span><br />
                  당첨 기회가 쌓여요! 
                </p>
                <ul className={styleMoneyboxEmpty.infoWrap}>
                  <li>
                    리또 머니함을 채워두면<br />
                    매주 리또 최대 5개
                  </li>
                  <li>
                    에메랄드, 다이아 레벨은 <br />
                    10주마다 쿠폰 선물까지
                  </li>
                </ul>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className={`${styleMoneyboxEmpty.box} ${styleMoneyboxEmpty.box3}`}>
                <span className={styleMoneyboxEmpty.leftTopText}>매월</span>
                <p className={styleMoneyboxEmpty.mainText}>
                  리또 이용자를 위한 <br />
                  <span>추가 리워드를 매월 받아요!</span>
                </p>
                <p className={styleMoneyboxEmpty.subText}>
                  자동으로 응모되는 리또 랭킹! <br />
                  매월 20명에게 최대 100만 포인트 기회
                </p>
                <ul className={styleMoneyboxEmpty.infoWrap}>
                  <li>
                    <p>포인트</p>
                    <b>50만원</b>
                  </li>
                  <li>
                    <p>포인트</p>
                    <b>100만원</b>
                    <span className={styleMoneyboxEmpty.star1}></span>
                    <span className={styleMoneyboxEmpty.star2}></span>
                    <span className={styleMoneyboxEmpty.star3}></span>
                  </li>
                  <li>
                    <p>포인트</p>
                    <b>20만원</b>
                  </li>
                </ul>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className={styleMoneyboxEmpty.content3}>
                <h4 className={styleMoneyboxEmpty.title2}>
                  리또 머니함에 보관만 해도<br />알아서 쌓이는 혜택을 포기하시겠어요?
                </h4>
                <Button margin="24px 0 8px">혜택 유지하기</Button>
                <Button white={true} handleModalToggle={() => setModalOpen(true)}>리또 머니함 비우기</Button>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
      {modalOpen && <ModalFillBox closeModal={() => setModalOpen(false)} />}
      <ModalHundredInfo isHundredOpen={sheetOpen} closeHundredPopup={() => setSheetOpen(false)}/>
    </>
  )
}

export default LayerMoneyboxEmpty;
