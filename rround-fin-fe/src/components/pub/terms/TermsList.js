import Image from 'next/image';
import Link from 'next/link';
import styleTerms from '@/styles/terms.module.css';

/**
 * 약관 목록 화면 (퍼블)
 * @param {object} props
 * @param {string} [props.navTitle] 상단 네비 제목
 * @param {import('react').ReactNode} [props.children] 목록 영역 (개발 연동 시 교체)
 */
export default function TermsList({ navTitle = '약관 및 정책', children }) {
  return (
    <div className={styleTerms.termsPage}>
      <div className="terms-pub terms-pub__shell">
        <header className="terms-pub__top">
          <nav className="terms-pub__nav terms-pub__nav--list" aria-label="약관 목록">
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

        <main className="terms-pub__list-main">{children}</main>
      </div>
    </div>
  );
}

/** 퍼블 확인용 플레이스홀더 — 개발 시 children으로 교체 */
export function TermsListPlaceholder() {
  return (
    <>
      <ul className="terms-pub__list">
        <li>
          <Link href="#" className="terms-pub__list-item">
            <span className="terms-pub__list-label">서비스 이용 약관</span>
            <Image
              src="/images/common/icon-chevron-right-muted.svg"
              alt=""
              width={16}
              height={16}
              className="terms-pub__list-chevron"
            />
          </Link>
        </li>
        <li>
          <Link href="#" className="terms-pub__list-item">
            <span className="terms-pub__list-label">전자금융거래 이용 약관</span>
            <Image
              src="/images/common/icon-chevron-right-muted.svg"
              alt=""
              width={16}
              height={16}
              className="terms-pub__list-chevron"
            />
          </Link>
        </li>
      </ul>

      <div className="terms-pub__list-divider" role="presentation" />

      <ul className="terms-pub__list">
        <li>
          <Link href="#" className="terms-pub__list-item">
            <span className="terms-pub__list-label">개인정보 처리방침</span>
            <Image
              src="/images/common/icon-chevron-right-muted.svg"
              alt=""
              width={16}
              height={16}
              className="terms-pub__list-chevron"
            />
          </Link>
        </li>
      </ul>
    </>
  );
}
