"use client";

import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import {
  PaymentValidationType,
  WasteAllMenuType
} from "@/types/collector/collector-status/add-payment/AddPayment.type";
import { AddPaymentFirstStepColumnsType } from "@/types/collector/collector-status/CollectorStatus.type";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { useShallow } from "zustand/react/shallow";
import { getAllWasteMenu } from "@/apis/common/commonApis";
import Button from "@/components/common/Button";
import { DataTable } from "@/components/common/DataTable";
import { addPaymentFirstColumns } from "@/components/table-columns/collector/collector-status/AddPaymentColumns";
import useAddPayment from "@/stores/useAddPayment";

// 이전에 완료된 항목 가져오기 (배열 대신 단일 값 사용)
const getPreviouslySelectedItems = (): string[] => {
  try {
    const completedItem = localStorage.getItem("completedPaymentItem");
    return completedItem ? [completedItem] : [];
  } catch (e) {
    console.error("Error loading completed items:", e);
    return [];
  }
};

// 현재 선택 항목 저장 (임시)
const saveCurrentSelection = (id: string) => {
  localStorage.setItem("currentSelectedItem", id);
};

// 현재 선택 항목 가져오기
const getCurrentSelection = (): string => {
  return localStorage.getItem("currentSelectedItem") || "";
};

