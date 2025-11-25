import AuthorityItem from "@/components/store/employee/manage/AuthorityItem";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { useAuthorityGroupList } from "@/hooks/useAuthorityGroup";

export default function EmployeeDetailContainer() {
  const {
    data: authorityData,
    error: authorityError,
    isLoading: authorityLoading
  } = useAuthorityGroupList();

  const showToast = (message: string) => {
    toast({
      title: message,
      action: <ToastAction altText="닫기">닫기</ToastAction>
    });
  };

  // 에러 상태 처리
  if (authorityError) {
    showToast("오류가 발생했습니다.");
    return null;
  }

  return authorityData.content.map((item) => (
    <AuthorityItem key={item.authorityGroupName} item={item} />
  ));
}
