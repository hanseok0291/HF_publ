import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSlick from "../../../styles/coupon_pub/Slick.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";

export default function CouponDetailSmall({ isfixedTop }) {
  return (
    <>
      {isfixedTop ? (
        <>
          <div
            className={`${styleCouponDetail.CouponDetailWrap} ${styleCouponDetail.fixed}`}
          >
            <div className={`${styleCommon.container}`}>
              {/* 추가할인 일때 ${styleCouponDetail.priceType2} 추가 */}
              <div
                className={`${styleCouponDetail.CouponDetaiSmalllWrap}`}
              >
                <div className={styleCouponDetail.imgBox}>
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>

                {/* 할인 */}
                <div className={`${styleCouponDetail.infoBox}`}>
                    <p className={styleCouponDetail.infoBrand}>스타벅스</p>
                    <p className={styleCouponDetail.infoProduct}>
                      시원하게 함께 세트
                    </p>
                    <div>
                      <p className={styleCouponDetail.infoPrice}>
                        <strong>6,300원</strong>
                      </p>
                    </div>
                  </div>
                {/* //할인 */}
                {/* 추가할인 */}
                {/* <div
                  className={`${styleCouponDetail.infoBox} ${styleCouponDetail.priceType2}`}
                >
                  <p className={styleCouponDetail.infoBrand}>스타벅스</p>
                  <p className={styleCouponDetail.infoProduct}>
                    시원하게 함께 세트
                  </p>
                  <div className={`${styleCouponDetail.priceType2}`}>
                    <span className={styleCouponDetail.infoDcPrice}>
                      9,000원
                    </span>
                    <span className={styleCouponDetail.infoPrice}>
                      <span>30%</span> <strong>6,300원</strong>
                    </span>
                    <span className={styleCouponDetail.infoPrice}>
                      <span>+추가 10%</span> <strong>5,670원</strong>
                    </span>
                  </div>
                </div> */}
                {/* 추가할인 */}
              </div>
            </div>
            <div className={`${styleCouponDetail.InfoWrap}`}>
              <div className={`${styleCommon.container}`}>
                <ul className={`${styleCouponDetail.InfoTab}`}>
                  <li className={`${styleCommon.halfWrap}`}>
                    <button type="button">사용안내</button>
                  </li>
                  <li
                    className={`${styleCouponDetail.active} ${styleCommon.halfWrap}`}
                  >
                    <button type="button">유의사항</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styleCouponDetail.CouponDetailWrap}`}>
            <div className={`${styleCouponDetail.CouponDetailInfoWrap}`}>
              <div className={`${styleCouponDetail.TabContent}`}>
                <div
                  className={`${styleCommon.container} ${styleCouponDetail.InfoTabContent}`}
                >
                  - 물품형 교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우,
                  쿠폰 가격 이상의 다른 상품으로 교환 가능하며, 초과 금액은
                  추가로 지불하셔야 합니다.
                  <br />
                  - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                  <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다
                </div>
              </div>
              <div
                className={`${styleCouponDetail.TabContent} ${styleCouponDetail.TabContentOn}`}
              >
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

            <div
              className={`${styleCouponDetail.CouponDetailBottomWrap} ${styleCommon.bottomFixed}`}
            >
              <div className={`${styleCouponDetail.nowViewWrap}`}>
                <span>10,000명</span>이 기분 전환 중 <span>🎵</span>
              </div>
              <div
                className={`${styleCommon.container} ${styleCommon.flexWrap}`}
              >
                <p className={`${styleCommon.floatLeft}`}>
                  <button
                    className={`${styleCommon.btnIcon} ${styleCommon.btnWish} ${styleCommon.active} ${styleCouponDetail.btnWish}`}
                  >
                    좋아요
                  </button>
                  <button
                    className={`${styleCommon.btnIcon} ${styleCommon.btnShare} ${styleCouponDetail.btnShare}`}
                  >
                    공유하기
                  </button>
                </p>
                <p
                  className={`${styleCommon.marginLeft} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
                >
                  <button class="btnIcon btnGift">선물하기</button>
                  <span className={`${styleCommon.bar}`}></span>
                  <button class="btnIcon btnGiftMe">나에게 선물하기</button>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`${styleCouponDetail.CouponDetailWrap}`}>
            <div
              className={`${styleCouponDetail.hideWrap} ${styleCouponDetail.show}`}
            >
              <div className={`${styleCommon.container}`}>
                <div className={`${styleCouponDetail.CouponDetaiSmalllWrap}`}>
                  <div className={styleCouponDetail.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponDetail.infoBox}>
                    <p className={styleCouponDetail.infoBrand}>스타벅스</p>
                    <p className={styleCouponDetail.infoProduct}>
                      시원하게 함께 세트
                    </p>
                    <p className={styleCouponDetail.infoDcPrice}>9,000원</p>
                    <p className={styleCouponDetail.infoPrice}>
                      <span>25%</span> <strong>6,300원</strong>
                    </p>
                  </div>
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
            <div>
              <div className={`${styleSlick.card} ${styleCouponDetail.card}`}>
                <div
                  className={`${styleSlick.imgBox} ${styleCouponDetail.imgBox}`}
                >
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
              </div>
            </div>
            <div className={`${styleCommon.container}`}>
              <div
                className={`${styleSlick.infoBox} ${styleCouponDetail.infoBox}`}
              >
                <h2 className={styleSlick.infoLabel}>0원 구매 찬스!</h2>
                <p className={styleCouponDetail.infoBrand}>스타벅스</p>
                <p className={styleCouponDetail.infoProduct}>
                  시원하게 함께 세트
                </p>
                <div className={styleCouponDetail.priceType1}>
                  <p className={styleCouponDetail.infoPriceLabel}>
                    010PAY 회원가
                  </p>
                  <div>
                    <span className={styleCouponDetail.infoPrice}>
                      <span>25%</span> <strong>6,300원</strong>
                    </span>
                    <span className={styleCouponDetail.infoDcPrice}>
                      9,000원
                    </span>
                  </div>
                </div>
                {/* 추가할인 */}
                {/* <div className={styleCouponDetail.priceType2}>
                  <p className={styleCouponDetail.infoPriceLabel}>
                    010PAY 회원가
                  </p>
                  <div>
                    <span className={styleCouponDetail.infoDcPrice}>
                      9,000원
                    </span>
                    <span className={styleCouponDetail.infoPrice}>
                      <span>30%</span> <strong>6,300원</strong>
                    </span>
                    <span className={styleCouponDetail.infoPrice}>
                      <span>+추가 10%</span> <strong>5,670원</strong>
                    </span>
                  </div>
                </div> */}
                {/* //추가할인 */}
                <div className={styleCouponDetail.labelBox}>
                  <p
                    className={`${styleSlick.infoBottomText} ${styleCouponDetail.labelBoxContent}`}
                  >
                    <i
                      className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCouponDetail.icon} ${styleCommon.iconTimerColor}`}
                    ></i>
                    <strong>3일 04 : 19 : 40</strong> 후 마감
                  </p>
                  <p
                    className={`${styleSlick.infoBottomText} ${styleCouponDetail.labelBoxContent}`}
                  >
                    <i
                      className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCouponDetail.icon} ${styleCommon.iconProductColor}`}
                    ></i>
                    남은 수량 <strong>11개</strong>
                  </p>
                  <p
                    className={`${styleSlick.infoBottomText} ${styleCouponDetail.labelBoxContent}`}
                  >
                    <i
                      className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCouponDetail.icon} ${styleCommon.iconSaveColor}`}
                    ></i>
                    사용 시 <strong>10원 적립</strong>
                  </p>
                  <p
                    className={`${styleSlick.infoBottomText} ${styleCouponDetail.labelBoxContent}`}
                  >
                    <i
                      className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCouponDetail.icon} ${styleCommon.iconDcColor}`}
                    ></i>
                    25% <strong>+ 추가할인 25%</strong>
                  </p>
                </div>
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

            <div
              className={`${styleCouponDetail.CouponDetailBottomWrap} ${styleCommon.bottomFixed}`}
            >
              <div className={`${styleCouponDetail.nowViewWrap}`}>
                <span>10,000명</span>이 기분 전환 중 <span>🎵</span>
              </div>
              <div
                className={`${styleCommon.container} ${styleCommon.flexWrap}`}
              >
                <p className={`${styleCommon.floatLeft}`}>
                  <button
                    className={`${styleCommon.btnIcon} ${styleCommon.btnWish} ${styleCouponDetail.btnWish}`}
                  >
                    좋아요
                  </button>
                  <button
                    className={`${styleCommon.btnIcon} ${styleCommon.btnShare} ${styleCouponDetail.btnShare}`}
                  >
                    공유하기
                  </button>
                </p>
                <p
                  className={`${styleCommon.marginLeft} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
                >
                  <button className={`${styleCommon.btnGift}`}>선물하기</button>
                  <span className={`${styleCommon.bar}`}></span>
                  <button className={`${styleCommon.btnGiftMe}`}>
                    선물하기
                  </button>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
