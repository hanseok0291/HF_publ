import Head from 'next/head';
import path from 'path';
import fs from 'fs/promises';
import TermsDetail from '@/components/pub/terms/TermsDetail';

const CONTENT_FILE = 'phone-identity-verification-terms.html';
const PAGE_TITLE = '휴대폰 본인확인 이용 약관';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src/content/terms', CONTENT_FILE);
  const html = await fs.readFile(filePath, 'utf8');
  return { props: { html } };
}

export default function IdentityVerificationTermsPage({ html }) {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | 라운드 휘슬</title>
      </Head>
      <TermsDetail brandTitle={PAGE_TITLE} html={html} />
    </>
  );
}
