import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";

export default function Header({openHundredPopup}) {
  return (
    <div
      className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader} ${styleDefaultLayout.hundredDealHeader}`}
    >
      <div className={`${styleDefaultLayout.container}`}>
        <button
          type="button"
          className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
        >
          뒤로가기
        </button>
        <h1 className={styleDefaultLayout.pageTitle}>포인트 100원딜</h1>
        <button type="button" onClick={openHundredPopup}>100원딜?</button>
      </div>
    </div>
  );
}
