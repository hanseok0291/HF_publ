"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getCookie } from "cookies-next/client";
import {
  getLegalMenu,
  getWasteMiddleMenu,
  getWasteTopMenu
} from "@/apis/common/commonApis";
import { WasteCollectionListParam } from "@/app/collector/(route)/collector-status/_components/CollectorStatusClient";
import { collectorStatus } from "@/app/constant/collector/collector-status/CollectorStatus.data";
import CheckboxDrawer from "@/components/common/CheckboxDrawer";
import { WasteItem } from "@/components/common/CheckboxDrawerContent";

export default function BasicDrawerGroup() {
  const [legalEmdNm, setLegalEmdNm] = useState<string[]>([]);
  const [selectedWasteIds, setSelectedWasteIds] = useState<string[]>([]);
  const [resetSelectedMiddleMenuData, setResetSelectedMiddleMenuData] =
    useState(false);
  const [cookieData, setCookieData] = useState({ id: "", institutionId: "" });
  const { control, getValues, setValue } =
    useFormContext<WasteCollectionListParam>();

  useEffect(() => {
    const id = getCookie("localGovernmentId")?.toString() || "";
    const institutionId = getCookie("institutionId")?.toString() || "";
    setCookieData({ id, institutionId });
  }, []);

  useEffect(() => {
    const standardIds = getValues("standardIds");
    if (standardIds) {
      setSelectedWasteIds(Array.isArray(standardIds) ? standardIds : []);
    }
  }, [getValues]);

  const tempId = "temp_not_valid_id";
  const { swrResponse: legalMenu } = getLegalMenu({
    institutionId: cookieData.institutionId || tempId
  });

  const { swrResponse: wasteTopMenu } = getWasteTopMenu({
    localGovernmentId: cookieData.id
  });

  const { swrResponse: wasteMiddleMenu } = getWasteMiddleMenu({
    wasteId: selectedWasteIds.length > 0 ? selectedWasteIds.join(",") : ""
  });

  // institutionId가 있을 때만 legalMenu API 재요청
  useEffect(() => {
    if (cookieData.institutionId === tempId) {
      legalMenu.mutate();
    }
  }, [cookieData.institutionId]);

  useEffect(() => {
    if (legalMenu?.data?.content && Array.isArray(legalMenu.data.content)) {
      setLegalEmdNm(legalMenu.data.content);
    } else if (legalMenu?.error) {
      console.error("legalMenu API 오류:", legalMenu.error);
      setLegalEmdNm(["존재하는 지역이 없습니다"]);
    }
  }, [legalMenu]);

  const legalMenuError = legalMenu.error || !legalMenu;
  const wasteTopMenuError = wasteTopMenu.error || !wasteTopMenu;
  const wasteMiddleMenuError = wasteMiddleMenu.error || !wasteMiddleMenu;

  // Convert data to WasteItem format for CheckboxDrawer
  const legalEmdNmData: WasteItem[] = Array.isArray(legalEmdNm)
    ? legalEmdNm
        .map((item) => ({
          wasteId: decodeURIComponent(item),
          standardName: item
        }))
        .sort((a, b) => a.standardName.localeCompare(b.standardName))
    : [];

  const wasteTopMenuData: WasteItem[] = (wasteTopMenu?.data?.content || []).map(
    (item: any) => ({
      wasteId: item.wasteId,
      standardName: item.standardName
    })
  );

  const collectorStatusData: WasteItem[] = collectorStatus.map((item) => ({
    wasteId: item.value,
    standardName: item.content
  }));

  const wasteMiddleMenuData: WasteItem[] = (
    wasteMiddleMenu?.data?.content || []
  ).map((item: any) => ({
    wasteId: item.wasteId,
    standardName: item.standardName
  }));

  // const alertMessageData: WasteItem[] = [
  //   { wasteId: "", standardName: "품목을 선택해주세요." }
  // ];

  // 상위 품목 선택 시 selectedWasteIds 업데이트 함수
  const updateSelectedWasteIds = useCallback((selectedItems: WasteItem[]) => {
    if (selectedItems.length === 0) {
      setSelectedWasteIds([]);
    } else {
      const wasteIds = selectedItems.map((item) => item.wasteId);
      setSelectedWasteIds(wasteIds);
    }

    setValue("detailStandardIds", null);
    setResetSelectedMiddleMenuData(true);
  }, []);

  const resetComplete = () => {
    setResetSelectedMiddleMenuData(false);
  };

  if (legalMenuError || wasteTopMenuError || wasteMiddleMenuError) {
    return <p>데이터가 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Controller
        name="legalEmdNm"
        control={control}
        render={({ field: { value, onChange } }) => (
          <CheckboxDrawer
            title="행정동 전체"
            drawerTitle="행정동 선택"
            allSelectLabel="행정동 전체 선택"
            data={legalEmdNmData}
            onChange={onChange}
            value={value === null ? "" : String(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="disposeStatusCode"
        render={({ field: { value, onChange } }) => (
          <CheckboxDrawer
            title="수거상태"
            onChange={onChange}
            drawerTitle="수거상태 선택"
            allSelectLabel="수거상태 전체 선택"
            data={collectorStatusData}
            value={value === null ? "" : String(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="standardIds"
        render={({ field: { value, onChange } }) => (
          <CheckboxDrawer
            title="품목 조회"
            onChange={onChange}
            drawerTitle="조회 품목 선택"
            allSelectLabel="조회품목 전체 선택"
            data={wasteTopMenuData}
            onFilterChange={updateSelectedWasteIds}
            value={value === null ? "" : String(value)}
          />
        )}
      />

      <Controller
        control={control}
        name="detailStandardIds"
        render={({ field: { value, onChange } }) => (
          <CheckboxDrawer
            title="세부품목 조회"
            drawerTitle="조회 세부품목 선택"
            data={selectedWasteIds.length > 0 ? wasteMiddleMenuData : []}
            onChange={onChange}
            value={value === null ? "" : String(value)}
            allSelectLabel="세부품목 전체 선택"
            reset={resetSelectedMiddleMenuData}
            resetComplete={resetComplete}
          />
        )}
      />
    </div>
  );
}
