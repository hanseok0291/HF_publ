import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";

export default function Header({
  isShowBackBtn,
  isShowSearchBtn,
  isShowMypageBtn,
  isShowCloseBtn,
  isShowShareBtn,
  pageTitle,
  noFixed
}) {
  return (
    <div
      className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader} ${noFixed && styleDefaultLayout.noFixed}`}
    >
      <div
        className={`${styleDefaultLayout.container} ${styleCommon.pageHeader}`}
      >
        {isShowBackBtn && (
          <button
            type="button"
            className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
          >
            뒤로가기
          </button>
        )}
				<h1 className={`${styleDefaultLayout.pageTitle} ${!isShowBackBtn && styleDefaultLayout.pageTitleMain}`}>{pageTitle}</h1>
        
        {isShowCloseBtn && (
          <button
            type="button"
            className={`${styleCommon.btnIcon} ${styleCommon.btnClose}`}
          >
            닫기
          </button>
        )}

				{isShowShareBtn && (
          <button
					className={`${styleCommon.btnIcon} ${styleCommon.btnShareFill}`}
				>
					공유하기
				</button>
        )}
        {isShowSearchBtn && (
          <button
            type="button"
            className={`${styleCommon.icon} ${styleCommon.iconSearch2}`}
          ></button>
        )}
        {isShowMypageBtn && (
          <button
            type="button"
            className={`${styleCommon.icon} ${styleCommon.iconMy}`}
          >
            <span className={`${styleCommon.labelRound}`}>32</span>
          </button>
        )}
      </div>
    </div>
  );
}
