"use client";

import { ExtractParam } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { putInstitutionArea } from "@/apis/collector/area/areaApi";
import Input from "@/components/common/Input";
import MainContainer from "@/components/common/MainContainer";
import CloseHeader from "@/components/header/CloseHeader";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RenderChangeModal from "./RenderChangeModal";

export type EditAreaInfoParams = ExtractParam<typeof putInstitutionArea>;
export default function AreaDetailPage({
  selectedItem,
  setIsDetail,
  memoValue
}: any) {
  const router = useRouter();
  const [textareaClicked, setTextareaClicked] = useState(false);
  const form = useForm<EditAreaInfoParams>({
    mode: "onSubmit"
  });
  const { control, setValue, handleSubmit } = form;

  const onSubmit = (data: EditAreaInfoParams) => {
    console.log(data);
  };

  useEffect(() => {
    if (selectedItem?.memo !== undefined) {
      setValue("memo", selectedItem.memo);
    }
  }, [selectedItem, setValue]);

  return (
    <FormProvider {...form}>
      <MainContainer>
        <CloseHeader title="지역정보 상세" onClose={setIsDetail} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-[20px]">
          <div className="flex flex-col gap-[12px]">
            <Label className="text-[16px] font-bold">지번주소</Label>
            <Input
              readOnly
              value={`${selectedItem?.sdNm || ""} ${selectedItem?.sggNm || ""} ${selectedItem?.legalEmdNm || ""} ${selectedItem?.jibunMainNo || ""}${selectedItem?.jibunSubNo > 0 ? -selectedItem?.jibunSubNo : ""}`}
              className="read-only:bg-gray20 h-[40px]"
            />

            <Label className="text-[16px] font-bold">도로명 주소</Label>
            <Input
              readOnly
              value={`${selectedItem?.sdNm || ""} ${selectedItem?.sggNm || ""} ${selectedItem?.legalEmdNm || ""} ${selectedItem?.roadNm || ""}`}
              className="read-only:bg-gray20 h-[40px]"
            />

            <Label className="text-[16px] font-bold">건물명</Label>
            <Input
              readOnly
              value={selectedItem?.sggBuldNm || "-"}
              className="read-only:bg-gray20 h-[40px]"
            />
            <Label className="font-bold text-[16px]">메모</Label>
            <Controller
              control={control}
              name="memo"
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  maxLength={80}
                  className="rounded p-[16px_12px] min-h-[209px]"
                  onClick={() => setTextareaClicked(true)}
                />
              )}
            />
          </div>
          <RenderChangeModal
            item={selectedItem}
            onClose={setIsDetail}
            textareaClicked={textareaClicked}
            setTextareaClicked={setTextareaClicked}
          />
        </form>
      </MainContainer>
    </FormProvider>
  );
}
