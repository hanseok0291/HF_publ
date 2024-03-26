import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/coupon_pub/Filter.module.css";

const ModalFilter = ({ title, list, closeModal }) => {
  const [countIndex, setCountIndex] = useState(0);

  const handleClick = (index) => {
    setCountIndex(index);
  }


  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.open}`}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog}`}
        style={{ bottom: "0" }}
      >
        <div className={`${styleModal.modalContent}`}>
          <div className={`${styleModal.modalHeader}`}>
            <h3
              className={`${styleModal.modalTitle} ${styleFilter.modalTitle}`}
            >
              {title}
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
                onClick={closeModal}
              >
                닫기
              </button>
            </h3>
          </div>
          <div className={`${styleModal.modalBody} ${styleFilter.modalBody} ${styleModal.bgWhite}`}>
            <div className={`${styleFilter.filterWrap}`}>
              {list.map((item, index) => (
                <p className={`${styleFilter.btn} ${countIndex === index && styleFilter.active}`} onClick={() => handleClick(index)} key={index}>
                  <button type="button">{item}</button>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
