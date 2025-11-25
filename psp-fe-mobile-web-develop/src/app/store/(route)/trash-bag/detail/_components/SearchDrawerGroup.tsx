"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { searchFilter } from "@/app/constant/waste-sticker/DetailCustomDrawerContent.data";
import BasicDrawer from "@/components/common/BasicDrawer";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import SearchInput from "@/components/common/SearchInput";
import useDrawerSelect from "@/stores/useDrawerSelect";
import { TrashBagListParam } from "../page";

export default function SearchDrawerGroup() {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { control } = useFormContext<TrashBagListParam>();
  const { selectedSearchFilter, setSelectedSearchFilter } = useDrawerSelect(
    useShallow((state) => ({
      selectedSearchFilter: state.selectedSearchFilter,
      setSelectedSearchFilter: state.setSelectedSearchFilter
    }))
  );

  return (
    <div className="flex gap-[8px]">
      <Controller
        name="searchFilter"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={value}
            onChange={onChange}
            drawerTitle="조회 검색필터 선택"
            title="검색전체"
            selectedValue={selectedSearchFilter}
            onSelect={setSelectedSearchFilter}
            Content={CustomDrawerContent}
            contentProps={{
              data: searchFilter
            }}
            className="min-w-[116px]"
          />
        )}
      />
      <Controller
        name="keyWord"
        control={control}
        render={({ field: { onChange, value } }) => (
          <SearchInput
            initialValue={value ? decodeURIComponent(value) : ""}
            className="h-[48px] border-gray40 rounded"
            placeholder="검색어를 입력해주세요"
            useInstantSearch={false}
            setKeyword={(newValue) => {
              const processedValue = newValue
                ? decodeURIComponent(newValue)
                : "";
              setSearchKeyword(processedValue);
              onChange(processedValue);
            }}
          />
        )}
      />
    </div>
  );
}
