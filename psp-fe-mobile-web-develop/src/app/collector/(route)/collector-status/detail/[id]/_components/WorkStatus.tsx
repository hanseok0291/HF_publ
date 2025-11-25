"use client";

import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import { ApiError } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { putCollectorStatus } from "@/apis/collector/collector-status/collectorStatusApis";
import { changeWorkStatusData } from "@/app/constant/collector/MockCustomDrawer.data";
import ModalCustomDrawerContent from "@/components/collector/collector-status/ModalCustomDrawerContent";
import BasicDrawer from "@/components/common/BasicDrawer";
import Modal from "@/components/common/Modal";
import { COLLECT_STATUS, COLLECT_STATUS_ENUM } from "@/enums/WasteSticker.enum";
import { toast } from "@/hooks/use-toast";
import BreadcrumbCollapsed from "./BreadcrumbCollapsed";
import { CollectorDetailParam } from "./CollectorStatusDetailClient";
import ReasonNote from "./ReasonNote";

export type CollectStatusType = z.infer<typeof COLLECT_STATUS_ENUM>;

export default function WorkStatus({
  detailData,
  handleData
}: {
  detailData: WasteCollectorDetailType;
  handleData: (value: CollectStatusType) => void;
}) {
  const [localDetailData, setLocalDetailData] =
    useState<WasteCollectorDetailType>(detailData);
  const [selectedValue, setSelectedValue] = useState<
    CollectStatusType | undefined
  >(detailData.disposeStatus);
  const [isUpdate, setIsUpdate] = useState(false);
  const router = useRouter();
  const { setValue, control } = useFormContext<CollectorDetailParam>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newValue, setNewValue] = useState<string>("");

  useEffect(() => {
    if (detailData.disposeStatus) {
      setSelectedValue(detailData.disposeStatus);
      setValue("disposeStatus", detailData.disposeStatus);
      setLocalDetailData(detailData);
    }
  }, [detailData, setValue]);

  const onUpdate = async (data: CollectStatusType) => {
    setIsUpdate(true);
    try {
      await putCollectorStatus({
        disposeStatus: data,
        wasteCollectionRequestId: detailData.requestId
      });

      handleData(data);
      setValue("disposeStatus", data);
      setSelectedValue(data);
      setLocalDetailData((prev) => ({ ...prev, disposeStatus: data }));

      toast({
        description: `상태가 성공적으로 업데이트되었습니다.`
      });
      return true;
    } catch (error: any) {
      setValue("disposeStatus", detailData.disposeStatus);
      setSelectedValue(detailData.disposeStatus);
      toast({ description: `${(error as ApiError).message}` });
      return false;
    } finally {
      setIsUpdate(false);
    }
  };

  const handleConfirm = async () => {
    if (isUpdate) return;
    const newStatus = newValue as CollectStatusType;
    if (newStatus === selectedValue) return;

    const updateSuccess = await onUpdate(newStatus);
    if (updateSuccess && newStatus === "TKAWY_STAT_008") {
      // 약간의 지연을 주어 상태 안정화
      setTimeout(() => {
        router.push(
          `/collector/collector-status/reason/${detailData.requestId}`
        );
      }, 100);
      return;
    }
  };

  const handleSelect = (value: string) => {
    if (value) {
      setNewValue(value);
      setIsModalOpen?.(true);
    }
  };

  return (
    <form className="px-[20px]">
      <div className="flex items-center justify-between mb-[20px]">
        <h4 className="font-bold">작업상태</h4>
        <Controller
          name="disposeStatus"
          control={control}
          render={({ field: { value } }) => (
            <BasicDrawer
              value={value as string}
              updateTrigger={false}
              showArrow={false}
              title="작업상태 변경"
              drawerTitle="작업상태 변경"
              selectedValue={selectedValue as string}
              onSelect={handleSelect}
              Content={ModalCustomDrawerContent}
              contentProps={{
                data: changeWorkStatusData
              }}
              className="p-[12px_16px] flex-[0_0_100px] rounded bg-white text-[14px] border-[1px] border-solid border-black text-black font-semibold self-start"
            />
          )}
        />
      </div>
      <BreadcrumbCollapsed detailData={localDetailData} />
      {localDetailData.disposeStatus === "TKAWY_STAT_008" && (
        <ReasonNote detailData={localDetailData} />
      )}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        description={`수거 상태를 '${COLLECT_STATUS[selectedValue as keyof typeof COLLECT_STATUS]}'에서\n'${COLLECT_STATUS[newValue as keyof typeof COLLECT_STATUS]}'로 변경하시겠습니까?`}
        onConfirm={handleConfirm}
        cancelButton={{ text: "취소" }}
      />
    </form>
  );
}
