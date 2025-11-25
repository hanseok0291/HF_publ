import { useFormContext } from "react-hook-form";
import { getEmployeeList } from "@/apis/employee/employeeApis";
import { EmployeeListParam } from "@/app/store/(route)/employee/list/page";

export const useEmployeeList = () => {
  const { watch } = useFormContext<EmployeeListParam>();
  const { swrResponse } = getEmployeeList(watch());

  return {
    data: swrResponse?.data?.content,
    isLoading: swrResponse.isLoading,
    error: swrResponse.error
  };
};
