import { useRef, useState } from "react";
import styleModal from "../../../styles/coupon_pub/Modal.module.css";

const AddEntry = ({ defaultCount, src, alt, disabled}) => {
  const [count, setCount] = useState(0);
  const countNumRef = useRef();
  const onDecrease = () => {
    if(count !== 0){
      setCount(count - 1);
    }
  }
  const onIncrement = () => {
    setCount(count + 1);
  }
  return (
    <div className={styleModal.addEntry}>
      <div className={styleModal.imgWrap}>
        <img src={src} alt={alt} />
      </div>
      <div className={styleModal.textWrap}>
        <p className={styleModal.brand}>메가박스</p>
        <p className={styleModal.product}>2인 관람권 팝콘 세트</p>
        <div className={styleModal.botCon}>
          <span>{defaultCount + count}회 응모</span>
          <div className={`${styleModal.countBox} ${disabled && styleModal.disabled}`}>
            <button type="button" className={`${styleModal.minusBtn} ${count === 0 && styleModal.disabled}`} onClick={onDecrease}>-</button>
            <span ref={countNumRef}>{count}</span>
            <button type="button" className={styleModal.plusBtn} onClick={onIncrement}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AddEntry;
