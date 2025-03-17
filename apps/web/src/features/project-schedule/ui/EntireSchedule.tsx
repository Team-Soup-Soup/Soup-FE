import React, { useState } from 'react';

import { Button } from '@soup/design-system';

import { ScheduleCalendar } from '~/features/project-schedule/ui';

export default function EntireSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <div className="flex h-fit w-full flex-shrink-0 flex-col gap-y-4 overflow-hidden">
      <p className="text-lg font-semibold">전체 일정</p>
      <div className="flex flex-1 flex-wrap gap-x-4">
        <div className="w-253 border-main-board-border rounded-20 grid h-full place-items-center border-[1px]">
          <ScheduleCalendar date={selectedDate} setDate={setSelectedDate} />
        </div>
        <div className="min-w-140 border-main-board-border rounded-20 box-border flex-1 border-[1px] px-6 py-5">
          <div className="mb-5 flex w-full justify-between">
            <span className="text-lg">{selectedDate.getDate()}일</span>
            <Button color="normal">일정 추가하기</Button>
          </div>
          <div className="flex flex-col gap-y-3">
            <ScheduleItem />
            <ScheduleItem />
            <ScheduleItem />
          </div>
        </div>
      </div>
    </div>
  );
}

const ScheduleItem = () => (
  <div className="border-main-board-border h-11 w-full cursor-pointer rounded-[8px] border-[1px] bg-red-300/20"></div>
);
