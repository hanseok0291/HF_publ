import { useRef } from 'react';
import Image from 'next/image';
import styleTerms from '@/styles/terms.module.css';

/**
 * @param {object} props
 * @param {string} [props.brandTitle] 상단 제목 (기본: 라운드 휘슬 약관)
 * @param {string} [props.html] 약관 본문 HTML (있으면 dangerouslySetInnerHTML)
 * @param {import('react').ReactNode} [props.children] html 없을 때 자식 노드
 */
export default function TermsDetail({ brandTitle = '라운드 휘슬 약관 및 개인정보 처리', html, children }) {
  const titleRef = useRef(null);
  const hasHtml = typeof html === 'string' && html.length > 0;

  return (
    <div className="min-h-screen w-full overflow-hidden px-4 pb-10">
      <header className="fixed left-0 top-0 flex h-[56px] w-full items-center justify-center bg-white">
        <button
          type="button"
          className="absolute right-4 top-auto"
          onClick={() => window.history.back()}
          aria-label="닫기"
        >
          <Image
            src="/images/common/icon-close.svg"
            alt="닫기"
            width={24}
            height={24}
          />
        </button>
      </header>

      <div className={`${styleTerms.termsPage} py-4`}>
        <div className="h-[56px]" aria-hidden />
        <div className="terms-pub terms-legal-html">
          <h4 ref={titleRef} className={styleTerms.termsTitle}>
            {brandTitle}
          </h4>
          {hasHtml ? <div dangerouslySetInnerHTML={{ __html: html }} /> : children}
        </div>
      </div>
    </div>
  );
}
