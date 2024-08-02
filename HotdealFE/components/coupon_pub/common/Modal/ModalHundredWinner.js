import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/coupon_pub/Filter.module.css";
import { useRef } from "react";
import { useEffect } from "react";

const ModalHundredWinner = ({ show, onClose }) => {
  const [isBlur, setIsBlur] = useState(false);
  const winnerBodyRef = useRef();
  
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = winnerBodyRef.current;
    if(scrollTop + clientHeight === scrollHeight){
      setIsBlur(false);
    } else {
      setIsBlur(true);
    }
  };
  
  useEffect(() => {
    if (process.browser) {
      const { clientHeight, scrollHeight } = winnerBodyRef.current;
      console.log(clientHeight, scrollHeight)
      if(scrollHeight === clientHeight){
        setIsBlur(false);
      } else {
        setIsBlur(true);
      }
      winnerBodyRef.current.addEventListener("scroll", handleScroll);
    }
  }, []);
  
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
              className={`${styleModal.modalTitle} ${styleModal.modalTitleLine} ${styleFilter.modalTitle}`}
            >
              <span>
                당첨자 <span className={styleFilter.redText}>30명</span>
              </span>
              <button
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
              >
                닫기
              </button>
            </h3>
          </div>
          <div
            className={`${styleModal.modalBody} ${styleFilter.modalBody} ${styleFilter.modalBodyScroll} ${styleFilter.winnerBody} ${isBlur ? styleFilter.blur : ''}`}
            ref={winnerBodyRef}
          >
            <ul className={styleFilter.winnerList}>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>

              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
              <li>
                <strong>안*****지</strong>
                (1234)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalHundredWinner;
