import Head from 'next/head';
import path from 'path';
import fs from 'fs/promises';
import TermsDetail from '@/components/pub/terms/TermsDetail';
import { buildTermsVersions } from '@/lib/terms/buildTermsVersions';

const CONTENT_FILE = 'phone-unique-identifier-info.html';
const PAGE_TITLE = '휴대폰 인증 고유 식별 정보 처리';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src/content/terms', CONTENT_FILE);
  const html = await fs.readFile(filePath, 'utf8');
  return { props: { html, versions: buildTermsVersions(html) } };
}

export default function UniqueIdentifierInfoPage({ html, versions }) {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE} | 라운드 휘슬</title>
      </Head>
      <TermsDetail brandTitle={PAGE_TITLE} html={html} versions={versions} />
    </>
  );
}
