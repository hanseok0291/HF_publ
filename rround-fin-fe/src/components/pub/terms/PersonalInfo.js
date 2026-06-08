'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styleTerms from '@/styles/terms.module.css';
import TermsVersionSelect from '@/components/pub/terms/TermsVersionSelect';

const PAGE_TITLE = '휴대폰 개인정보 수집·이용';

/** @type {{ id: string; label: string }[]} */
const VERSION_LIST = [{ id: 'default', label: '2024. 04. 03' }];

export default function PersonalInfo() {
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
            <h3>[SKT] 개인정보 수집·이용 동의</h3>
            <h4>제1조 (수집 항목)</h4>
            <p>성명, 생년월일, 휴대폰번호 등 본인확인에 필요한 최소한의 정보를 수집합니다.</p>
            <h4>제2조 (이용 목적)</h4>
            <p>본인확인 서비스 제공 및 관련 문의 응대를 위해 이용합니다.</p>
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
