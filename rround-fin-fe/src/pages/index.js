import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-lg font-semibold">rround-fin-fe</h1>
      <p className="mt-2 text-sm text-gray-600">
        약관 목록:{' '}
        <Link className="text-blue-600 underline" href="/pub/terms/list">
          /pub/terms/list
        </Link>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        공지사항 목록:{' '}
        <Link className="text-blue-600 underline" href="/pub/notice/list">
          /pub/notice/list
        </Link>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        약관 상세 (허브):{' '}
        <Link className="text-blue-600 underline" href="/pub/terms/detail">
          /pub/terms/detail
        </Link>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        공지사항 상세 (허브):{' '}
        <Link className="text-blue-600 underline" href="/pub/notice/detail">
          /pub/notice/detail
        </Link>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        공지사항 상세 (샘플):{' '}
        <Link className="text-blue-600 underline" href="/pub/notice/1">
          /pub/notice/1
        </Link>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        공지사항 없음:{' '}
        <Link className="text-blue-600 underline" href="/pub/notice/list-empty">
          /pub/notice/list-empty
        </Link>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        FAQ 목록:{' '}
        <Link className="text-blue-600 underline" href="/pub/faq/list">
          /pub/faq/list
        </Link>
      </p>
    </main>
  );
}
