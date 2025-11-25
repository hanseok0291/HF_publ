"use client";

import {
  PaymentValidationType,
  WasteAllMenuType
} from "@/types/collector/collector-status/add-payment/AddPayment.type";
import { AddPaymentSecondStepColumnsType } from "@/types/collector/collector-status/CollectorStatus.type";
import { ExtractParam } from "@/types/HttpClient.type";
import { useCallback, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { useShallow } from "zustand/react/shallow";
import {
  getAllWasteMenu,
  getWasteMiddleMenu,
  getWasteTopMenu
} from "@/apis/common/commonApis";
import Button from "@/components/common/Button";
import CheckboxDrawer from "@/components/common/CheckboxDrawer";
import { WasteItem } from "@/components/common/CheckboxDrawerContent";
import { DataTable } from "@/components/common/DataTable";
import SearchInput from "@/components/common/SearchInput";
import { addPaymentSecondColumns } from "@/components/table-columns/collector/collector-status/AddPaymentColumns";
import useAddPayment from "@/stores/useAddPayment";

interface BasicDrawerGroupState {
  wasteTopMenu: string;
  wasteMiddleMenu: string;
}

export type SecondStepListParam = ExtractParam<typeof getAllWasteMenu>;
export default function AddPaymentSecondStepClient() {
  const [tableData, setTableData] = useState<AddPaymentSecondStepColumnsType[]>(
    []
  );
  const [search, setSearch] = useState("");
  const [cookieData, setCookieData] = useState({
    localGovernmentId: "-"
  });
  const [currentItem, setCurrentItem] = useState("");
  const [selectedWasteIds, setSelectedWasteIds] = useState<string[]>([]);
  const [selectedWasteId, setSelectedWasteId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const fristSelectedWasteId = searchParams.get("wasteId");

  const {
    setSecondItemFee,
    setSecondeItemName,
    setSecondItemQuantity,
    secondFee,
    secondItem,
    firstItemFee,
    firstItemQuantity
  } = useAddPayment(
    useShallow((state) => ({
      setSecondItemFee: state.setSecondItemFee,
      setSecondeItemName: state.setSecondeItemName,
      setSecondItemQuantity: state.setSecondItemQuantity,
      secondFee: state.secondItemFee,
      secondItem: state.secondeItemName,
      firstItemFee: state.firstItemFee,
      firstItemQuantity: state.firstItemQuantity
    }))
  );
  console.log("frist fee : ", firstItemFee);
  console.log("frist quantity : ", firstItemQuantity);
  const {
    setValue,
    control,
    watch,
    formState: { errors }
  } = useFormContext<PaymentValidationType>();

  const {
    control: wasteMenuControl,
    getValues: wasteMenuGetValue,
    setValue: setWasteMenuValue,
    watch: wasteWatch
  } = useFormContext<SecondStepListParam>();

  const changeWasteId = watch("changeWasteId");

  // 로컬 정부 ID 쿠키 가져오기 및 localStorage 접근
  useEffect(() => {
    const item = localStorage.getItem("currentWasteItem");
    if (item) {
      setCurrentItem(item);
      console.log("Retrieved currentWasteItem from localStorage:", item);
    } else {
      console.log("No found currentWasteItem");
    }

    const localGovernmentId = getCookie("localGovernmentId")?.toString() ?? "-";
    setCookieData({
      localGovernmentId: localGovernmentId
    });
  }, []);

  // 선택된 상위 폐기물 ID 설정
  useEffect(() => {
    const standardIds = wasteMenuGetValue("topWasteId");
    if (standardIds && standardIds !== "null") {
      setSelectedWasteId(standardIds);
    }
  }, [wasteMenuGetValue("topWasteId")]);

  // 폐기물 메뉴 데이터 변환 함수
  const transformWasteMenuData = useCallback(
    (wasteMenu?: WasteAllMenuType): AddPaymentSecondStepColumnsType[] => {
      if (!wasteMenu?.content) {
        return [];
      }
      console.log("object : ", currentItem);
      const transformed = wasteMenu.content.map((item) => ({
        id: item.wasteId,
        itemName: `[${item.topStandardName}${
          item.middleStandardName !== null ? `/${item.middleStandardName}` : ""
        }] ${item.standardName}`,
        fee: item.fee,
        // quantity: item.quantity,
        notSelect:
          item.wasteId === fristSelectedWasteId ||
          item.fee < firstItemFee ||
          currentItem === item.wasteId
      }));
      console.log("object : ", transformed);
      // 선택 안되는 항목은 최하단으로 이동
      return transformed.sort((a, b) => {
        if (a.notSelect) return 1;
        if (b.notSelect) return -1;
        return 0;
      });
    },
    [fristSelectedWasteId, firstItemFee, currentItem]
  );

  // 폐기물 메뉴 데이터 가져오기
  const fetchWasteMenu = useCallback(async () => {
    if (cookieData.localGovernmentId === "-") return;

    setIsLoading(true);
    try {
      const response = await getAllWasteMenu({
        localGovernmentId: cookieData.localGovernmentId,
        topWasteId: wasteMenuGetValue("topWasteId"),
        middleWasteId: wasteMenuGetValue("middleWasteId"),
        standardName: wasteWatch("standardName")
      });

      const transformedData = transformWasteMenuData(response);
      setTableData(transformedData);
    } catch (error) {
      console.error("Error fetching waste menu:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    cookieData.localGovernmentId,
    wasteMenuGetValue,
    wasteWatch,
    transformWasteMenuData
  ]);

  // 데이터 가져오기 실행
  useEffect(() => {
    if (cookieData.localGovernmentId !== "-") {
      fetchWasteMenu();
    }
  }, [
    cookieData.localGovernmentId,
    wasteMenuGetValue("topWasteId"),
    wasteMenuGetValue("middleWasteId"),
    wasteWatch("standardName"),
    fetchWasteMenu
  ]);

  // SWR 훅을 사용하여 상위 및 중간 폐기물 메뉴 가져오기
  const { swrResponse: wasteTopMenu } = getWasteTopMenu({
    localGovernmentId: cookieData.localGovernmentId
  });

  const { swrResponse: wasteMiddleMenu } = getWasteMiddleMenu({
    wasteId: selectedWasteId
  });

  const wasteTopMenuError = wasteTopMenu.error || !wasteTopMenu;
  const wasteMiddleMenuError = wasteMiddleMenu.error || !wasteMiddleMenu;

  // 선택 변경 처리
  const handleSelectionChange = (selectedIndexes: string[]) => {
    if (selectedIndexes.length > 0) {
      const index = parseInt(selectedIndexes[0]);
      const selectedItem = tableData[index];

      if (selectedItem) {
        setValue("changeWasteId", selectedItem.id, { shouldValidate: true });
        setSecondItemFee(selectedItem.fee);
        setSecondeItemName(selectedItem.itemName);
        setSecondItemQuantity(firstItemQuantity);
      }
    } else {
      setValue("changeWasteId", "", { shouldValidate: true });
    }
  };

  // 현재 선택된 changeWasteId에 해당하는 테이블 index 탐색
  const findSelectedIndex = () => {
    const index = tableData.findIndex((item) => item.id === changeWasteId);
    return index >= 0 ? [index.toString()] : [];
  };

  // 선택된 폐기물 ID 업데이트
  const updateSelectedWasteIds = useCallback((selectedItems: WasteItem[]) => {
    if (selectedItems.length === 0) {
      setSelectedWasteIds([]);
    } else {
      const wasteIds = selectedItems.map((item) => item.wasteId);
      setSelectedWasteIds(wasteIds);
    }
  }, []);

  // 메뉴 데이터 변환
  const wasteTopMenuData: WasteItem[] = (wasteTopMenu?.data?.content || []).map(
    (item: any) => ({
      wasteId: item.wasteId,
      standardName: item.standardName
    })
  );

  const wasteMiddleMenuData: WasteItem[] = (
    wasteMiddleMenu?.data?.content || []
  ).map((item: any) => ({
    wasteId: item.wasteId,
    standardName: item.standardName
  }));

  const alertMessageData: WasteItem[] = [
    { wasteId: "alert", standardName: "품목을 선택해주세요." }
  ];

  // 데이터 로딩 중 또는 에러 시 처리
  if (wasteTopMenuError || wasteMiddleMenuError) {
    return <p>데이터가 없습니다.</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-[8px] mb-[16px]">
          <Controller
            control={wasteMenuControl}
            name="topWasteId"
            render={({ field: { value, onChange } }) => (
              <CheckboxDrawer
                title="품목 조회"
                drawerTitle="조회 품목 선택"
                allSelectLabel="조회품목 전체 선택"
                data={wasteTopMenuData}
                onChange={(newValue) => {
                  onChange(newValue);
                  // 상위 메뉴가 변경되면 중간 메뉴 초기화
                  setWasteMenuValue("middleWasteId", null);
                }}
                onFilterChange={updateSelectedWasteIds}
                value={value === null ? "" : String(value)}
                allSelectAsEmpty
              />
            )}
          />

          <Controller
            control={wasteMenuControl}
            name="middleWasteId"
            render={({ field: { value, onChange } }) => (
              <CheckboxDrawer
                title="세부품목 조회"
                drawerTitle="조회 세부품목 선택"
                data={selectedWasteIds.length > 0 ? wasteMiddleMenuData : []}
                onChange={(newValue) => {
                  onChange(newValue);
                  // 새 항목 데이터 갱신
                  fetchWasteMenu();
                }}
                value={value === null ? "" : String(value)}
                allSelectLabel="세부품목 전체 선택"
                allSelectAsEmpty
              />
            )}
          />
          <div className="col-span-2">
            <Controller
              name="standardName"
              control={wasteMenuControl}
              render={({ field: { onChange, value } }) => (
                <SearchInput
                  initialValue={value ? decodeURIComponent(value) : ""}
                  className="h-[48px] border-gray40 rounded"
                  placeholder="검색어를 입력해주세요"
                  setKeyword={(newValue) => {
                    const processedValue = newValue
                      ? decodeURIComponent(newValue)
                      : "";
                    setSearch(processedValue);
                    onChange(processedValue);
                  }}
                />
              )}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <p>데이터를 불러오는 중입니다...</p>
          </div>
        ) : (
          <Controller
            control={control}
            name="changeWasteId"
            render={() => (
              <DataTable
                variant="select"
                columns={addPaymentSecondColumns}
                data={tableData}
                value={findSelectedIndex()}
                onChange={handleSelectionChange}
                isRowSelectable={(row) => !row.notSelect}
                emptyMessage="검색 결과가 없습니다."
              />
            )}
          />
        )}

        {errors.changeWasteId && (
          <p className="text-fail text-[12px] mb-2">
            {errors.changeWasteId.message}
          </p>
        )}
      </div>
      <Button type="submit" className="mt-[15px] mb-[40px]">
        완료
      </Button>
    </div>
  );
}
