'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import styleTerms from '@/styles/terms.module.css';
import TermsVersionSelect from '@/components/pub/terms/TermsVersionSelect';

/** @typedef {{ id: string; label: string; html: string }} TermsVersion */

/**
 * @param {object} props
 * @param {string} [props.brandTitle] 상단 제목
 * @param {string} [props.html] 약관 본문 HTML (단일 버전)
 * @param {TermsVersion[]} [props.versions] 시행일별 약관 (있으면 하단 드롭다운)
 * @param {import('react').ReactNode} [props.children] html 없을 때 자식 노드
 */
export default function TermsDetail({ brandTitle = '라운드 휘슬 약관 및 개인정보 처리', html, versions, children }) {
  const titleRef = useRef(null);

  const versionList = useMemo(() => {
    if (versions?.length) {
      return versions;
    }
    if (typeof html === 'string' && html.length > 0) {
      return [{ id: 'default', label: '2024. 04. 03', html }];
    }
    return [];
  }, [versions, html]);

  const [selectedVersionId, setSelectedVersionId] = useState(
    () => versionList[0]?.id ?? '',
  );

  const selectedVersion =
    versionList.find((version) => version.id === selectedVersionId) ?? versionList[0];

  const displayHtml = selectedVersion?.html;
  const hasHtml = typeof displayHtml === 'string' && displayHtml.length > 0;
  const showVersionSelect = versionList.length > 0;

  return (
    <div className={`${styleTerms.detailPage} terms-pub__detail-page`}>
      <header className="terms-pub__detail-header">
        <div className="terms-pub__detail-header-inner">
          <button
            type="button"
            className="terms-pub__detail-close"
            onClick={() => window.history.back()}
            aria-label="닫기"
          >
            <Image src="/images/common/icon-close.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </header>

      <div className={`${styleTerms.termsPage} terms-pub__detail-body`}>
        <div className="terms-pub terms-legal-html">
          <div className="terms-pub__detail-content">
            <h4 ref={titleRef} className={styleTerms.termsTitle}>
              {brandTitle}
            </h4>
            {hasHtml ? (
              <div className="terms-pub__detail-html" dangerouslySetInnerHTML={{ __html: displayHtml }} />
            ) : (
              children
            )}
          </div>

          {showVersionSelect ? (
            <div className="terms-pub__detail-version">
              <TermsVersionSelect
                versions={versionList}
                value={selectedVersion?.id ?? ''}
                onChange={setSelectedVersionId}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
