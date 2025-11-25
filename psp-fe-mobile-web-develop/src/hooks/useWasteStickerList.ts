import { useFormContext } from "react-hook-form";
import { getWasteStickerList } from "@/apis/waste-sticker/wasteStickerApis";
import { WasteStickerListParam } from "@/app/store/(route)/waste-sticker/detail/page";

export const useWasteStickerList = () => {
  const { watch } = useFormContext<WasteStickerListParam>();
  const { swrResponse } = getWasteStickerList(watch());

  return {
    data: swrResponse?.data?.content,
    isLoading: swrResponse.isLoading,
    error: swrResponse.error
  };
};
