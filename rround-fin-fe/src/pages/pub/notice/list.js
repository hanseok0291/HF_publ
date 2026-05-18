import Head from 'next/head';
import NoticeList, { NoticeListPlaceholder } from '@/components/pub/notice/NoticeList';

export default function PubNoticeListPage() {
  return (
    <>
      <Head>
        <title>공지사항</title>
      </Head>
      <NoticeList>
        <NoticeListPlaceholder />
      </NoticeList>
    </>
  );
}
