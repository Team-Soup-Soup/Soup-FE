import React, { useState } from 'react';

import { Button } from '@soup/design-system';

import { ScheduleCalendar } from '~/features/project-schedule/ui';
import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';
import { CreateScheduleModal } from '~/widgets/modal/ui';

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
        <div className="flex flex-1 flex-wrap gap-x-4">
          <div className="w-253 border-main-board-border rounded-20 grid h-full place-items-center border-[1px]">
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
    </>
  );
}

const ScheduleItem = () => (
  <div className="collapse-arrow border-main-board-border collapse w-full cursor-pointer rounded-[8px] border-[1px] bg-red-300/20">
    <input type="radio" name="my-accordion-2" defaultChecked />
    <div className="collapse-title font-light">1차 와프</div>
    <div className="collapse-content bg-white">
      <div className="flex flex-col pt-4">
        <div className="flex items-center pt-4">
          줌회의
          <br />
          URL: ASD7-w386-df39
        </div>
        <div className="flex w-full items-center justify-end">
          <div className="flex gap-x-2">
            <span className="hover:bg-lock cursor-pointer rounded-sm px-2 py-1">
              수정
            </span>
            <span className="hover:bg-lock cursor-pointer rounded-sm px-2 py-1">
              삭제
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
