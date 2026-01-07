"use client";

import { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { Controller, useForm } from "react-hook-form";
import { getCookie } from "cookies-next/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import DropDownMenu from "@/components/common/DropDownMenu";
import SearchInput from "@/components/common/SearchInput";
import Button from "@/components/common/Button";
import usePurcase from "@/stores/usePurcase";
import {
  getStickerList,
  getStickerTop,
  getStickerMiddle
} from "@/apis/waste-sticker/wasteStickerApis";
import { ExtractParam } from "@/types/HttpClient.type";
import { getStickerList as getStickerListType } from "@/apis/waste-sticker/wasteStickerApis";
import StickerTable from "@/components/common/table/StickerTable";

type StickerListParams = ExtractParam<typeof getStickerListType>;

type PurchaseTypeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
};

type wasteStickerType = {
  id: string;
  standardName: string;
};

export default function PurchaseTypeModal({
  open,
  onOpenChange,
  onNext
}: PurchaseTypeModalProps) {
  const { dataList, setDataList, selectedList } = usePurcase(
    useShallow((state) => ({
      dataList: state.dataList,
      setDataList: state.setDataList,
      selectedList: state.selectedList
    }))
  );

  const form = useForm<StickerListParams>({ mode: "onChange" });
  const { control } = form;

  // 첫번째 드롭다운
  const [fData, setFData] = useState<wasteStickerType[]>([]);
  const [topId, setTopId] = useState<string>("");
  // 두번째 드롭다운
  const [sData, setSData] = useState<wasteStickerType[]>([]);
  const [middleId, setMiddleId] = useState<string>("");
  // 검색어
  const [keyword, setKeyword] = useState<string>("");

  // 품목 리스트 조회
  const fetchData = async () => {
    const localId = getCookie("localGovernmentId");
    if (localId) {
      const data = {
        localGovernmentId: localId,
        topStickerId: topId,
        middleStickerId: middleId,
        standardName: keyword
      };
      getStickerList(data)
        .then((res) => {
          if (res.content && Array.isArray(res.content)) {
            const modifiedData = res.content.map((item) => {
              return {
                ...item,
                id: item.stickerId,
                type:
                  item.topStandardName || item.middleStandardName
                    ? "accordion"
                    : "text"
              };
            });
            setDataList(modifiedData);
          } else {
            console.error("스티커 데이터가 배열 형식이 아님");
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  // 스티커 품목 리스트 조회
  const getTopList = async () => {
    const localId = getCookie("localGovernmentId");
    if (localId) {
      getStickerTop({ localGovernmentId: localId })
        .then((res) => {
          if (res.content && Array.isArray(res.content)) {
            const modifiedData = res.content.map((item) => {
              return {
                ...item,
                id: item.stickerId || item.trashBagId
              };
            });
            setFData(modifiedData);
          } else {
            console.error("스티커 데이터가 배열 형식이 아님");
          }
        })
        .catch((error) => console.log(error.message));
      if (topId !== "") {
        getMiddleList();
      }
    }
  };

  // 스티커 세부 품목 리스트 조회
  const getMiddleList = async () => {
    getStickerMiddle({ stickerId: topId }).then((res) => {
      if (res.content && Array.isArray(res.content)) {
        const modifiedData = res.content.map((item) => {
          return {
            id: item.stickerId || item.trashBagId,
            ...item
          };
        });
        setSData(modifiedData);
      } else {
        console.error("스티커 데이터가 배열 형식이 아님");
      }
    });
  };

  useEffect(() => {
    if (open) {
      fetchData();
      getTopList();
    }
  }, [topId, middleId, keyword, open]);

  const handleNext = () => {
    if (selectedList.length > 0) {
      onNext();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px] w-[90vw] h-[90vh] max-h-[800px] p-0 flex flex-col">
        <DialogHeader className="px-[32px] pt-[24px] pb-[20px] border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[20px] font-semibold text-[#0F0F10]">
              스티커 권종 및 세부 규격 선택
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col px-[32px] py-[24px]">
          {/* 드롭다운 영역 */}
          <div className="grid grid-cols-2 gap-[16px] mb-[16px]">
            <Controller
              control={control}
              name="topStickerId"
              render={({ field: { value, onChange } }) => (
                <DropDownMenu
                  label={fData.find((item) => item.id === value)?.standardName || "스티커 품목"}
                  options={fData.map((item) => item.standardName)}
                  onSelect={(selectedName) => {
                    const selectedItem = fData.find((item) => item.standardName === selectedName);
                    if (selectedItem) {
                      onChange(selectedItem.id);
                      setTopId(selectedItem.id);
                    }
                  }}
                />
              )}
            />
            <Controller
              control={control}
              name="middleStickerId"
              render={({ field: { value, onChange } }) => (
                <DropDownMenu
                  label={sData.find((item) => item.id === value)?.standardName || "스티커 세부 품목"}
                  options={sData.map((item) => item.standardName)}
                  onSelect={(selectedName) => {
                    const selectedItem = sData.find((item) => item.standardName === selectedName);
                    if (selectedItem) {
                      onChange(selectedItem.id);
                      setMiddleId(selectedItem.id);
                    }
                  }}
                  isReadOnly={!topId}
                />
              )}
            />
          </div>

          {/* 검색 바 */}
          <div className="mb-[16px]">
            <Controller
              control={control}
              name="standardName"
              render={({ field: { value, onChange } }) => (
                <SearchInput
                  placeholder="스티커 권종 이름을 검색해 주세요."
                  initialValue={value ? decodeURIComponent(value) : ""}
                  className="h-[40px] w-full border-gray40 rounded-[4px]"
                  useInstantSearch={false}
                  setKeyword={(newValue) => {
                    const processedValue = newValue
                      ? decodeURIComponent(newValue)
                      : "";
                    setKeyword(processedValue);
                    onChange(processedValue);
                  }}
                />
              )}
            />
          </div>

          {/* 테이블 영역 */}
          <div className="flex-1 overflow-y-auto mb-[16px] border border-gray-200 rounded-[4px]">
            <div className="bg-[#F4F4F4] border-b border-gray-200">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-[16px] px-[16px] py-[12px]">
                <span className="text-[13px] font-medium text-[#777]">품목 / 세부품목</span>
                <span className="text-[13px] font-medium text-[#777]">규격</span>
                <span className="text-[13px] font-medium text-[#777]">개당 수수료</span>
                <span className="text-[13px] font-medium text-[#777]">보유 재고</span>
                <span className="text-[13px] font-medium text-[#777]">수량</span>
              </div>
            </div>
            <div className="p-[16px]">
              <StickerTable />
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end pt-[16px] border-t">
            <Button
              disabled={selectedList.length === 0}
              className="h-[48px] px-[24px] text-[16px] font-semibold disabled:bg-gray40 disabled:cursor-not-allowed disabled:text-white"
              onClick={handleNext}
            >
              다음
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

