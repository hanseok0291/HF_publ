import Head from 'next/head';
import TermsList, { TermsListPlaceholder } from '@/components/pub/terms/TermsList';

export default function PubTermsListPage() {
  return (
    <>
      <Head>
        <title>약관 및 정책</title>
      </Head>
      <TermsList>
        <TermsListPlaceholder />
      </TermsList>
    </>
  );
}
