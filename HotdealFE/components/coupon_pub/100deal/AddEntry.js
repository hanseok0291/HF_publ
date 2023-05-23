import styleModal from "../../../styles/coupon_pub/Modal.module.css";

const AddEntry = ({src, alt}) => {

  return (
    <div className={styleModal.addEntry}>
      <div className={styleModal.imgWrap}>
        <img src={src} alt="메가박스 2인 관람권 팝콘 세트" />
      </div>
      <div className={styleModal.textWrap}>
        <p className={styleModal.product}>메가박스 2인 관람권 팝콘 세트</p>
        <div className={styleModal.botCon}>
          <span>5회 응모</span>
          <div className={styleModal.countBox}>
            <button type="button" className={styleModal.minusBtn}>-</button>
            <span>0</span>
            <button type="button" className={styleModal.plusBtn}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AddEntry;
