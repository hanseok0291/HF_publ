import Head from 'next/head';
import Link from 'next/link';
import NoticeDetail from '@/components/pub/notice/NoticeDetail';
import { NOTICE_PLACEHOLDERS } from '@/lib/notice/noticePlaceholders';

/** 퍼블 확인용 — 샘플 공지 목록 허브 */
export default function PubNoticeDetailIndexPage() {
  return (
    <>
      <Head>
        <title>공지사항 상세</title>
      </Head>
      <NoticeDetail>
        <ul className="terms-pub__notice-list">
          {NOTICE_PLACEHOLDERS.map((notice) => (
            <li key={notice.id}>
              <Link href={`/pub/notice/${notice.id}`} className="terms-pub__notice-item">
                <p className="terms-pub__notice-title">{notice.title}</p>
                <p className="terms-pub__notice-date">{notice.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </NoticeDetail>
    </>
  );
}
