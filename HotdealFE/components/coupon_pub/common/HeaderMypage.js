import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";

export default function HeaderMypage({
  isShowSearchBtn,
  isShowMypageBtn,
  isShowRegCodeBtn,
  pageTitle,
}) {
  return (
    <div
      className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader}`}
    >
      <div className={`${styleDefaultLayout.container}`}>
        <button
          type="button"
          className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
        >
          뒤로가기
        </button>
        <h1 className={styleDefaultLayout.pageTitle}>{pageTitle}</h1>
        {isShowRegCodeBtn ? (
          <>
            <button
              type="button"
              className={`${styleCommon.icon} ${styleCommon.iconReg}`}
            >
              쿠폰 코드 등록
            </button>
            <span className={`${styleCommon.tooltip}`}>
              등록 후 바로 사용 가능해요
              <i className={`${styleCommon.italic}`}>!</i>
            </span>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
