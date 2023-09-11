import { BottomSheet } from "react-spring-bottom-sheet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Button from "../Button";


//css
import "swiper/css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleRettoModal from "../../../../styles/retto_pub/Modal.module.css";
import "react-spring-bottom-sheet/dist/style.css";

// success true 이후 회색 배경 emergency true 시 빨간 스타일
const stampProgress = [
  {
    week: "월요일",
    success: false,
    emergency: false,
  },
  {
    week: "화요일",
    success: false,
    emergency: false,
  },
  {
    week: "수요일",
    success: false,
    emergency: false,
  },
  {
    week: "목요일",
    success: false,
    emergency: false,
  },
  {
    week: "금요일",
    success: true,
    emergency: true,
  },
  {
    week: "토요일",
    success: false,
    emergency: false,
  },
  {
    week: "일요일",
    success: false,
    emergency: false,
  },
]

const BottomSheetSaveingList = ({ isHundredOpen, closeHundredPopup }) => {
  let successIndex = 7;

  return (
    <BottomSheet
      open={true}
      onDismiss={closeHundredPopup}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
      blocking={false}
      sibling={
        <div
          className={styleModal.bottomSheetDim}
          onClick={closeHundredPopup}
        ></div>
      }
      className={styleModal.bottomSheet}
      style={{ position: "relative", zIndex: 1000 }}
      header={
        <>
          <div className={`${styleModal.modalHeader}`}>
            <button
              type="button"
              className={styleModal.slideCloseBtn}
              onClick={closeHundredPopup}
            ></button>
          </div>
        </>
      }
    >
      <div className={`${styleModal.modalBody} ${styleRettoModal.bottomSheetBody} ${styleRettoModal.rettoSaveingList}`}>
        <Swiper navigation={true} modules={[Navigation]}>
          <SwiperSlide>
            <h2>잘 관리하고 있어요</h2>
            {/* <h2>적립에 성공했네요</h2> */}
            <p>1주일 다 채우면 다이아 리또 1개!</p>
            {/* <p>다이아 리또 1개가 쌓였어요.!</p> */}
            <div>
              {/* <p className={styleRettoModal.boxText}>한 걸음씩~</p> */}
              {/* <p className={styleRettoModal.boxText}>반짝반짝★</p> */}
              <p className={`${styleRettoModal.boxText} ${styleRettoModal.red}`}><b>195,212원</b> 더 채워져야 해요</p>{/* styleRettoModal.red  추가 시 안내 배경 빨간색 */}
              <div className={`${styleRettoModal.imgWrap} diamond`}>
                <span className={`${styleRettoModal.jewelImg} jewelImg`}></span>
                <span className={`${styleRettoModal.jewelShadow}`}></span>
              </div>
              <div className={styleRettoModal.rettoFillWrap}>
                {stampProgress.map((item, index) => {
                  if (item.success) {
                    successIndex = index;
                  }
                  return (
                    <div key={index} className={`${item.success ? styleRettoModal.success : ""} ${item.emergency ? styleRettoModal.emergency : ""}`}>
                      <span className={`${styleRettoModal.bar} ${successIndex < index && styleRettoModal.off}`}></span>
                      <span className={styleRettoModal.week}>{item.week}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <h2>잘 관리하고 있어요</h2>
            {/* <h2>적립에 성공했네요</h2> */}
            <p>1주일 다 채우면 다이아 리또 1개!</p>
            {/* <p>다이아 리또 1개가 쌓였어요.!</p> */}
            <div>
              {/* <p className={styleRettoModal.boxText}>한 걸음씩~</p> */}
              {/* <p className={styleRettoModal.boxText}>반짝반짝★</p> */}
              <p className={`${styleRettoModal.boxText} ${styleRettoModal.red}`}><b>195,212원</b> 더 채워져야 해요</p>
              <div className={`${styleRettoModal.imgWrap} diamond`}>
                <span className={`${styleRettoModal.jewelImg} jewelImg`}></span>
                <span className={`${styleRettoModal.jewelShadow}`}></span>
              </div>
              <div className={styleRettoModal.rettoFillWrap}>
                {stampProgress.map((item, index) => {
                  if (item.success) {
                    successIndex = index;
                  }
                  return (
                    <div key={index} className={`${item.success ? styleRettoModal.success : ""} ${item.emergency ? styleRettoModal.emergency : ""}`}>
                      <span className={`${styleRettoModal.bar} ${successIndex < index && styleRettoModal.off}`}></span>
                      <span className={styleRettoModal.week}>{item.week}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className={styleRettoModal.buttonWrap}>
          <Button>자동 충전으로 편하게 관리</Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default BottomSheetSaveingList;
