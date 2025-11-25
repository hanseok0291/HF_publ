import { useFormContext } from "react-hook-form";
import { getAuthorityGroupList } from "@/apis/employee/authorityGroupApis";
import { AuthorityGroupListParam } from "@/app/store/(route)/employee/manage/page";

export const useAuthorityGroupList = () => {
  const { watch } = useFormContext<AuthorityGroupListParam>();
  const { swrResponse } = getAuthorityGroupList(watch());

  return {
    data: swrResponse?.data?.content,
    isLoading: swrResponse.isLoading,
    error: swrResponse.error
  };
};
