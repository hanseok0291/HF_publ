"use client";

import { Fragment, useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { addDays, format, isFirstDayOfMonth, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { WasteCollectionListParam } from "@/app/collector/(route)/collector-status/_components/CollectorStatusClient";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface HorizontalCalendarProps {
  selected: Date;
  onSelect: (date: Date) => void;
}

export default function HorizontalCalendar({
  selected,
  onSelect
}: HorizontalCalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const selectedDateRef = useRef<HTMLDivElement>(null);
  const { control } = useFormContext<WasteCollectionListParam>();

  // 마지막으로 처리된 이벤트의 타임스탬프를 저장
  const lastEventTimeRef = useRef<number>(0);

  const today = new Date();
  // 전후 14일씩 유지 (총 29일)
  const dates = Array.from({ length: 29 }, (_, i) => {
    return addDays(today, i - 14);
  });

  // 컴포넌트가 마운트될 때 오늘 날짜가 가운데 오도록 스크롤 위치 조정
  useEffect(() => {
    if (!scrollRef.current) return;

    const refCurrent = isSameDay(today, selected)
      ? todayRef.current
      : selectedDateRef.current;
    if (refCurrent) {
      scrollRef.current.scrollLeft =
        refCurrent.offsetLeft -
        scrollRef.current.clientWidth / 2 +
        refCurrent.offsetWidth / 2;
    }
  }, []);

  const handleDayColor = (date: Date): string => {
    const day = date.getDay();
    if (day === 0) return "text-red-500";
    if (day === 6) return "text-blue-500";
    return "text-gray-600";
  };

  // 이벤트 핸들러 함수
  const handleDateSelect = (
    date: Date,
    onChange: (value: string) => void,
    e: React.MouseEvent | React.TouchEvent
  ) => {
    // 이벤트 중복 방지를 위한 타임스탬프 체크
    const now = Date.now();
    if (now - lastEventTimeRef.current < 500) {
      // 마지막 이벤트로부터 500ms 이내에 발생한 이벤트는 무시
      if (e.cancelable) {
        e.preventDefault();
      }
      return;
    }

    // 현재 이벤트 타임스탬프 저장
    lastEventTimeRef.current = now;

    // 날짜 형식 변환 및 상태 업데이트
    const formattedDate = format(date, "yyyy-MM-dd", { locale: ko });
    onChange(formattedDate);
    onSelect(date);
  };

  return (
    <Controller
      control={control}
      name="thisDisposeDate"
      render={({ field: { onChange } }) => (
        <section className="w-full relative mb-4">
          <div className="flex items-center">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory"
            >
              <div className="flex gap-2">
                {dates.map((date) => (
                  <Fragment key={date.toISOString()}>
                    {isFirstDayOfMonth(date) && (
                      <div className="flex flex-col gap-[4px] items-center min-w-fit px-2">
                        <span className="text-sm font-semibold text-[12px] text-gray60">
                          {format(date, "LLLL", { locale: ko })}
                        </span>
                        <Separator
                          orientation="vertical"
                          className="bg-gray30 h-[20px]"
                        />
                      </div>
                    )}
                    <div
                      ref={
                        isSameDay(today, date)
                          ? todayRef
                          : isSameDay(selected, date)
                            ? selectedDateRef
                            : null
                      }
                      className="backface-hidden transform-3d"
                    >
                      <Button
                        variant="horizontal"
                        onClick={(e) => handleDateSelect(date, onChange, e)}
                        onTouchEnd={(e) => {
                          // cancelable 속성을 확인하여 취소 가능한 경우에만 preventDefault 호출
                          if (e.cancelable) {
                            e.preventDefault();
                          }
                          handleDateSelect(date, onChange, e);
                        }}
                        className={cn(
                          "min-w-[48px] h-[48px] flex flex-col gap-[4px] snap-center p-4",
                          isSameDay(selected, date) && "bg-main text-white",
                          isSameDay(today, date) && "border-main"
                        )}
                      >
                        <span
                          className={cn(
                            "text-[12px] font-medium",
                            handleDayColor(date),
                            isSameDay(selected, date) &&
                              "text-primary-foreground"
                          )}
                        >
                          {format(date, "EEE", { locale: ko })}
                        </span>
                        <span
                          className={cn(
                            "text-[14px] font-medium",
                            handleDayColor(date),
                            isSameDay(selected, date) &&
                              "text-primary-foreground"
                          )}
                        >
                          {format(date, "dd", { locale: ko })}
                        </span>
                      </Button>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    />
  );
}
