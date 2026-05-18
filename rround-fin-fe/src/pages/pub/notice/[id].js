import Head from 'next/head';
import NoticeDetail from '@/components/pub/notice/NoticeDetail';
import { getNoticeById, NOTICE_PLACEHOLDERS } from '@/lib/notice/noticePlaceholders';

export async function getStaticPaths() {
  return {
    paths: NOTICE_PLACEHOLDERS.map((notice) => ({ params: { id: notice.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const notice = getNoticeById(params.id);

  if (!notice) {
    return { notFound: true };
  }

  return { props: { notice } };
}

export default function PubNoticeDetailPage({ notice }) {
  return (
    <>
      <Head>
        <title>{notice.title} | 공지사항</title>
      </Head>
      <NoticeDetail title={notice.title} date={notice.date} content={notice.content} />
    </>
  );
}
