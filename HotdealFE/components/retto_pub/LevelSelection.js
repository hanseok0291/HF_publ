import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider'; // rc-slider 컴포넌트
import 'rc-slider/assets/index.css'; // rc-slider 스타일링
import Button from './common/Button';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';

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

const jewelCase = [{
    eng: 'ruby',
    kor: '루비',
    cash: '10',
    prize: '1백만원',
  },
  {
    eng: 'emerald',
    kor: '에메랄드',
    cash: '50',
    prize: '1천만원',
  },
  {
    eng: 'diamond',
    kor: '다이아',
    cash: '100',
    prize: '1억원',
  },
];

// change true일 경우 선택하기 단계로 안감
// case1 리또 루비 신청 case3 레벨 상향 보유 일반머니 충분 case4 레벨 상향 필요 머니 1000원 이상 case5 레벨 상향 필요머니 1000원 미만
const LevelSelection = ({change, buttonText, jewel, setJewel, full, handleModalToggle, rettoLevel = 26, ...props}) => {
  const [value, setValue] = useState(rettoLevel); // 단계별로 26, 48, 70, 92
  const snapPoints = [26, 48, 70, 92];
  const increase = rettoLevel < value; // 상향 시 true 하향시 false
  const decrease = rettoLevel > value; // 상향 시 true 하향시 false
  const initialJewel = jewelCase[snapPoints.indexOf(rettoLevel) - 1];
  const [handleText, setHandelText] = useState(rettoLevel === 26 ? <p className={`${styleCommon.textBox} ${styleCommon.first}`} style={{left: `${value-2}%`}}>움직여서 선택하기</p> :<p className={styleCommon.textBox} style={{left: `${value-2}%`}}><span><em>{`${initialJewel.cash}`}만원까지</em><br />채우기</span></p>);

  const handleSliderChange = (newValue) => {
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
              <em>{jewelCase[index-1].cash}만원까지</em><br />
              채우기
            </span>
          </p>
        );
      }
    });
    setHandelText(price);
  };

  useEffect(() => {
    setJewel(initialJewel);
  }, [])

  return (
    <>
      {!jewel ? (
        <div className={styleCommon.before}>
          <div className={styleCommon.topTextWrap}>
            <p className={styleCommon.text1}><b>발소 리워드 로또</b>를 선택해볼까요?</p>
            <p className={styleCommon.text2}><b>다이아로 갈수록 당첨 확률 UP !</b></p>
          </div>
          <div className={styleCommon.grayBox}>
            <p className={styleCommon.topText2}>매주 지급되는 발소 리워드 로또 수</p>
            <div className={styleCommon.jewelWrap}>
              <div className={styleCommon.jewelBox}>
                <span className={styleCommon.jewelImg}></span>
                <p><span className={styleCommon.jewelColor}>루비</span></p>
                <strong>7개</strong>
              </div>
              <div className={styleCommon.jewelBox}>
                <span className={styleCommon.jewelImg}></span>
                <p><span className={styleCommon.jewelColor}>에메랄드</span></p>
                <strong>14개</strong>
              </div>
              <div className={styleCommon.jewelBox}>
                <span className={styleCommon.jewelImg}></span>
                <p><span className={styleCommon.jewelColor}>다이아</span></p>
                <strong>21개</strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styleCommon.levelWrap} ${jewel.eng}`}>
          <div className="jewelImg"></div>
          <p className={styleCommon.subText}>
            {jewel.eng === 'ruby' && (
              <>
                {rettoLevel === 48 ?
                  <>
                    {/* 레벨 동일 시 적용 문구 */}
                    지금 <span className='jewelColor'>{jewel.kor}</span> 진행 중이에요. <br />
                    다이아로 변경해서 큰 행운을 잡으세요.
                  </> : 
                  <>
                    <span className='jewelColor'>{jewel.kor}</span>가 마음에 드세요?<br />
                    {props.case1 ? <>매일 1개씩 드려요.</> : <>10주차 성공 선물을 받을 수 없어요.</>}
                  </> 
                }
              </>
            )}
            {jewel.eng === 'emerald' && (
              <>
                {rettoLevel === 70 ?
                  <>
                    {/* 레벨 동일 시 적용 문구 */} 
                    지금 <span className='jewelColor'>{jewel.kor}</span> 진행 중이에요. <br />
                    10주마다 <b>편의점 기프티콘</b>을 드려요!
                  </> : 
                  <>
                    {
                      increase ? 
                      <>
                      <span className='jewelColor'>{jewel.kor}</span>는 매주 14개씩!<br />
                      10주마다 <b>편의점 기프티콘</b>을 드려요.
                    </>
                  :
                    <>
                      <span className='jewelColor'>{jewel.kor}</span>가 마음에 드세요?<br />
                      당첨금과 10주차 성공 선물이 작아져요.
                    </>
                    }
                  </> 
         
                }
                
              </>
            )}
            {jewel.eng === 'diamond' && (
              <>
                {rettoLevel === 92 ?
                  <>
                    {/* 레벨 동일 시 적용 문구 */}
                    지금 <span className='jewelColor'>{jewel.kor}</span> 진행 중이에요. <br />
                  </> :
                  <>
                    <span className='jewelColor'>{jewel.kor}</span>는 매주 21개씩!<br />
                  </> 
                }
                10주마다 <b>커피 기프티콘</b>을 드려요.
              </>
            )}
            {full && (
              <>
                {/* <b>{jewel.cash}만원까지 이미 채워져 있네요.</b> <br />
                <span className='jewelColor'>{jewel.kor}</span> 리또 받을 준비 끝! */}
                {/* <span className={styleCommon.priceMoney}>
                  <span>최대 {jewel.prize} 당첨</span> 가능해요. <br />
                  머니함에 보관할게요.
                </span> */} 
                {!props.case3 && props.case4 && increase && 
                  <span className={styleCommon.priceMoney}>
                    부족한 금액은 연결 계좌에서 충전해 <br />
                    <span>머니함</span>에 보관할게요.
                  </span>
                }
                {!props.case3 && props.case5 && increase && 
                  <span className={styleCommon.priceMoney}>
                    <span>최소 1천원부터 충전 가능</span>해요. <br />
                    <span>머니함</span>에 보관할게요.
                  </span>
                }
                {decrease && 
                  <span className={styleCommon.priceMoney}>
                    {jewel.cash}만원을 제외한 기존 머니함 속 금액은 <br />
                    <span>보유 머니로 이동</span>돼요. 
                  </span>
                }
              </>
            )}
          </p>
          <div className={styleCommon.moneyWrap}>
            {!increase &&
              <dl>
                <dt>머니함</dt>
                <dd>100,000원</dd>
              </dl>
            }
            {increase &&
              <dl>
                <dt>보유 일반 머니</dt>
                <dd>15,000원</dd>
              </dl>
            }
            {!props.case3 && increase && (props.case4 || props.case5) && (
              <dl>
                <dt>채우기 <button type='button' className={styleCommon.accountButton}><img src="../../images/coupon/logo/brand/bank1.png" alt="" />신한789</button></dt>
                <dd><span className='jewelColor'>15,000원</span></dd>
              </dl>
            )}
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
