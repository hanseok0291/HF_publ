import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleLayerWriteReview from "../../styles/retto_pub/LayerWriteReview.module.css";
import Button from './common/Button';
import LottieComponent from './LottieComponent';
import ConfettiLottie from "../../public/lotties/confetti3.json";
import ModalAlert from '../coupon_pub/common/modal/ModalAlert';
 
// 레벨 변경 레이어 팝업
// type change 일 경우 레벨 변경 실패 타입
// case1 true 일 경우 실패 시간 케이스
const LayerWriteReview = () => {
  const [text, setText] = useState('');
  const [close, setClose] = useState(false);
  const handleTextChange  = (e) => {
    const inputText = e.target.value
    if(inputText[0] !== ' ' && inputText.length <= 100){
      setText(inputText);
    } 
  } 

  const onLayerClose = () => {
    setClose(true);
  }

  return (
    <>
      <div className={styleCommon.layer}>
        <div className={`${styleCommon.layerHeader} ${styleCommon.borderNone}`}>
          <button type="button" className={styleCommon.closeBtn} onClick={onLayerClose}>
            닫기
          </button>
        </div>
        <div className={styleLayerWriteReview.container}>
          <h2>축하해요! 리또 당첨이에요</h2>
          <div className={styleLayerWriteReview.visualBox}>
            <div className={`${styleLayerWriteReview.showText} ${styleLayerWriteReview.showText1}`}></div>
            <div className={`${styleLayerWriteReview.showText} ${styleLayerWriteReview.showText2}`}></div>
            <div className={`${styleLayerWriteReview.showText} ${styleLayerWriteReview.showText3}`}></div>
            <div className={styleLayerWriteReview.visualImg}></div>
            <LottieComponent 
              className={styleLayerWriteReview.confettiLottie}
              animationData={ConfettiLottie}
              isStopped
              autoplay={false}
              delay={100}
            />
          </div>
          <div className={styleLayerWriteReview.textareaWrap}>
            <textarea placeholder='지금 이 기쁨을 공유해 보세요.' onChange={handleTextChange} value={text}></textarea>
            <div className={styleLayerWriteReview.textareaLength}>
              {text.length}<span>/</span>100
            </div>
          </div>
        </div>
        <div className={styleLayerWriteReview.btnWrap}>
          <Button disabled={text.length < 1}>당첨금 받으러가기</Button>
        </div>
      </div>
      {close && <ModalAlert title={false} message={`당첨금은 소감 입력 후 받을 수 있어요. \n지금 입력하고 당첨금 찾아가세요.`} confirm='다음에 찾기' onCancel={() => setClose(false)} />}
    </>
  )
}

export default LayerWriteReview;
