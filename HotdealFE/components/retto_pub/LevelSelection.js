import React, { useState } from 'react';
import Slider from 'rc-slider'; // rc-slider 컴포넌트
import 'rc-slider/assets/index.css'; // rc-slider 스타일링
import Button from './common/Button';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import { useEffect } from 'react';

const { Handle } = Slider;


const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <div
      key={index}
    >
      <Handle value={value} {...restProps} />
    </div>
  );
};


// change true일 경우 선택하기 단계로 안감
const LevelSelection = ({change, buttonText, jewel, setJewel, full, handleModalToggle}) => {
  const [value, setValue] = useState(26); // 단계별로 26, 48, 70, 92
  const [handleText, setHandelText] = useState(<p className={`${styleCommon.textBox} ${styleCommon.first}`} style={{left: `${value-2}%`}}>움직여서 선택하기</p>);
  const snapPoints = [26, 48, 70, 92];

  const handleSliderChange = (newValue) => {
    const snapPrice = [10, 50, 100, 100];
    const jewelCase = [{
        eng: 'ruby',
        kor: '루비',
        cash: '30',
        prize: '1백만원',
        level: "Lv. 1"
      },
      {
        eng: 'emerald',
        kor: '에메랄드',
        cash: '50',
        prize: '1천만원',
        level: "Lv. 2"
      },
      {
        eng: 'diamond',
        kor: '다이아',
        cash: '100',
        prize: '1억원',
        level: "MAX."
      },
    ];

    if(change && newValue < snapPoints[1]){
      newValue = snapPoints[1];
    } else if( newValue < snapPoints[0]){
      newValue = snapPoints[0];
    } else if(newValue > snapPoints[3]) {
      newValue = snapPoints[3];
    } else {
      setValue(newValue);
    }
    

    const price = snapPoints.map((item, index) => {
      if(newValue === snapPoints[0] && index === 0){
        setJewel(null);
        return (
          <p key={index} className={styleCommon.textBox} style={{left: `${item-2}%`}}>움직여서 선택하기</p>
        );
      } else if(newValue === item) {
        setJewel(jewelCase[index-1]);
        return (
          <p key={index} className={styleCommon.textBox} style={{left: `${item-2}%`}}>
            <span>
              <em>{`${snapPrice[index - 1]}만원까지`}</em><br />
              채우기
            </span>
          </p>
        );
      }
    });
    setHandelText(price);
  };

  return (
    <>
      {!jewel ? (
        <div className={styleCommon.before}>
          <div className={styleCommon.topTextWrap}>
            <p className={styleCommon.text1}>먼저 <b>리또</b>를 선택해볼까요?</p>
            <p className={styleCommon.text2}><b>레벨이 높을수록 최대 당첨금 UP !</b></p>
          </div>
          <div className={styleCommon.grayBox}>
            <p className={styleCommon.topText}>실제 로또 번호와 일치하면</p>
            <div className={styleCommon.jewelWrap}>
              <div className={styleCommon.jewelBox}>
                <span className={styleCommon.jewelImg}></span>
                <p>Lv. 1 <span className={styleCommon.jewelColor}>루비</span></p>
                <strong>1백만원</strong>
              </div>
              <div className={styleCommon.jewelBox}>
                <span className={styleCommon.jewelImg}></span>
                <p>Lv. 2 <span className={styleCommon.jewelColor}>에메랄드</span></p>
                <strong>1천만원</strong>
              </div>
              <div className={styleCommon.jewelBox}>
                <span className={styleCommon.jewelImg}></span>
                <p>MAX. <span className={styleCommon.jewelColor}>다이아</span></p>
                <strong>1억원</strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styleCommon.levelWrap} ${jewel.eng}`}>
          <div className="jewelImg"></div>
          <p className={styleCommon.levelText}>Lv. 1<button type='button'></button></p>
          <p className={styleCommon.subText}>
            {jewel.eng === 'ruby' && !full && (
              <>
                <span className='jewelColor'>{jewel.kor}</span>가 마음에 드세요? <br />
                <b>최대 1백만원 당첨</b> 가능해요!
              </>
            )}
            {jewel.eng === 'emerald' && !full && (
              <>
                <span className='jewelColor'>{jewel.kor}</span>는 어때요?<br />
                <b>최대 1천만원 행운</b>이 기다려요!
              </>
            )}
            {jewel.eng === 'diamond' && !full && (
              <>
                <span className='jewelColor'>{jewel.kor}</span>는 역시 빛나네요! <br />
                나도 <b>최대 1억원의 주인공?!</b>
              </>
            )}
            {!full && (
              <span className={styleCommon.priceMoney}>
                채운 금액은 상자에 따로 보관돼요.
              </span>
            )}
            {full && (
              <>
                <b>{jewel.cash}만원까지 이미 채워져 있네요.</b> <br />
                <span className='jewelColor'>{jewel.kor}</span> 리또 받을 준비 끝 !
                <span className={styleCommon.priceMoney}>
                  <span>최대 {jewel.prize} 당첨</span> 가능해요. <br />
                  채운 금액은 상자에 따로 보관돼요.
                </span>
              </>
            )}
          </p>
          {/* <p>
            <b>30만원까지 이미 채워져 있네요.</b> <br /> 
            <span>루비</span> 리또 받을 준비 끝 !
          </p> */}
          <div className={styleCommon.moneyWrap}>
            <dl>
              <dt>채우기 상자</dt>
              <dd>100,000원</dd>
            </dl>
            <dl>
              <dt>내 보유 머니</dt>
              <dd>15,000원</dd>
            </dl>
            {!full && (
              <dl>
                <dt>채우기 <button type='button' className={styleCommon.accountButton}><img src="../../images/coupon/logo/brand/bank1.png" alt="" />신한789</button></dt>
                <dd><span className='jewelColor'>15,000원</span></dd>
              </dl>
            )}
            {/* 레벨 변경 레이어 팝업으로 사용 될 때 노출 됨 */}
            {/* <div className={styleCommon.changeText}>
              <p><b>변경된 레벨은 다음주 월요일부터 적용</b></p>
              <p>부족한 머니도 그때 충전해서 채울게요.</p>
            </div> */}
          </div>
        </div>
      )}
        
        <div className={`${styleCommon.dragButtonWrap} ${value <= snapPoints[0] ? styleCommon.min : ''} ${snapPoints[3] <= value ? styleCommon.max : ''}`}>
          <div className={styleCommon.textBoxWrap}>
            {handleText}
          </div>
          <Slider
            min={4}
            max={100}
            value={value}
            onChange={handleSliderChange}
            handle={handle}
            handleStyle={{animation: 'heartbeat 0.6s ease-in-out infinite both'}}
            step={22}
            className={value === 26 && 'addAni'}
          />
        </div>
        <Button margin="20px 0 18px" disabled={snapPoints[0] < value ? false : true} handleModalToggle={handleModalToggle}>{buttonText}</Button>
    </>
  )
}

export default LevelSelection;
