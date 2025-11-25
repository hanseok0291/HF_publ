import { EmployeeListType } from "@/types/store/employee/EmployeeList.type";

export default function EmployeeData({ content }: EmployeeListType) {
  return (
    <div className="grid gap-[10px]">
      {content?.map((item) => {
        return (
          <div className="flex justify-between items-center" key={item.id}>
            <p className="text-gray80 text-[12px] font-medium">{item.title}</p>
            <p className="text-black text-[12px] font-normal">{item.content}</p>
          </div>
        );
      })}
    </div>
  );
}
