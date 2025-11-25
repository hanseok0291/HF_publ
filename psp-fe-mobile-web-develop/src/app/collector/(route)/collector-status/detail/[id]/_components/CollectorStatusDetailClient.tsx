"use client";

import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import { CollectorStatusColumnsType } from "@/types/collector/collector-status/CollectorStatus.type";
import { ExtractParam } from "@/types/HttpClient.type";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  getWasteCollectionDetail,
  putCollectorStatus
} from "@/apis/collector/collector-status/collectorStatusApis";
import MainContainer from "@/components/common/MainContainer";
import ArrowHeader from "@/components/header/ArrowHeader";
import { collectorStatusColumns } from "@/components/table-columns/collector/collector-status/CollectorStatusColumns";
import { Separator } from "@/components/ui/separator";
import { formatNumberWithCommas } from "@/utils/formatUtils";
import CollectorInfo from "./CollectorInfo";
import CollectorNumber from "./CollectorNumber";
import RequestInfo from "./RequestInfo";
import SuccessChangePhoto from "./SuccessChangePhoto";
import WorkStatus, { CollectStatusType } from "./WorkStatus";

type CollectorStatusDetailClientType = {
  requestId: string;
};

export type CollectorDetailParam = ExtractParam<typeof putCollectorStatus>;

export default function CollectorStatusDetailClient({
  requestId
}: CollectorStatusDetailClientType) {
  const [detailData, setDetailData] = useState<WasteCollectorDetailType>();
  const [wasteListData, setWasteListData] = useState<
    CollectorStatusColumnsType[]
  >([]);
  // 사진 업데이트 트리거를 위한 상태 추가
  const [photoUpdateTrigger, setPhotoUpdateTrigger] = useState(0);
  const handleStatusChange = useCallback((nextStatus: CollectStatusType) => {
    setDetailData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        disposeStatus: nextStatus
      };
    });
  }, []);

  const form = useForm<CollectorDetailParam>({
    mode: "onChange"
  });

  // 데이터 가져오는 함수를 useCallback으로 분리하여 재사용 가능하게 함
  const fetchData = useCallback(async () => {
    try {
      const response = await getWasteCollectionDetail({ requestId: requestId });
      if (!response.content) {
        return null;
      }
      console.log("Fetched detail data:", response.content);
      setDetailData(response.content);

      const wasteListData = response.content.wasteList.map((waste) => {
        // changeWasteCollectResDto가 있으면 그 데이터를 사용, 없으면 wasteList 원본 데이터 사용
        const changeWasteData = waste.changeWasteCollectResDto || waste;

        // isChange 속성 추가 (changeWasteCollectResDto가 있으면 true)
        const isChange = !!waste.changeWasteCollectResDto;
        const paymentYn = waste.paymentYn;
        return {
          wasteDetailClssName: changeWasteData.wasteDetailClssName,
          wasteKindQuantity: changeWasteData.wasteKindQuantity,
          wasteFee: formatNumberWithCommas(changeWasteData.wasteFee) as any,
          isChange: isChange,
          paymentYn: paymentYn
        };
      });

      setWasteListData(wasteListData);
      // 변경된 데이터를 로컬 스토리지에 저장 (원본 데이터에 isChange 추가)

      // const enhancedWasteList = response.content.wasteList.map((waste) => ({
      //   ...waste,
      //   isChange: !!waste.changeWasteCollectResDto
      // }));

      const enhancedWasteList = response.content.wasteList.map((waste) => ({
        ...waste,
        changeWasteCollectResDto: waste.changeWasteCollectResDto,
        isChange: !!waste.changeWasteCollectResDto
      }));
      localStorage.setItem("wasteList", JSON.stringify(enhancedWasteList));
      localStorage.setItem(
        "disposeRefusalReason",
        response.content.disposeRefusalReason ?? "null"
      );
      localStorage.setItem(
        "adminUploadFileList",
        JSON.stringify(response.content.adminUploadFileList)
      );
    } catch (error) {
      console.error("Error fetching detail data:", error);
    }
  }, [requestId]);

  // 사진 업데이트 핸들러
  const handlePhotoUpdate = useCallback(() => {
    // 트리거 값을 변경하여 useEffect 트리거
    setPhotoUpdateTrigger((prev) => prev + 1);
  }, []);

  // 초기 데이터 로드 및 사진 업데이트 시 데이터 다시 로드
  useEffect(() => {
    fetchData();
  }, [fetchData, photoUpdateTrigger, detailData?.disposeStatus]);

  if (!detailData) return null;

  return (
    <FormProvider {...form}>
      <MainContainer>
        <ArrowHeader
          headerTitle="수거상세"
          moveRoute="/collector/collector-status"
        />
        <section className="flex flex-col gap-[24px]">
          <WorkStatus detailData={detailData} handleData={handleStatusChange} />
          {detailData.disposeStatus === "TKAWY_STAT_003" && (
            <div className="px-[20px]">
              <SuccessChangePhoto
                detailData={detailData}
                requestId={requestId}
                onPhotoUpdate={handlePhotoUpdate}
              />
            </div>
          )}
          <Separator className="h-[8px] bg-gray20" />
          <CollectorNumber detailData={detailData} />
          <Separator className="h-[8px] bg-gray20" />
          <RequestInfo detailData={detailData} />
          <Separator className="h-[8px] bg-gray20" />
          <CollectorInfo
            detailData={detailData}
            data={wasteListData}
            columns={collectorStatusColumns}
          />
        </section>
      </MainContainer>
    </FormProvider>
  );
}
