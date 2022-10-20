import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleHotBrand from "../../../styles/coupon_pub/HotBrand.module.css";

const HotBrand = () => {
	return (
		<>
		<div className={styleHotBrand.HotBrandWrap}>
			<div className={`${styleCommon.container}`}>
				<h2 className={styleHotBrand.HotBrandTitle}>지금 가장 인기있어요<span>💗</span></h2>
				<ul className={styleHotBrand.HotBrandList}>
					<li>
						<button href={`/coupon_pub/`}>
							<div className={styleHotBrand.HotBrandImg}>
								<img src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/01.png" alt="핫딜 TEST"></img>
							</div>
							<p className={styleHotBrand.HotBrandName}>스타벅스스타벅스스타벅스스타벅스스타벅스스타벅스</p>
						</button>
					</li>
					<li>
						<button href={`/coupon_pub/`}>
							<div className={styleHotBrand.HotBrandImg}>
								<img src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/02.png" alt="핫딜 TEST"></img>
							</div>
							<p className={styleHotBrand.HotBrandName}>스타벅스</p>
						</button>
					</li>
					<li>
						<button href={`/coupon_pub/`}>
							<div className={styleHotBrand.HotBrandImg}>
								<img src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/03.png" alt="핫딜 TEST"></img>
							</div>
							<p className={styleHotBrand.HotBrandName}>스타벅스</p>
						</button>
					</li>
					<li>
						<button href={`/coupon_pub/`}>
							<div className={styleHotBrand.HotBrandImg}>
								<img src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/01.png" alt="핫딜 TEST"></img>
							</div>
							<p className={styleHotBrand.HotBrandName}>스타벅스</p>
						</button>
					</li>
					<li>
						<button href={`/coupon_pub/`}>
							<div className={styleHotBrand.HotBrandImg}>
								<img src="https://ux.sbsvc.online/010pay/react/test/images/coupon/logo/brand/02.png" alt="핫딜 TEST"></img>
							</div>
							<p className={styleHotBrand.HotBrandName}>스타벅스</p>
						</button>
					</li>
				</ul>
				<button href={`/coupon_pub/`} className={`${styleCommon.btn} ${styleHotBrand.HotBrandLink}`}>
					<span>77개</span> 브랜드 더보기 <i className={`${styleCommon.iconArrow} ${styleCommon.iconArrowRight}`}></i>
				</button>
			</div>
		</div>
		</>
	);
};

export default HotBrand;