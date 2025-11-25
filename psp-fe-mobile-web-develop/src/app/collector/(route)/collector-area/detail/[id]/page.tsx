"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShallow } from "zustand/react/shallow";
import Input from "@/components/common/Input";
import MainContainer from "@/components/common/MainContainer";
import CloseHeader from "@/components/header/CloseHeader";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CollectorAreaFormType,
  CollectorAreaSchema
} from "@/schema/collector/CollectorArea.schema";
import useResultDetailAddress from "@/stores/useResultDetailAddress";
import RenderChangeModal from "./_components/RenderChangeModal";

export default function Page() {
  const router = useRouter();
  const form = useForm<CollectorAreaFormType>({
    mode: "onSubmit",
    resolver: zodResolver(CollectorAreaSchema)
  });
  const { control, watch, handleSubmit } = form;
  const textareaValue = watch("content");
  const { bdName, jibunAddress, reset } = useResultDetailAddress(
    useShallow((state) => ({
      bdName: state.bdName,
      jibunAddress: state.jibunAddress,

      reset: state.reset
    }))
  );
  // const debouncedSearchKeyword = useDebounce(search, 500);

  const handleClose = () => {
    router.push("/collector/collector-area");
  };

  const onSubmit = (data: CollectorAreaFormType) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <MainContainer>
        <CloseHeader title=" " onClose={() => handleClose()} />
        <form onSubmit={handleSubmit(onSubmit)} className="px-[20px]">
          <div className="flex flex-col gap-[12px]">
            <Label className="text-[16px] font-bold">지번주소</Label>
            <Input
              readOnly
              value={bdName}
              className="read-only:bg-gray20 h-[40px]"
            />
            <Label className="text-[16px] font-bold">도로명 주소</Label>
            <Input
              readOnly
              value={bdName}
              className="read-only:bg-gray20 h-[40px]"
            />
            <Label className="text-[16px] font-bold">건물명</Label>
            <Input
              readOnly
              value={jibunAddress || "-"}
              className="read-only:bg-gray20 h-[40px]"
            />
            <Label className="font-bold text-[16px]">메모</Label>
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  maxLength={80}
                  className="rounded p-[16px_12px] min-h-[209px]"
                />
              )}
            />
          </div>
          <RenderChangeModal />
        </form>
      </MainContainer>
    </FormProvider>
  );
}
