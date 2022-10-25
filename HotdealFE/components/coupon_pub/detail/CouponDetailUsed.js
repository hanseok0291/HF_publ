import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSlick from "../../../styles/coupon_pub/Slick.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";

export default function CouponDetail() {
  return (
    <>
      <div
        className={`${styleCouponDetail.CouponDetailWrap} ${styleCouponDetail.barcode}`}
      >
        <div>
          <div>
            <div className={`${styleSlick.card} ${styleCouponDetail.card}`}>
              {/* 미사용 */}
              {/* <div
                className={`${styleCouponDetail.imgBox} ${styleCommon.imgBox}`}
              >
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div> */}
              {/* //미사용 */}
              {/* 사용완료 */}
              <div
                className={`${styleCouponDetail.imgBox} ${styleCommon.imgBox} ${styleCommon.stamp} ${styleCommon.stamp_1} ${styleCommon.rightMedium}`}
              >
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              {/* //사용완료 */}
            </div>
          </div>
          <div className={`${styleCommon.container}`}>
            <div
              className={`${styleSlick.infoBox} ${styleCouponDetail.infoBox}`}
            >
              <p className={styleCouponDetail.infoBrand}>스타벅스</p>
              <p className={styleCouponDetail.infoProduct}>
                시원하게 함께 세트 기본영역
              </p>
            </div>

            <div className={`${styleCouponDetail.modalList}`}>
              <div className={`${styleCouponDetail.modalItem}`}>
                <p className={`${styleCouponDetail.barcodeWrap}`}>
                  <img
                    src="../../../../images/coupon/icon/common/barcode.png"
                    alt="바코드"
                  />
                </p>
                <p className={`${styleCouponDetail.btnWrap}`}>
                  <span>0123 456 789</span>
                  <button
                    type="button"
                    className={`${styleCouponDetail.btn} ${styleCommon.btn}`}
                  >
                    복사
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className={styleCouponDetail.detailCon}>
            <div className={styleCouponDetail.topCon}>
              <div className={styleCouponDetail.leftCon}>
                <span className={styleCouponDetail.name}>To.이헥토</span>
                <span className={styleCouponDetail.number}>010-****-1234</span>
              </div>
              <button className={styleCouponDetail.messageBtn}>
                받은 메시지
              </button>
            </div>
            <div className={styleCouponDetail.mainCon}>
              <dl>
                <dt>유효기간</dt>
                <dd>2022. 10. 10</dd>
                <dt>쿠폰상태</dt>
                <dd>일부 사용</dd>
                <dt>사용 일시</dt>
                <dd>2022. 6. 1</dd>
                <dt>사용 후 잔액</dt>
                <dd>2,400원</dd>
                <dt>적립 예정 포인트</dt>
                <dd>사용 시 100원</dd>
              </dl>
            </div>
          </div>
          <div className={`${styleCouponDetail.InfoWrap}`}>
            <div className={`${styleCommon.container}`}>
              <ul className={`${styleCouponDetail.InfoTab}`}>
                <li
                  className={`${styleCouponDetail.active} ${styleCommon.halfWrap}`}
                >
                  <button type="button">사용안내</button>
                </li>
                <li className={`${styleCommon.halfWrap}`}>
                  <button type="button">유의사항</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styleCouponDetail.CouponDetailWrap}`}>
          <div className={`${styleCouponDetail.CouponDetailInfoWrap}`}>
            <div
              className={`${styleCouponDetail.TabContent} ${styleCouponDetail.TabContentOn}`}
            >
              <div
                className={`${styleCommon.container} ${styleCouponDetail.InfoTabContent}`}
              >
                - 물품형 교환권을 기 - 물품형 교환권을 기재된 상품이 아닌 타
                상품으로 교환할 경우, 쿠폰 가격 이상의 다른 상품으로 교환
                가능하며, 초과 금액은 추가로 지불하셔야 합니다.
                <br />
                - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
                교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
                이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로
                지불하셔야 합니다.
                <br />
                - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
                교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
                이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로
                지불하셔야 합니다.
                <br />
                - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
                교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
                이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로
                지불하셔야 합니다.
                <br />
                - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
                교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
                이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로
                지불하셔야 합니다.
                <br />
                - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 포인트
                적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다
              </div>
            </div>
            <div className={`${styleCouponDetail.TabContent}`}>
              <div className={`${styleCommon.container}`}>
                <div className={`${styleCouponDetail.TabContentBox}`}>
                  <p className={`${styleCouponDetail.TabContentTitle}`}>
                    상품 고시 정보
                  </p>
                  <p>
                    <span className={`${styleCouponDetail.TabContentLeft}`}>
                      발행자
                    </span>{" "}
                    <span className={`${styleCouponDetail.TabContentRight}`}>
                      (주)헥토파이낸셜
                    </span>
                  </p>
                  <p>
                    <span className={`${styleCouponDetail.TabContentLeft}`}>
                      유효기간
                    </span>{" "}
                    <span className={`${styleCouponDetail.TabContentRight}`}>
                      2022. 5. 30
                    </span>
                  </p>
                  <p>
                    <span className={`${styleCouponDetail.TabContentLeft}`}>
                      교환권 공급자
                    </span>{" "}
                    <span className={`${styleCouponDetail.TabContentRight}`}>
                      (주)케이티알파
                    </span>
                  </p>
                  <p>
                    <span className={`${styleCouponDetail.TabContentLeft}`}>
                      이용 조건
                    </span>{" "}
                    <span className={`${styleCouponDetail.TabContentRight}`}>
                      상품상세설명 참조
                    </span>
                  </p>
                  <p>
                    <span className={`${styleCouponDetail.TabContentLeft}`}>
                      이용 가능 매장
                    </span>{" "}
                    <span className={`${styleCouponDetail.TabContentRight}`}>
                      상품상세설명 참조
                    </span>
                  </p>
                  <p>
                    <span className={`${styleCouponDetail.TabContentLeft}`}>
                      소비자 상담
                    </span>{" "}
                    <span className={`${styleCouponDetail.TabContentRight}`}>
                      1600-5200(결제 문의) <br />
                      1588-6474(사용 문의)
                    </span>
                  </p>
                </div>
                <div className={`${styleCouponDetail.TabContentBox}`}>
                  <p className={`${styleCouponDetail.TabContentTitle}`}>
                    취소 · 환불 · 유효기간 연장 정책 및 방법
                  </p>
                  <p className={`${styleCouponDetail.TabContentLeft}`}>
                    별도 전달 예정 별도 전달 예정
                    <br />
                    별도 전달 예정 별도 전달
                    <br />
                    별도 전달 예정
                    <br />
                    별도 전달{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 자동 사용, 버튼 있을 경우 */}
          <div
            className={`${styleCouponDetail.CouponDetailBottomWrap} ${styleCommon.bottomFixedWrap}`}
          >
            <div className={`${styleCouponDetail.nowViewWrap}`}>
              <span>자동 사용 설정 OFF </span>상태입니다
            </div>
            {/* 버튼 4개일 경우 ${styleCommon.btnWrap}에 ${styleCommon.fourBtn} 클래스 추가 */}
            <div className={`${styleCommon.btnWrap}`}>
              <button className={`${styleCommon.btnGift} ${styleCommon.btn}`}>
                쿠폰 저장
              </button>
              <button className={`${styleCommon.btnGiftMe} ${styleCommon.btn}`}>
                자동 사용 설정
              </button>
            </div>
          </div>
          {/* //자동 사용, 버튼 있을 경우 */}
        </div>
      </div>
    </>
  );
}
