import { useState } from "react";
import { BottomSheet } from 'react-spring-bottom-sheet';

//css
import styleCouponSet from "../../../../styles/coupon_pub/styleCouponSet.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import 'react-spring-bottom-sheet/dist/style.css';

const radioEx = [
  {
    id: 1,
    brand: "메가박스",
    productName: "2인 관람권 팝콘 세트",
    imgSrc: '../../images/100deal/sample/img-01.png',
    checked: false,
  },
  {
    id: 2,
    brand: "CU",
    productName: "모바일 상품권 1만원권",
    imgSrc: '../../images/100deal/sample/img-01.png',
    checked: false,
  },
  {
    id: 3,
    brand: "죠스떡볶이",
    productName: "2인 세트",
    imgSrc: '../../images/100deal/sample/img-01.png',
    checked: false,
  },
];

const ModalEntryAdd = ({ isEntryAddOpen, closeEntryAddPopup }) => {
  const [radioArr, setRadioArr] = useState(radioEx);
  const [btnAbled , setBtnAbled] = useState(true)

  const handleChange = (e) => {
    const idNum = parseInt(e.target.id);
    const changeValue = radioArr.map((item) => ({
      ...item,
      checked: item.id === idNum ? e.target.checked : false,
    }));
    setRadioArr(changeValue);
    setBtnAbled(false);
  };


  return (
    <BottomSheet 
      open={isEntryAddOpen}
      onDismiss={closeEntryAddPopup}
      snapPoints={({ minHeight }) => minHeight}
      blocking={false}
      sibling={
        <div className={styleModal.bottomSheetDim}  onClick={closeEntryAddPopup}></div>
      }
      className={styleModal.bottomSheet}
      style={{position: 'relative', zIndex: 997}}
      header={
        <div className={`${styleModal.modalHeader}`}>
          <button type="button" className={styleModal.slideCloseBtn} onClick={closeEntryAddPopup}></button>
        </div>
      }
    >
      <div className={`${styleModal.modalBody} ${styleModal.hundredDeal}`}>
        <div className={styleModal.titleText}>
          <p className={styleModal.botText}>어디에 응모할까요?</p>
        </div>
        <div className={styleModal.addEntryWrap}>
          <div className={styleModal.radioWrap}>
            {radioArr.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`${styleModal.radioBox}`}
                >
                  <label className={item.checked ? styleModal.on : ''}>
                    <img
                      src={item.imgSrc}
                      alt={item.productName}
                      className={styleModal.logoImg}
                    />
                    <div className={styleModal.textBox}>
                      <span className={styleModal.brand}>{item.brand}</span>
                      <span className={styleModal.productName}>{item.productName}</span>
                    </div>
                    <input
                      type="radio"
                      name="coupon"
                      id={item.id}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className={styleModal.radioCircle}></span>
                  </label>
                </div>
              );
            })}
          </div>
          <button type="button" className={styleModal.defaultBtn} disabled={btnAbled}>응모하러 가기</button> 
        </div>
      </div>
    </BottomSheet>
  )
};

export default ModalEntryAdd;
