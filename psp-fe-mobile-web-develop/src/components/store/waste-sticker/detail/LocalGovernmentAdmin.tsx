import DetailListContainer from "./DetailListContainer";

type LocalGovernmentAdminResponseType = {
  adminInfo: {
    name: string;
    cellPhoneNumber: string;
    telePhoneNumber: string;
    email: string;
  };
};
export default function LocalGovernmentAdmin({
  adminInfo: { name, cellPhoneNumber, email, telePhoneNumber }
}: LocalGovernmentAdminResponseType) {
  return (
    <DetailListContainer>
      <p className="text-[16px] font-bold">지자체 담당자 정보</p>
      <div>
        <span className="text-[12px] text-gray80">이름</span>
        <p className="text-[14px] font-normal">{name}</p>
      </div>
      <div>
        <span className="text-[12px] text-gray80">내선번호</span>
        <p className="text-[14px] font-normal">{telePhoneNumber}</p>
      </div>
      <div>
        <span className="text-[12px] text-gray80">휴대전화</span>
        <p className="text-[14px] font-normal">{cellPhoneNumber}</p>
      </div>
      <div>
        <span className="text-[12px] text-gray80">이메일</span>
        <p className="text-[14px] font-normal">{email}</p>
      </div>
    </DetailListContainer>
  );
}
