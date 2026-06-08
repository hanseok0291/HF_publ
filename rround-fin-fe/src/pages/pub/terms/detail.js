import Head from 'next/head';
import PrivacyProvision from '@/components/pub/terms/PrivacyProvision';
import IdentityTerms from '@/components/pub/terms/IdentityTerms';
import PersonalInfo from '@/components/pub/terms/PersonalInfo';
import UniqueIdentifier from '@/components/pub/terms/UniqueIdentifier';

const PAGE_TITLE = '휴대폰 인증 개인정보 제공·위탁';

export default function PubTermsDetailPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | 라운드 휘슬</title>
      </Head>
      {/* <PrivacyProvision /> */}
      <IdentityTerms />
      {/* <PersonalInfo /> */}
      {/* <UniqueIdentifier /> */}
    </>
  );
}
