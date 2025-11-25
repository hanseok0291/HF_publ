import { useFormContext } from "react-hook-form";
import { getJobInquiryList } from "@/apis/collector/contact/contactApis";
import { JobInquiryListParam } from "@/app/collector/(route)/contact/page";

export const useJobInquiryList = () => {
  const { watch } = useFormContext<JobInquiryListParam>();
  const { swrResponse } = getJobInquiryList(watch());

  return {
    data: swrResponse?.data?.content,
    isLoading: swrResponse.isLoading,
    error: swrResponse.error
  };
};
