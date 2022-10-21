import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleProductList from "../../../styles/coupon_pub/ProductList.module.css";

const ProductList = () => {

	return (
		<>
			{/* 브랜드리스트 메뉴 */}
			<div className={styleProductList.ProductListWrap}>
				<div className={`${styleProductList.ProductListBox} ${styleProductList.ProductList1}`}>
					<div className={`${styleCommon.container} ${styleProductList.container}`}>
						<h3 className={styleProductList.ProductListTitle}>
							<span className={styleProductList.ProductListTitle}>카페·베이커리</span>
							<span className={styleProductList.ProductListCount}> 12개</span>
						</h3>
					</div>
				</div>
				<div className={styleProductList.ProductList}>
				</div>
			</div>
		</>
	);
};

export default ProductList;