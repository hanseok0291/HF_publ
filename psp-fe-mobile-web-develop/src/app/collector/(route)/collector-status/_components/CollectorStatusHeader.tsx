import { Controller, useFormContext } from "react-hook-form";
import SearchInput from "@/components/common/SearchInput";
import ArrowAndSearchHeader from "@/components/header/ArrowAndSearchHeader";
import { WasteCollectionListParam } from "./CollectorStatusClient";

export default function CollectorStatusHeader({
  setSearch
}: {
  setSearch: (value: string) => void;
}) {
  const { control } = useFormContext<WasteCollectionListParam>();
  return (
    <>
      <ArrowAndSearchHeader headerTitle="수거처리현황" />
      <div className="px-[20px]">
        <Controller
          name="keyWord"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SearchInput
              initialValue={value ? decodeURIComponent(value) : ""}
              className="h-[46px] border-gray40 rounded"
              placeholder="검색어를 입력해주세요"
              useInstantSearch={false}
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
    </>
  );
}
