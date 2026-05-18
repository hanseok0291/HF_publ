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
      const { top } = titleRef.current.getBoundingClientRect();
      setFixed(top <= 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="min-h-screen px-4 pb-10">
        <header className="fixed left-0 top-0 z-10 flex h-[56px] w-full items-center justify-center bg-white">
          {fixed ? (
            <span className="max-w-[calc(100%-96px)] truncate text-base font-semibold text-[#151515]">
              {PAGE_TITLE}
            </span>
          ) : null}
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 border-0 bg-transparent p-0"
            onClick={() => window.history.back()}
            aria-label="닫기"
          >
            <Image src="/images/common/icon-close.svg" alt="" width={24} height={24} />
          </button>
        </header>

        <div className={`${styleTerms.termsPage} py-4`}>
          <div className="h-[56px]" aria-hidden="true" />
          <h4 ref={titleRef} className={styleTerms.termsTitle}>
            {PAGE_TITLE}
          </h4>
          <div className="terms-pub terms-legal-html">
            <h3>[SKT] 개인정보 제공·위탁 동의</h3>
            <h4>제1조 (제3자 제공)</h4>
            <p>본인확인 결과 확인을 위해 필요한 범위 내에서 정보를 제공할 수 있습니다.</p>
            <h4>제2조 (처리 위탁)</h4>
            <p>서비스 운영을 위해 개인정보 처리 업무를 위탁할 수 있습니다.</p>
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
