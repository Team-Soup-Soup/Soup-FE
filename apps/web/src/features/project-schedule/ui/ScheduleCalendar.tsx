import React, { type Dispatch, type SetStateAction } from 'react';

import { cn } from '@soup/utils';

import ChevronRight from '~/assets/icons/chevron-right.svg';
import ChevronLeft from '~/assets/icons/chevron-left.svg';
import { WEEK } from '~/shared/constants';
import type { Schedule } from '~/shared/types';

interface ScheduleCalendarProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  data: { [key: string]: Schedule[] };
  onMonthChange?: (year: number, month: number) => void;
}

export default function ScheduleCalendar({
  date,
  setDate,
  data,
  onMonthChange,
}: ScheduleCalendarProps) {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const dayCnt = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const firstWeek = Array.from({ length: firstDay.getDay() }, () => '');

  const wholeDay = Array.from({ length: dayCnt }, (_, i) => i + 1);
  const lastWeek = Array.from(
    {
      length: (7 - ((firstWeek.length + wholeDay.length) % 7)) % 7,
    },
    () => '',
  );
  const formattedDay = [...firstWeek, ...wholeDay, ...lastWeek];
  const selectedDay = date.getDate();

  return (
    <div className="m-10">
      <div className="flex w-full justify-center text-lg">
        <div className="flex gap-x-2">
          <img
            src={ChevronLeft}
            className="cursor-pointer"
            onClick={() => {
              const newMonth = currentMonth - 1;
              const newYear = newMonth < 0 ? currentYear - 1 : currentYear;
              const adjustedMonth = newMonth < 0 ? 11 : newMonth;
              setDate(new Date(newYear, adjustedMonth));
              onMonthChange?.(newYear, adjustedMonth);
            }}
          />
          {currentYear}년 {currentMonth + 1}월
          <img
            src={ChevronRight}
            className="cursor-pointer"
            onClick={() => {
              const newMonth = currentMonth + 1;
              const newYear = newMonth > 11 ? currentYear + 1 : currentYear;
              const adjustedMonth = newMonth > 11 ? 0 : newMonth;
              setDate(new Date(newYear, adjustedMonth));
              onMonthChange?.(newYear, adjustedMonth);
            }}
          />
        </div>
      </div>
      <div className="flex">
        {WEEK.map((w) => (
          <div key={w} className="w-34 flex justify-center py-4 font-light">
            {w}
          </div>
        ))}
      </div>
      <div className="border-sub grid grid-cols-7 gap-0 border-[1px] border-b-0 border-r-0">
        {formattedDay.map((d, index) => {
          const isCurrentMonth =
            d !== '' &&
            index >= firstWeek.length &&
            index < firstWeek.length + wholeDay.length;
          const dayKey = isCurrentMonth ? String(d) : '';
          const schedules =
            isCurrentMonth && data && data[dayKey] ? data[dayKey] : [];

          return (
            <div
              key={index}
              className="h-26 border-sub box-border w-40 cursor-pointer border-b-[1px] border-r-[1px] p-3 font-light"
            >
              <div
                className={cn(
                  d === selectedDay && 'bg-sub',
                  'hover:bg-sub/70 grid size-8 place-items-center rounded-[50%]',
                )}
                onClick={() => {
                  if (isCurrentMonth) {
                    setDate(new Date(currentYear, currentMonth, d as number));
                  }
                }}
              >
                {d}
              </div>
              {/* 스케줄 표시 */}
              {isCurrentMonth && schedules.length > 0 && (
                <div className="mt-1 space-y-1">
                  {schedules.slice(0, 2).map((schedule, scheduleIndex) => (
                    <div
                      key={scheduleIndex}
                      className="truncate rounded px-1 py-0.5 text-xs text-white"
                      style={{ backgroundColor: schedule.color }}
                      title={schedule.title}
                    >
                      {schedule.title}
                    </div>
                  ))}
                  {schedules.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{schedules.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
