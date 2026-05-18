'use client';

import Image from 'next/image';
import styleTerms from '@/styles/terms.module.css';

/**
 * 공지사항 상세 화면 (퍼블) — Figma 공지사항 상세
 * @param {object} props
 * @param {string} [props.navTitle] 상단 네비 제목
 * @param {string} [props.title] 공지 제목
 * @param {string} [props.date] 게시일 (예: 2025.10.30)
 * @param {string} [props.content] 본문 텍스트
 * @param {string} [props.html] 본문 HTML (개발 연동 시)
 * @param {import('react').ReactNode} [props.children] content/html 없을 때 자식 노드 (퍼블 허브)
 */
export default function NoticeDetail({
  navTitle = '공지사항',
  title,
  date,
  content,
  html,
  children,
}) {
  const hasHtml = typeof html === 'string' && html.length > 0;
  const hasContent = typeof content === 'string' && content.length > 0;
  const hasDate = typeof date === 'string' && date.length > 0;
  const showBody = hasHtml || hasContent;

  return (
    <div className={styleTerms.termsPage}>
      <div className="terms-pub terms-pub__shell">
        <header className="terms-pub__top terms-pub__top--sticky">
          <nav className="terms-pub__nav terms-pub__nav--list" aria-label="공지사항 상세">
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

        <main className="terms-pub__notice-detail-main">
          {showBody ? (
            <article className="terms-pub__notice-detail">
              {typeof title === 'string' && title.length > 0 ? (
                <h2 className="terms-pub__notice-detail-title">{title}</h2>
              ) : null}

              {hasDate ? (
                <p className="terms-pub__notice-detail-date">
                  <time dateTime={date.replace(/\./g, '-')}>{date}</time>
                </p>
              ) : null}

              {hasHtml ? (
                <div
                  className="terms-pub__notice-detail-body terms-pub__notice-detail-body--html"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : null}

              {!hasHtml && hasContent ? (
                <p className="terms-pub__notice-detail-body">{content}</p>
              ) : null}
            </article>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
