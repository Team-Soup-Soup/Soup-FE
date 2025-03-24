import React, { type Dispatch, type SetStateAction } from 'react';

import { cn } from '@soup/utils';

import ChevronRight from '~/assets/icons/chevron-right.svg';
import ChevronLeft from '~/assets/icons/chevron-left.svg';
import { WEEK } from '~/shared/constants';

interface ScheduleCalendarProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export default function ScheduleCalendar({
  date,
  setDate,
}: ScheduleCalendarProps) {
  const currentYear = date.getFullYear();
  let currentMonth = date.getMonth();

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
              currentMonth = currentMonth - 1;
              setDate(new Date(currentYear, currentMonth));
            }}
          />
          {currentYear}년 {currentMonth + 1}월
          <img
            src={ChevronRight}
            className="cursor-pointer"
            onClick={() => setDate(new Date(currentYear, currentMonth + 1))}
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
        {formattedDay.map((d) => (
          <div className="h-26 border-sub box-border w-40 cursor-pointer border-b-[1px] border-r-[1px] p-3 font-light">
            <div
              className={cn(
                d === selectedDay && 'bg-sub',
                'hover:bg-sub/70 grid size-8 place-items-center rounded-[50%]',
              )}
              onClick={() =>
                setDate(new Date(currentYear, currentMonth, d as number))
              }
            >
              {d}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
