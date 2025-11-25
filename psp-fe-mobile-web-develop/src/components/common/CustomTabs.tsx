import { CustomTabsType } from "@/types/components/common/CommonComponents.type";
import { Controller, useController, useFormContext } from "react-hook-form";
import { usePathname } from "next/navigation";
import { NoticeCollectorParam } from "@/app/collector/(route)/notice/page";
import { NoticeStoreParam } from "@/app/store/(route)/(etc)/notice/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoticeTabs from "./NoticeTabs";

export default function CustomTabs({ className, data }: CustomTabsType) {
  const pathname = usePathname();
  const service = pathname.split("/")[1];

  const { control, setValue } =
    service === "store"
      ? useFormContext<NoticeStoreParam>()
      : useFormContext<NoticeCollectorParam>();
  const { field } = useController({ name: "writerType", control });

  return (
    <Tabs
      value={field.value}
      onValueChange={(value) => {
        field.onChange(value);
        setValue("page", 0);
      }}
    >
      {/** 조회 게시글 리스트*/}
      <Controller
        control={control}
        name="writerType"
        render={({ field: { onChange } }) => (
          <TabsList>
            {data.map((list) => {
              return (
                <div className="w-full" key={list.id}>
                  <TabsTrigger
                    value={list.value}
                    onClick={() => {
                      onChange(list.value);
                    }}
                    className={` ${
                      field.value === list.value
                        ? "text-black"
                        : "text-[#A5A5A5]"
                    }`}
                  >
                    {list.trigger}
                  </TabsTrigger>
                  <hr
                    className={`h-[2px] border-0 ${
                      field.value === list.value ? "bg-black" : "bg-[#F4F4F4]"
                    }`}
                  />
                </div>
              );
            })}
          </TabsList>
        )}
      />

      {data.map((list) => {
        return (
          <TabsContent value={list.value} key={list.id}>
            <NoticeTabs />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
