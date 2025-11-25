import ReasonClient from "./_components/ReasonClient";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const requestId = (await params).id;

  return <ReasonClient requestId={requestId} />;
}
