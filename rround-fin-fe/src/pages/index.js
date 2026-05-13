import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-lg font-semibold">rround-fin-fe</h1>
      <p className="mt-2 text-sm text-gray-600">
        약관 목록:{' '}
        <Link className="text-blue-600 underline" href="/pub/terms/detail">
          /pub/terms/detail
        </Link>
      </p>
    </main>
  );
}
