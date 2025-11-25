import MainContainer from "@/components/common/MainContainer";
import EmployeeDetailClient from "./_components/EmployeeDetailClient";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const authorityGroupId = (await params).id;

  return (
    <MainContainer>
      <EmployeeDetailClient authorityGroupId={authorityGroupId} />
    </MainContainer>
  );
}
