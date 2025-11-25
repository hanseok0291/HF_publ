"use client";

import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useFormContext } from "react-hook-form";
import { addDays, differenceInDays, format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { WasteStickerListParam } from "@/app/store/(route)/waste-sticker/detail/page";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const MAX_DATE_RANGE = 365;
const DATE_FORMATS = {
  button: "yyyy-MM-dd",
  caption: "yyyy.MM",
  confirmation: "yyyy년 MM월 dd일"
} as const;

export const DatePicker = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { setValue } = useFormContext<WasteStickerListParam>();

  useEffect(() => {
    if (dateRange?.from) {
      setValue("searchStartDate", format(dateRange.from, DATE_FORMATS.button));
    }
    if (dateRange?.to) {
      setValue("searchEndDate", format(dateRange.to, DATE_FORMATS.button));
    }
  }, [dateRange]);

  const adjustDateRange = (
    from: Date | undefined,
    to: Date | undefined
  ): DateRange | undefined => {
    if (!from && !to) return undefined;
    if (from && !to) return { from, to: from };
    if (!from && to) return { from: to, to };
    if (!from || !to) return undefined;

    const daysDifference = differenceInDays(to, from);
    if (daysDifference <= MAX_DATE_RANGE) {
      return { from, to };
    }

    const adjustedTo =
      dateRange?.from === from ? addDays(from, MAX_DATE_RANGE) : to;
    const adjustedFrom =
      dateRange?.to === to ? subDays(to, MAX_DATE_RANGE) : from;

    return { from: adjustedFrom, to: adjustedTo };
  };

  const formatDateRange = (
    range: DateRange | undefined,
    formatString: string
  ) => {
    if (!range?.from) return "YYYY-MM-DD ~ YYYY-MM-DD";
    const fromStr = format(range.from, formatString, { locale: ko });
    if (!range.to) return fromStr;
    const toStr = format(range.to, formatString, { locale: ko });

    return `${fromStr} ~ ${toStr}`;
  };

  const calendarClassNames = {
    // root: "h-[380px]",
    months: "relative flex flex-row justify-center space-y-0 sm:space-x-4",
    month: "flex flex-col",
    caption: "flex justify-center relative items-center mt-[24px] mb-[12px]",
    caption_label: "text-[18px] font-semibold",
    nav: "space-x-1 flex items-center",
    nav_button_previous: "absolute left-[85px] border-0",
    nav_button_next: "absolute right-[85px] border-0",
    table: "w-[310px] border-collapse space-y-1",
    head_row: "flex",
    head_cell:
      "text-muted-foreground rounded-md w-[45px] sm:w-10 h-9 font-normal text-[0.8rem]",
    row: "flex w-full mt-2",
    cell: "h-[45px] w-[45px] sm:w-10 text-center text-sm relative p-0",
    day: "h-[45px] w-[45px] sm:w-10 p-0 font-normal text-[13px] hover:bg-[#3C7CFD] hover:text-white",
    day_selected: "rounded-none bg-gray-200 text-black",
    day_range_middle: "rounded-none bg-gray-200 text-black",
    day_range_start:
      "[&:not(.day_range_end)]:rounded-l-full !bg-main text-white",
    day_range_end:
      "[&:not(.day_range_start)]:rounded-r-full !bg-main text-white",
    day_today: "text-main"
  };

  return (
    <div className="flex flex-col gap-4 ">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "flex justify-start gap-[8px] border-gray40 bg-white p-[8px_12px] text-[0.875rem] font-medium h-[40px] rounded",
              !dateRange && "text-[14px] font-medium"
            )}
          >
            <CalendarIcon className="text-gray60" />
            {formatDateRange(dateRange, DATE_FORMATS.button)}
          </Button>
        </DrawerTrigger>

        <DrawerContent className="shadow-drawer">
          <DrawerTitle className="mt-[24px] text-center">
            주문 조회 기간 선택
          </DrawerTitle>
          <div className="flex flex-col justify-center">
            <Calendar
              mode="range"
              formatters={{
                formatCaption: (date) =>
                  format(date, DATE_FORMATS.caption, { locale: ko })
              }}
              selected={dateRange}
              initialFocus
              defaultMonth={dateRange?.from}
              onSelect={(range) =>
                setDateRange(adjustDateRange(range?.from, range?.to))
              }
              locale={ko}
              className="px-0 pt-0 pb-[24px]"
              classNames={calendarClassNames}
              fixedWeeks
            />

            <DrawerClose className="mx-5 mb-10 rounded-sm bg-main py-[14px] text-center text-[16px] font-semibold text-white">
              {formatDateRange(dateRange, DATE_FORMATS.confirmation)}
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
