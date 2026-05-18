import Image from 'next/image';
import Link from 'next/link';
import styleTerms from '@/styles/terms.module.css';

/**
 * 공지사항 목록 화면 (퍼블)
 * @param {object} props
 * @param {string} [props.navTitle] 상단 네비 제목
 * @param {import('react').ReactNode} [props.children] 목록 영역 (개발 연동 시 교체)
 */
export default function NoticeList({ navTitle = '공지사항', children }) {
  return (
    <div className={styleTerms.termsPage}>
      <div className="terms-pub terms-pub__shell">
        <header className="terms-pub__top">
          <nav className="terms-pub__nav terms-pub__nav--list" aria-label="공지사항 목록">
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

        <main className="terms-pub__notice-main">{children}</main>
      </div>
    </div>
  );
}

/** 공지 없음 빈 화면 (Figma empty_case) */
export function NoticeListEmpty() {
  return (
    <section className="terms-pub__notice-empty" aria-live="polite">
      <Image
        className="terms-pub__notice-empty-icon"
        src="/images/common/icon-exclamationmark-fill.svg"
        alt=""
        width={72}
        height={72}
      />
      <p className="terms-pub__notice-empty-text">등록된 공지사항이 없어요</p>
    </section>
  );
}

/** 퍼블 확인용 플레이스홀더 — 개발 시 children으로 교체 */
export function NoticeListPlaceholder() {
  return (
    <ul className="terms-pub__notice-list">
      <li>
        <Link href="/pub/notice/1" className="terms-pub__notice-item">
          <p className="terms-pub__notice-title">
            공지 제목 영역은 최대 45자까지 말줄임 없이 전체 노출합니다
          </p>
          <p className="terms-pub__notice-date">2025.10.30</p>
        </Link>
      </li>
      <li>
        <Link href="/pub/notice/2" className="terms-pub__notice-item">
          <p className="terms-pub__notice-title">
            해외송금 서비스 오픈 서비스 오픈 이벤트 수수료 0원
          </p>
          <p className="terms-pub__notice-date">2025.10.30</p>
        </Link>
      </li>
      <li>
        <Link href="/pub/notice/3" className="terms-pub__notice-item">
          <p className="terms-pub__notice-title">헥토파이낸셜 앱 오픈!</p>
          <p className="terms-pub__notice-date">2025.10.30</p>
        </Link>
      </li>
    </ul>
  );
}
