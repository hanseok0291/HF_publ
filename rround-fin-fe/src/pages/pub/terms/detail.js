import Head from 'next/head';
import TermsDetail from '@/components/pub/terms/TermsDetail';
import IdentityTerms from '@/components/pub/terms/IdentityTerms';
import PersonalInfo from '@/components/pub/terms/PersonalInfo';
import PrivacyProvision from '@/components/pub/terms/PrivacyProvision';
import UniqueIdentifier from '@/components/pub/terms/UniqueIdentifier';

export default function PubTermsIndexPage() {
  return (
    <>
      <Head>
        <title>약관 목록 | 라운드 휘슬</title>
      </Head>
      {/* <TermsDetail /> */}
      {/* <IdentityTerms /> */}
      <PersonalInfo />
      {/* <PrivacyProvision /> */}
      {/* <UniqueIdentifier /> */}
    </>
  );
}
