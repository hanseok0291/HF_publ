import CollectorStatusDetailClient from "./_components/CollectorStatusDetailClient";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const requestId = (await params).id;

  return <CollectorStatusDetailClient requestId={requestId} />;
}
