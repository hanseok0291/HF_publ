import Head from 'next/head';
import PrivacyProvision from '@/components/pub/terms/PrivacyProvision';
import IdentityTerms from '@/components/pub/terms/IdentityTerms';
import PersonalInfo from '@/components/pub/terms/PersonalInfo';
import UniqueIdentifier from '@/components/pub/terms/UniqueIdentifier';
import AdvertisingConsent from '@/components/pub/terms/AdvertisingConsent';
import PersonalizedAdConsent from '@/components/pub/terms/PersonalizedAdConsent';
import ServiceTerms from '@/components/pub/terms/ServiceTerms';

const PAGE_TITLE = '헥토파이낸셜 서비스 이용약관';

export default function PubTermsDetailPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | 라운드 휘슬</title>
      </Head>
      {/* <PrivacyProvision /> */}
      {/* <IdentityTerms /> */}
      {/* <PersonalInfo /> */}
      {/* <UniqueIdentifier /> */}
      {/* <AdvertisingConsent /> */}
      {/* <PersonalizedAdConsent /> */}
      <ServiceTerms />
    </>
  );
}
