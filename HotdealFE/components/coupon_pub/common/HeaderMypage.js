import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";

export default function HeaderMypage({
	isShowSearchBtn,
	isShowMypageBtn,
	pageTitle
}) {
	return (
		<div 
			className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader}`}
		>
			<div className={`${styleDefaultLayout.container}`}>
				<button type="button"
							className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
				>뒤로가기</button>
				<h1 className={styleDefaultLayout.pageTitle}>{pageTitle}</h1>
				<button
					type="button"
					className={`${styleCommon.icon} ${styleCommon.iconReg}`}
					>선물 코드 등록</button>
				<span className={`${styleCommon.tooltip}`}>지금 바로 사용해 보세요<i className={`${styleCommon.italic}`}>!</i></span>
			</div>
		</div>
	)
}