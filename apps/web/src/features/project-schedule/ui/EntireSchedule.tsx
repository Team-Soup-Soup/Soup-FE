import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@soup/design-system';

import { ScheduleCalendar, ScheduleItem } from '~/features/project-schedule/ui';
import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';
import { CreateScheduleModal } from '~/features/project-schedule/ui';
import { DeleteModal, LoadingPage } from '~/shared/ui';
import { FetchScheduleResponse } from '~/shared/types';
import { useFetchSchedule } from '~/shared/utils/fetchSchedule';
import { getDate } from '~/shared/utils';

interface EntireScheduleProps {
  data: FetchScheduleResponse;
}

export default function EntireSchedule({ data }: EntireScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentData, setCurrentData] = useState<FetchScheduleResponse>(data);
  const { projectId } = useParams();
  const { openModal } = useModal();

  const handleButtonClick = () => {
    openModal(MODAL.CREATE_SCHEDULE);
  };

  // 월이 변경될 때마다 새로운 데이터 fetch
  const currentMonthKey = getDate(selectedDate.toISOString(), 'YYYY-MM');
  const { data: fetchedData, isLoading } = useFetchSchedule(
    projectId!,
    currentMonthKey,
  );

  useEffect(() => {
    if (fetchedData && !isLoading) {
      setCurrentData(fetchedData);
    }
  }, [fetchedData, isLoading]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="flex h-fit w-full flex-shrink-0 flex-col gap-y-4 overflow-hidden">
        <p className="text-lg font-semibold">전체 일정</p>
        <div className="flex flex-1 flex-wrap gap-4">
          <div className="border-main-board-border rounded-20 grid min-w-[1012px] flex-1 place-items-center border-[1px]">
            <ScheduleCalendar
              data={currentData.schedules}
              date={selectedDate}
              setDate={setSelectedDate}
              onMonthChange={(year, month) => {
                setSelectedDate(new Date(year, month));
              }}
            />
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
              {currentData.schedules[
                getDate(selectedDate.toISOString(), 'D')
              ] ? (
                currentData.schedules[
                  getDate(selectedDate.toISOString(), 'D')
                ].map((schedule) => (
                  <ScheduleItem key={schedule.scheduleId} schedule={schedule} />
                ))
              ) : (
                <div className="text-center text-lg font-light">
                  일정이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <CreateScheduleModal />
      <DeleteModal />
    </>
  );
}
