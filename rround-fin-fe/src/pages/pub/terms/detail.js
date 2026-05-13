import Head from 'next/head';
import Link from 'next/link';
import TermsDetail from '@/components/pub/terms/TermsDetail';

const LINKS = [
  { href: '/pub/terms/personal-info-collection', label: '휴대폰 개인정보 수집·이용' },
  { href: '/pub/terms/identity-verification-terms', label: '휴대폰 본인확인 이용 약관' },
  { href: '/pub/terms/privacy-provision-entrustment', label: '휴대폰 인증 개인정보 제공·위탁' },
  { href: '/pub/terms/unique-identifier-info', label: '휴대폰 인증 고유 식별 정보 처리' },
];

export default function PubTermsIndexPage() {
  return (
    <>
      <Head>
        <title>약관 목록 | 라운드 휘슬</title>
      </Head>
      <TermsDetail brandTitle="휴대폰 본인확인 약관">
        <ul className="space-y-3">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </TermsDetail>
    </>
  );
}
