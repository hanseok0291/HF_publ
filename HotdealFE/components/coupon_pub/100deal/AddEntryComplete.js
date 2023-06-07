import { useRef, useState } from "react";
import styleModal from "../../../styles/coupon_pub/Modal.module.css";

const AddEntryComplete = ({ defaultCount, src, alt, disabled}) => {
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
        <p className={styleModal.product}>메가박스 2인 관람권 팝콘 세트</p>
        <div className={styleModal.botCon}>
          <span>{defaultCount + count}회 응모</span>
        </div>
      </div>
    </div>
  );
};


export default AddEntryComplete;
