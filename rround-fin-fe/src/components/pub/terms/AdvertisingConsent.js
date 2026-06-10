"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styleTerms from "@/styles/terms.module.css";
const PAGE_TITLE = "(선택) 광고성 정보 수신동의";

export default function AdvertisingConsent() {
  const [fixed, setFixed] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;
      const header = document.querySelector(".terms-pub__fixed-header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 56;
      const { top } = titleRef.current.getBoundingClientRect();
      setFixed(top <= headerBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`w-full overflow-hidden ${styleTerms.termsScrollPage}`}>
      <div className="min-h-screen px-4 pb-10">
        <header className="terms-pub__fixed-header">
          <div className="terms-pub__fixed-header-inner">
            {fixed ? (
              <span className="terms-pub__fixed-header-title">
                {PAGE_TITLE}
              </span>
            ) : null}
            <button
              type="button"
              className="terms-pub__fixed-header-close"
              onClick={() => window.history.back()}
              aria-label="닫기"
            >
              <Image
                src="/images/common/icon-close.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </header>

        <div className={`${styleTerms.termsPage} py-4`}>
          <div className="terms-pub__header-spacer" aria-hidden="true" />
          {/* <h4 ref={titleRef} className={styleTerms.termsTitle}>
            {PAGE_TITLE}
          </h4> */}
          <div className="terms-pub terms-legal-html">
            <h3>(선택)광고성 정보 수신동의</h3>
            <p>
              본인(이용자)은 (주)헥토파이낸셜(이하 “회사”라고 합니다)이 본인에게
              전자적 전송매체를 통하여 아래와 같이 광고성 정보를 전송하는 것에
              대해 동의합니다.
            </p>

            <div className="rround-table-scroll">
              <table className="rround-terms-table">
                <tbody>
                  <tr>
                    <th>구분</th>
                    <th>내용</th>
                  </tr>
                  <tr>
                    <td>전송 채널</td>
                    <td>카카오 알림톡, 문자메세지, 앱푸시(App Push)</td>
                  </tr>
                  <tr>
                    <td>전송 내용</td>
                    <td>
                      회사 및 회사의 제휴사 상품·서비스 프로모션, 이벤트, 신규
                      서비스 안내 등 광고성 정보
                    </td>
                  </tr>
                  <tr>
                    <td>전송 주체</td>
                    <td>(주)헥토파이낸셜</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              본 동의는 헥토파이낸셜 서비스의 선택적 기능(회사 및 회사의 제휴사
              상품·서비스 프로모션, 이벤트, 신규 서비스 안내 등) 제공을 위한
              것으로 본인은 동의를 거부할 수 있으며, 동의하지 않더라도 서비스
              이용이 가능합니다. 다만, 동의하지 않을 경우 헥토파이낸셜 서비스의
              선택적 기능(회사 및 제3자의 상품·서비스 프로모션, 이벤트, 신규
              서비스 안내)은 제공 받으실 수 없습니다.
            </p>

            <h4>동의 철회 방법</h4>

            <ol>
              <li>
                • 앱 &gt; 마이 &gt;알림설정 하단의 광고성 정보 수신동의 철회하기
                버튼 클릭
              </li>
              <li>• 전송되는 광고 정보에 별도로 안내되는 수신거부 방법 활용</li>
              <li>• 고객센터 문의(1600-5220)</li>
            </ol>

            <p>
              ※ 광고성 정보 전송에 활용되는 개인정보 수집·이용에 관한 사항은
              [맞춤형 광고 목적의 개인정보 수집·이용 동의]를 참고하시기
              바랍니다.
            </p>

            <br />

            <p>
              공고일자: 2026년 06월 08일
              <br />
              시행일자 : 2026년 06월 08일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
