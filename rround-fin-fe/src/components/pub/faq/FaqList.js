'use client';

import { useState } from 'react';
import Image from 'next/image';
import styleTerms from '@/styles/terms.module.css';
import FaqAccordionList from '@/components/pub/faq/FaqAccordionList';

/** @typedef {'all' | 'account' | 'pay'} FaqTabId */

const FAQ_TABS = [
  { id: 'all', label: '전체' },
  { id: 'account', label: '계정' },
  { id: 'pay', label: '라운드페이' },
];

/**
 * FAQ 화면 (퍼블) — 상단 네비 + 탭 스티키
 * @param {object} props
 * @param {string} [props.navTitle] 상단 네비 제목
 */
export default function FaqList({ navTitle = 'FAQ' }) {
  /** @type {[FaqTabId, import('react').Dispatch<import('react').SetStateAction<FaqTabId>>]} */
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className={styleTerms.termsPage}>
      <div className="terms-pub terms-pub__shell terms-pub__shell--faq">
        <div className="terms-pub__faq-sticky">
          <header className="terms-pub__top">
            <nav className="terms-pub__nav terms-pub__nav--list" aria-label="FAQ">
              <button
                type="button"
                className="terms-pub__nav-back"
                onClick={() => window.history.back()}
                aria-label="뒤로가기"
              >
                <Image
                  src="/images/common/icon-chevron-left.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
              <h1 className="terms-pub__nav-title">{navTitle}</h1>
            </nav>
          </header>

          <div className="terms-pub__faq-tabs" role="tablist" aria-label="FAQ 카테고리">
            {FAQ_TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`terms-pub__faq-tab${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveTab(/** @type {FaqTabId} */ (tab.id))}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <main className="terms-pub__faq-main">
          <FaqAccordionList activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}
