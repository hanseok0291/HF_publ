'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styleTerms from '@/styles/terms.module.css';
import TermsVersionSelect from '@/components/pub/terms/TermsVersionSelect';

const PAGE_TITLE = '휴대폰 인증 개인정보 제공·위탁';

/** @type {{ id: string; label: string }[]} */
const VERSION_LIST = [{ id: 'default', label: '2024. 04. 03' }];

export default function PrivacyProvision() {
  const [fixed, setFixed] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState('default');
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current) return;
      const header = document.querySelector('.terms-pub__fixed-header');
      const headerBottom = header?.getBoundingClientRect().bottom ?? 56;
      const { top } = titleRef.current.getBoundingClientRect();
      setFixed(top <= headerBottom);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full overflow-hidden ${styleTerms.termsScrollPage}`}>
      <div className="min-h-screen px-4 pb-10">
        <header className="terms-pub__fixed-header">
          <div className="terms-pub__fixed-header-inner">
            {fixed ? (
              <span className="terms-pub__fixed-header-title">{PAGE_TITLE}</span>
            ) : null}
            <button
              type="button"
              className="terms-pub__fixed-header-close"
              onClick={() => window.history.back()}
              aria-label="닫기"
            >
              <Image src="/images/common/icon-close.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </header>

        <div className={`${styleTerms.termsPage} py-4`}>
          <div className="terms-pub__header-spacer" aria-hidden="true" />
          <h4 ref={titleRef} className={styleTerms.termsTitle}>
            {PAGE_TITLE}
          </h4>
          <div className="terms-pub terms-legal-html">
            <h3>[SKT] 본인확인서비스 이용을 위한 개인정보제공 동의</h3>
            <h4>SK텔레콤 귀중</h4>
            <p>
              본인은 SK텔레콤㈜(이하 &apos;회사&apos;라 합니다)가 제공하는
              본인확인서비스(이하 &apos;서비스&apos;라 합니다)를 이용하기 위해,
              다음과 같이 본인의 개인정보를 회사가 아래 기재된 제3자에게 제공하는
              것에 동의합니다.
            </p>
            <ol>
              <li>
                1. 개인정보를 제공받는 자
                <p>- NICE신용평가정보㈜, 서울신용평가㈜</p>
              </li>
              <li>
                2. 개인정보를 제공받는 자의 개인정보 이용목적
                <p>- 연계정보(CI)/중복가입확인정보(DI) 생성 및 회사에 제공</p>
              </li>
              <li>
                3. 제공하는 개인정보 항목
                <p>- 회사가 보유하고 있는 이용자의 주민등록번호</p>
              </li>
              <li>
                4. 개인정보를 제공받는 자의 개인정보 보유 및 이용기간
                <p>- 연계정보(CI)/중복가입확인정보(DI) 생성 후 즉시 폐기</p>
              </li>
              <li>
                5. 위 개인정보 제공에 동의하지 않으실 경우, 서비스를 이용할 수
                없습니다.
              </li>
            </ol>
            <h3>[다날] 개인정보 제공, 위탁 동의</h3>
            <p>
              주식회사 다날(이하 &quot;회사&quot;라 합니다)은 정보통신망 이용촉진 및
              정보보호 등에 관한 법률 및 개인정보보호법에 의해 휴대폰 본인 확인
              서비스 이용자(이하 &quot;이용자&quot;라 합니다)로부터 수집한 개인정보를
              아래와 같이 제3자에게 제공, 위탁 합니다.
            </p>
            <div className="mt-4">
              <div className="terms-pub__detail-version">
                <TermsVersionSelect
                  versions={VERSION_LIST}
                  value={selectedVersionId}
                  onChange={setSelectedVersionId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
