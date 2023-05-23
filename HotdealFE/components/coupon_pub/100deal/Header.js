import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";

export default function Header({
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
        <h1 className={styleDefaultLayout.pageTitle}>포인트 100원딜</h1>
      </div>
    </div>
  );
}
