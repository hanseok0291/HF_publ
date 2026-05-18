import Head from 'next/head';
import NoticeList, { NoticeListEmpty } from '@/components/pub/notice/NoticeList';

export default function PubNoticeListEmptyPage() {
  return (
    <>
      <Head>
        <title>공지사항</title>
      </Head>
      <NoticeList>
        <NoticeListEmpty />
      </NoticeList>
    </>
  );
}
