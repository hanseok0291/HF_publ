'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styleTerms from '@/styles/terms.module.css';
import TermsVersionSelect from '@/components/pub/terms/TermsVersionSelect';

/** @type {{ id: string; label: string }[]} */
const DEFAULT_VERSION_LIST = [{ id: 'default', label: '2024. 04. 03' }];

/**
 * @param {object} props
 * @param {string} props.title
 * @param {import('react').ReactNode} props.children
 * @param {{ id: string; label: string }[]} [props.versions]
 */
export default function TermsPubLayout({ title, children, versions = DEFAULT_VERSION_LIST }) {
  const [fixed, setFixed] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState(versions[0]?.id ?? 'default');
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
              <span className="terms-pub__fixed-header-title">{title}</span>
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
            {title}
          </h4>
          <div className="terms-pub terms-legal-html">
            {children}
            <div className="terms-pub__detail-version mt-4">
              <TermsVersionSelect
                versions={versions}
                value={selectedVersionId}
                onChange={setSelectedVersionId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
