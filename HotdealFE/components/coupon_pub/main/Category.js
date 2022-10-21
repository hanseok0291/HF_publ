import { useEffect, useState } from "react";
import { useRouter } from "next/router";


import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleNav from "../../../styles/coupon_pub/Nav.module.css";

const Category = () => {
	const handleHomeClick = () => {
		handleMainURL(router);
	}

	return (
		<>
			<div className={styleNav.navWrap}>
			{/* 카테고리 메뉴 */}
			<div className={`${styleCommon.container} ${styleNav.container}`}>
				<ul className={styleNav.nav}>
					<li className={styleNav.active}>
						<button href={`/coupon/`} className={styleCommon.btn}>
							<span>HOME</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span><span>👻</span>더위사냥</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span><span>⚡</span>핫딜</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span>상품권</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span>편의점·마트</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span>카페·베이커리</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span>아이스크림</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span>패스트푸드</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span>외식·문화생활</span>
						</button>
					</li>
					<li>
						<button href={`/list/`} className={styleCommon.btn}>
							<span>브랜드</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
		</>
	);
};

export default Category;