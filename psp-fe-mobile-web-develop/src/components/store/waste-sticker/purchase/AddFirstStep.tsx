import { ExtractParam } from "@/types/HttpClient.type";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getStickerList } from "@/apis/waste-sticker/wasteStickerApis";
import CheckboxDrawer from "@/components/common/CheckboxDrawer";
import { WasteItem } from "@/components/common/CheckboxDrawerContent";
import SearchInput from "../../../common/SearchInput";
import WasteStickerTable from "../../../table-columns/stores/waste-sticker/WasteStickerTable";

export type StickerListParams = ExtractParam<typeof getStickerList>;

type AddFirstStepProps = {
  SearchInputPlaceholder?: string;
  dataList: any[];
  pushLink: string;
  setKeyword: (id: string) => void;
};

export default function AddFirstStep({
  SearchInputPlaceholder = "SearchInputPlaceholder",
  dataList,
  pushLink,
  setKeyword
}: AddFirstStepProps) {
  // 폼 설정
  const form = useForm<StickerListParams>({ mode: "onChange" });
  const { control } = form;
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* 검색 바 */}
      <div className="px-[20px] py-[16px]">
        <Controller
          control={control}
          name="standardName"
          render={({ field: { value, onChange } }) => (
            <SearchInput
              placeholder={SearchInputPlaceholder}
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

      {/* 리스트 영역 */}
      <div className="flex-1 overflow-y-auto">
        <WasteStickerTable data={dataList} pushLink={pushLink} />
      </div>
    </div>
  );
}
