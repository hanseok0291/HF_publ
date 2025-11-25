import { EmployeeListType } from "@/types/store/employee/EmployeeList.type";

export default function EmployeeName({
  title,
  subTitle,
  listNum
}: EmployeeListType) {
  return (
    <div className="flex items-center font-normal min-w-0">
      {subTitle ? (
        <>
          <p className="text-[14px] font-semibold shrink-0">{title}</p>
          <span className="text-gray80 text-[12px] truncate min-w-0 ml-1">
            {subTitle && `(${subTitle})`}
          </span>
        </>
      ) : (
        <p className="text-[14px] font-semibold truncate min-w-0">{title}</p>
      )}
    </div>
  );
}
