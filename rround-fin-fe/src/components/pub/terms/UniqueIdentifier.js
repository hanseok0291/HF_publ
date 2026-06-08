'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styleTerms from '@/styles/terms.module.css';
import TermsVersionSelect from '@/components/pub/terms/TermsVersionSelect';

const PAGE_TITLE = '휴대폰 인증 고유 식별 정보 처리';

/** @type {{ id: string; label: string }[]} */
const VERSION_LIST = [{ id: 'default', label: '2024. 04. 03' }];

export default function UniqueIdentifier() {
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
            <h3>고유식별정보 처리 동의</h3>
            <h4>제1조 (처리 동의)</h4>
            <p>주민등록번호 대체 수단 제공을 위해 고유식별정보를 처리합니다.</p>
            <h4>제2조 (제공 동의)</h4>
            <p>연계·중복가입확인을 위해 다른 본인확인기관에 제공할 수 있습니다.</p>
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
