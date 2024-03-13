import { BottomSheet } from 'react-spring-bottom-sheet';

//css
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import 'react-spring-bottom-sheet/dist/style.css';

const ModalHundredealReEnter = ({noDeal}) => {

  return (
    <BottomSheet 
      open={true}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight * 0.9]}
      blocking={false}
      sibling={
        <div className={styleModal.bottomSheetDim}></div>
      }
      
      className={styleModal.bottomSheet}
      style={{position: 'relative', zIndex: 1000}}
      header={
        <>
          <div className={`${styleModal.modalHeader}`}>
            <button type="button" className={styleModal.slideCloseBtn}></button>
          </div>
        </>
      }
    >
      <div className={`${styleModal.modalBody} ${styleModal.hundredDealReEnter}`}>
        {noDeal ? (
          <>
            <h4 className={styleModal.titleText}>진행중인 100원딜이 없어요.</h4>
            <p className={styleModal.subText}>
              딜 오픈 후 다시 이용해 주세요!
            </p>
          </>
        ) : (
          <>
            <h4 className={styleModal.titleText}>오늘 이미 참여하셨네요.</h4>
            <p className={styleModal.subText}>
              내일 다시 이용해 주세요!
            </p>
          </>
        )}
        
        <button type="button" className={styleModal.defaultBtn}>확인</button>
      </div>
    </BottomSheet>
  )
};

export default ModalHundredealReEnter;
