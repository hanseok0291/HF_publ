import TrashBagDetailClient from "../_components/TrashBagDetailClient";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const stickerId = (await params).id;

  return <TrashBagDetailClient stickerId={stickerId} />;
}
