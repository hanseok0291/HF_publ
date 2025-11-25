"use client";

import { GetLocalGovermentType } from "@/types/apiType/collector/government-info/GovernmentInfo.type";
import { useEffect, useState } from "react";
import { getLocalGoverment } from "@/apis/collector/government-info/governmentInfoApis";
import MainContainer from "@/components/common/MainContainer";
import ArrowHeader from "@/components/header/ArrowHeader";
import CompanyNumber from "./_components/CompanyNumber";
import GovernmentAddress from "./_components/GovernmentAddress";
import GovernmentAdmin from "./_components/GovernmentAdmin";
import GovernmentConnection from "./_components/GovernmentConnection";
import OnerName from "./_components/OnerName";
import OnerNumber from "./_components/OnerNumber";

export default function Page() {
  const [result, setResult] = useState<GetLocalGovermentType>();
  const [localAddress, setLocalAddress] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getLocalGoverment();
      console.log(response.content);
      setResult(response.content);
      const address = `${response.content.sdNm} ${response.content.sggNm}`;
      setLocalAddress(address);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <MainContainer>
      <ArrowHeader headerTitle="소속 지자체 정보" />
      <section className="flex flex-col gap-[32px] pt-[20px] px-[20px] pb-[40px]">
        <GovernmentConnection
          localGovernmentName={localAddress ?? "-"}
          imageFileList={result?.imageFileList ?? []}
        />
        <GovernmentAddress
          zipCode={result?.zipCode ?? "-"}
          address={result?.address ?? "-"}
          detailAddress={result?.detailAddress ?? "-"}
        />
        <CompanyNumber
          businessRegisterationNumber={
            result?.businessRegisterationNumber ?? "-"
          }
        />
        <OnerName representativeName={result?.representativeName ?? "-"} />
        <OnerNumber
          representationNumber={result?.representationNumber ?? "-"}
        />
        <GovernmentAdmin keyManList={result?.keyManList ?? []} />
      </section>
    </MainContainer>
  );
}
