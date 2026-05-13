import Head from 'next/head';
import path from 'path';
import fs from 'fs/promises';
import TermsDetail from '@/components/pub/terms/TermsDetail';

const CONTENT_FILE = 'phone-personal-info-collection-use.html';
const PAGE_TITLE = '휴대폰 개인정보 수집·이용';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src/content/terms', CONTENT_FILE);
  const html = await fs.readFile(filePath, 'utf8');
  return { props: { html } };
}

export default function PersonalInfoCollectionPage({ html }) {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | 라운드 휘슬</title>
      </Head>
      <TermsDetail brandTitle={PAGE_TITLE} html={html} />
    </>
  );
}
