import Head from 'next/head';
import IdentityTerms from '@/components/pub/terms/IdentityTerms';

export default function IdentityVerificationTermsPage() {
  return (
    <>
      <Head>
        <title>휴대폰 본인확인 이용 약관 | 라운드 휘슬</title>
      </Head>
      <IdentityTerms />
    </>
  );
}
