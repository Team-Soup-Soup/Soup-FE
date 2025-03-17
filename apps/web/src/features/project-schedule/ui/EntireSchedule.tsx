import React, { Dispatch, SetStateAction, useState } from 'react';

import { cn } from '@soup/utils';
import { Button } from '@soup/design-system';

import ChevronRight from '~/assets/icons/chevron-right.svg';
import ChevronLeft from '~/assets/icons/chevron-left.svg';

export default function EntireSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <div className="flex h-fit w-full flex-col gap-y-4 overflow-hidden">
      <p className="text-lg font-semibold">전체 일정</p>
      <div className="flex flex-1 flex-wrap gap-x-4">
        <div className="w-253 border-main-board-border rounded-20 grid h-full place-items-center border-[1px]">
          <Calendar date={selectedDate} setDate={setSelectedDate} />
        </div>
        <div className="min-w-140 border-main-board-border rounded-20 box-border flex-1 border-[1px] px-6 py-5">
          <div className="mb-5 flex w-full justify-between">
            <span className="text-lg">{selectedDate.getDate()}일</span>
            <Button color="normal">일정 추가하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Calendar = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  const currentYear = date.getFullYear();
  let currentMonth = date.getMonth();

  const dayCnt = new Date(currentYear, currentMonth + 1, 0).getDate();

  const week = ['일', '월', '화', '수', '목', '금', '토'];

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
        {week.map((w) => (
          <div key={w} className="w-34 flex justify-center py-4 font-light">
            {w}
          </div>
        ))}
      </div>
      <div className="border-sub grid grid-cols-7 gap-0 border-[1px] border-b-0 border-r-0">
        {formattedDay.map((d) => (
          <div className="h-26 border-sub w-34 box-border cursor-pointer border-b-[1px] border-r-[1px] p-3 font-light">
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
};
