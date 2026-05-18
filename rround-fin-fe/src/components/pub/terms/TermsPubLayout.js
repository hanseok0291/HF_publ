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
              {title}
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
