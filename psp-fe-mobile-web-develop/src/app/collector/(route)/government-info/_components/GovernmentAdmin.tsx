import { Label } from "@/components/ui/label";

type KeyManListType = {
  cellPhoneNumber: string;
  createdDate: string;
  email: string;
  keyManId: string;
  managementOrder: number;
  name: string;
  telePhoneNumber: string;
}[];

export default function GovernmentAdmin({
  keyManList
}: {
  keyManList: KeyManListType;
}) {
  console.log(keyManList);

  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">담당자</Label>

      {keyManList.map((list, index) => {
        return (
          <section
            key={index}
            className="grid gap-[10px] p-[16px] border-[1px] border-solid border-gray40 rounded"
          >
            <div className="flex justify-between text-[12px] items-center">
              <p className=" text-gray80 font-medium">이름</p>
              <span>{list.name ?? "-"}</span>
            </div>
            <div className="flex justify-between text-[12px] items-center">
              <p className=" text-gray80 font-medium">이메일</p>
              <span>{list.email ?? "-"}</span>
            </div>
            <div className="flex justify-between text-[12px] items-center">
              <p className=" text-gray80 font-medium">유선번호</p>
              <span>{list.telePhoneNumber ?? "-"}</span>
            </div>
            <div className="flex justify-between text-[12px] items-center">
              <p className=" text-gray80 font-medium">휴대전화</p>
              <span>{list.cellPhoneNumber ?? "-"}</span>
            </div>
          </section>
        );
      })}
    </div>
  );
}
