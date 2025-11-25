import MainContainer from "@/components/common/MainContainer";
import ArrowHeader from "@/components/header/ArrowHeader";
import ProfileFormClient from "./_components/ProfileFormClient";

export default function Page() {
  return (
    <MainContainer>
      <ArrowHeader headerTitle="내 정보 확인 및 수정" />
      <ProfileFormClient />
    </MainContainer>
  );
}
