import Head from 'next/head';
import FaqList from '@/components/pub/faq/FaqList';

export default function PubFaqListPage() {
  return (
    <>
      <Head>
        <title>FAQ</title>
      </Head>
      <FaqList />
    </>
  );
}