export default function AddPaymentFirstStep() {
  const [tableData, setTableData] = useState<AddPaymentFirstStepColumnsType[]>(
    []
  );
  const [cookieData, setCookieData] = useState("");
  const [ls, setLs] = useState<any>([]);
  const [previouslySelectedItems, setPreviouslySelectedItems] = useState<
    string[]
  >([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");

  const {
    setValue,
    control,
    watch,
    formState: { errors }
  } = useFormContext<PaymentValidationType>();
  const wasteId = watch("wasteId");
  const searchParams = useSearchParams();
  const fristSelectedWasteId = searchParams.get("wasteId");
  const { setFirstItemFee, firstItemFee, setFirstItemQuantity } = useAddPayment(
    useShallow((state) => ({
      setFirstItemFee: state.setFirstItemFee,
      firstItemFee: state.firstItemFee,
      setFirstItemQuantity: state.setFirstItemQuantity
    }))
  );

  // 컴포넌트 마운트 시 이전에 완료된 선택 항목과 현재 선택 중인 항목 로드
  useEffect(() => {
    // 이전 완료 항목 로드
    const completedItems = getPreviouslySelectedItems();
    setPreviouslySelectedItems(completedItems);

    // 현재 선택 항목 로드
    const current = getCurrentSelection();
    setCurrentSelection(current);

    // 현재 선택된 항목이 있으면 폼 상태 업데이트
    if (current) {
      // 선택된 항목 데이터 찾기
      const wasteList = JSON.parse(localStorage.getItem("wasteList") || "[]");
      const selectedItem = wasteList.find((item: any) => {
        const itemId = item.isChange
          ? item.changeWasteCollectResDto?.wasteCollectId
          : item.wasteCollectId;
        return itemId === current;
      });

      if (selectedItem) {
        // 선택된 항목으로 폼 상태 업데이트
        const itemData = selectedItem.isChange
          ? selectedItem.changeWasteCollectResDto
          : selectedItem;
        setValue("wasteId", current, { shouldValidate: true });
        setFirstItemFee(itemData.wasteFee);
      }
    }
  }, [setValue, setFirstItemFee]);
  useEffect(() => {
    const localGovernmentId = getCookie("localGovernmentId")?.toString() ?? "-";
    const wasteList: WasteCollectorDetailType[] = JSON.parse(
      localStorage.getItem("wasteList") || "[]"
    );
    setLs(wasteList);
    setCookieData(localGovernmentId);
  }, []);

  if (cookieData === "-" || cookieData === null) {
    return null;
  }

  useEffect(() => {
    const fetchMenu = async () => {
      if (cookieData) {
        const response = await getAllWasteMenu({
          localGovernmentId: cookieData
        });
        console.log(response);
        const transformedData = transformWasteMenuData(response);
        setTableData(transformedData);
      }
    };
    fetchMenu();
  }, [cookieData]);

  const handleSelectionChange = (selectedIndexes: string[]) => {
    if (selectedIndexes.length > 0) {
      // 선택된 인덱스를 통해 실제 데이터의 id를 찾습니다
      const index = parseInt(selectedIndexes[0]);
      const selectedItem = tableData[index];
      console.log(selectedItem);
      if (selectedItem) {
        setValue("wasteId", selectedItem.id, { shouldValidate: true });
        setValue("changeWasteId", "-");
        setFirstItemFee(selectedItem.fee);
        setFirstItemQuantity(selectedItem.quantity);
        // 현재 선택 항목 저장 (임시)
        saveCurrentSelection(selectedItem.id);
        setCurrentSelection(selectedItem.id);
        localStorage.setItem(
          "currentWasteItem",
          selectedItem.currentItemId ?? ""
        );
      }
    } else {
      setValue("wasteId", "", { shouldValidate: true });
      localStorage.removeItem("currentSelectedItem");
      setCurrentSelection("");
    }
  };

  const transformWasteMenuData = (
    wasteMenu?: WasteAllMenuType
  ): AddPaymentFirstStepColumnsType[] => {
    if (!wasteMenu?.content) {
      return [];
    }

    // 완료된 항목 목록 가져오기
    const completedItems = getPreviouslySelectedItems();

    // 테이블 리스트 데이터 가공 단계
    const transformed = ls.map((item: any) => {
      // isChange가 ture일 경우, changeWasteCollectResDto 데이터를 사용 아닐 경우 wasteList 데이터 사용
      const ChangeItem = item.isChange ? item.changeWasteCollectResDto : item;

      // 현재 폼에 설정된 wasteId가 이 항목이면 선택 가능하게 함
      const isCurrentlySelected = wasteId === ChangeItem.wasteCollectId;

      // 이 항목이 이미 완료된 항목 목록에 있는지 확인
      const isCompletedItem = completedItems.includes(
        ChangeItem.wasteCollectId
      );

      return {
        id: ChangeItem.wasteCollectId,
        currentItemId: ChangeItem.wasteId,
        itemName: `${ChangeItem.wasteDetailClssName}`,
        fee: ChangeItem.wasteFee,
        quantity: ChangeItem.wasteKindQuantity,
        // 선택 불가능 조건:
        notSelect:
          // 1. 이미 변경된 항목
          item.isChange === true ||
          // 2. URL에서 지정된 항목
          fristSelectedWasteId === ChangeItem.wasteId ||
          // 3. 이미 완료된 항목 중에서 현재 선택된 항목이 아닌 것
          (isCompletedItem && !isCurrentlySelected) ||
          // 4. 추가 결제 1단계에서 선택한 항목이 있을경우
          isCurrentlySelected
      };
    });

    // notSelect 있을 경우 최하단
    return transformed.sort((a: any, b: any) => {
      if (a.notSelect) return 1;
      if (b.notSelect) return -1;
      return 0;
    });
  };

  // 현재 선택된 wasteId에 해당하는 table index 탐색
  const findSelectedIndex = () => {
    const index = tableData.findIndex((item) => item.id === wasteId);
    return index >= 0 ? [index.toString()] : [];
  };

  useEffect(() => {
    console.log("error : ", errors.changeWasteId?.message);
  }, [errors]);

  const isAllNotSelect = tableData.every((item) => item.notSelect === true);

  return (
    <section className="flex flex-col justify-between h-full">
      <div className="flex-1">
        <Controller
          control={control}
          name="wasteId"
          render={() => (
            <DataTable
              variant="select"
              columns={addPaymentFirstColumns}
              data={isAllNotSelect ? [] : tableData}
              value={findSelectedIndex()}
              onChange={handleSelectionChange}
              isRowSelectable={(row) => !row.notSelect}
              emptyMessage="선택 가능한 폐기물 품목이 없습니다."
            />
          )}
        />
        {errors.wasteId && (
          <p className="text-fail text-[12px] mt-6">{errors.wasteId.message}</p>
        )}
      </div>
      <Button type="submit" className="mt-[15px] mb-[40px]">
        다음
      </Button>
    </section>
  );
}
