import { BottomSheet } from "react-spring-bottom-sheet";
import styleIndex from "../../../../styles/retto_pub/BottomSheetLottoAgree.module.css";
//css
import "react-spring-bottom-sheet/dist/style.css";
import { useState } from "react";
import TermsAgree from "@/components/coupon_pub/common/TermsAgree";
// import TermsAgree from "../TermsAgree";


const BottomSheetLottoAgree = ({ close, open }) => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <BottomSheet
        open={open}
        onDismiss={close}
        snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
        blocking={true}
        className={styleIndex.bottomSheet}
        style={{ position: "relative", zIndex: 1000 }}
      >
        <div className={`${styleIndex.modalBody}`}>
          <div className={styleIndex.topContainer}>
            <h2 className={styleIndex.titleText}>알아서 쌓이는 리워드 로또를 모아보세요</h2>
            <p className={styleIndex.subText}>
              발소 리워드 로또 서비스를 이용하기 위해 발로소득 전체 서비스에 가입되며, 발소 리워드 로또 지급 내역이 연동되고, 추첨 결과를 확인할 수 있어요.
            </p>
            <div className={styleIndex.termsContainer}>
              <div className={styleIndex.termsBox}>
                <p>서비스 이용약관(필수)</p>
                <button type="button" onClick={() => setShowTerms(true)}></button>
              </div>
              <div className={styleIndex.termsBox}>
                <p>개인정보 수집 및 이용(필수)</p>
                <button type="button" onClick={() => setShowTerms(true)}></button>
              </div>
              <p className={styleIndex.infoText}>본 약관은 (주)헥토이노베이션에서 운영하는 발로소득 서비스에 대한 약관이에요.</p>
              <div className={styleIndex.termsBox}>
                <div>
                  <p>개인정보 제3자 제공 동의(필수)</p>
                  <span className={styleIndex.botText}>제공받는자 : (주)헥토이노베이션</span>
                </div>
                <button type="button" onClick={() => setShowTerms(true)}></button>
              </div>
            </div>
          </div>
          <div className={styleIndex.btnWrap}>
            <button type="button" className={styleIndex.receiveBtn}>동의하고 발소 리워드 로또 받기</button>
            <button type="button" className={styleIndex.closeBtn} onClick={close}>닫기</button>
          </div>
        </div>
      </BottomSheet>

      {/* 약관 상세 모달 */}
      {showTerms && (
        <TermsAgree />
      )}
    </>
  );
};

export default BottomSheetLottoAgree;
