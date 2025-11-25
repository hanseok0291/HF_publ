import MainContainer from "@/components/common/MainContainer";
import DetailFormClient from "./_components/DetailFormClient";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const keyManId = (await params).id;

  return (
    <MainContainer>
      <DetailFormClient keyManId={keyManId} />
    </MainContainer>
  );
}
