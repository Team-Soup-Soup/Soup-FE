import React, { useState } from 'react';

import { Button } from '@soup/design-system';

import { ScheduleCalendar, ScheduleItem } from '~/features/project-schedule/ui';
import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';
import { CreateScheduleModal } from '~/features/project-schedule/ui';
import { DeleteModal } from '~/shared/ui';

export default function EntireSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { openModal } = useModal();
  const handleButtonClick = () => {
    openModal(MODAL.CREATE_SCHEDULE);
  };

  return (
    <>
      <div className="flex h-fit w-full flex-shrink-0 flex-col gap-y-4 overflow-hidden">
        <p className="text-lg font-semibold">전체 일정</p>
        <div className="flex flex-1 flex-wrap gap-4">
          <div className="border-main-board-border rounded-20 grid min-w-[1012px] flex-1 place-items-center border-[1px]">
            <ScheduleCalendar date={selectedDate} setDate={setSelectedDate} />
          </div>
          <div className="min-w-140 border-main-board-border rounded-20 box-border flex-1 border-[1px] px-6 py-5">
            <div className="mb-5 flex w-full justify-between">
              <span className="text-lg">{selectedDate.getDate()}일</span>
              <Button
                color="normal"
                className="focus:outline-none"
                onClick={handleButtonClick}
              >
                일정 추가하기
              </Button>
            </div>
            <div className="flex flex-col gap-y-3">
              <ScheduleItem />
              <ScheduleItem />
              <ScheduleItem />
            </div>
          </div>
        </div>
      </div>
      <CreateScheduleModal />
      <DeleteModal />
    </>
  );
}
