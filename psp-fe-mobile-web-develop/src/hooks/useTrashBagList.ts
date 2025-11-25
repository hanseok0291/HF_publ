import { useFormContext } from "react-hook-form";
import { getTrashBagList } from "@/apis/trash-bag/trashBagApis";
import { TrashBagListParam } from "@/app/store/(route)/trash-bag/detail/page";

export const useTrashBagList = () => {
  const { watch } = useFormContext<TrashBagListParam>();
  const { swrResponse } = getTrashBagList(watch());

  return {
    data: swrResponse?.data?.content,
    isLoading: swrResponse.isLoading,
    error: swrResponse.error
  };
};
