import WasteStickerDetailClient from "./WasteStickerDetailClient";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const stickerId = (await params).id;

  return <WasteStickerDetailClient stickerId={stickerId} />;
}
