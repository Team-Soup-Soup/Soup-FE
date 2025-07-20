import React from 'react';
import { EntireSchedule, EntireTodo } from '~/features/project-schedule/ui';
import { Breadcrumb } from '~/shared/ui';
import { FetchScheduleResponse } from '~/shared/types';

interface ScheduleContainerProps {
  data: FetchScheduleResponse;
}

export default function ScheduleContainer({ data }: ScheduleContainerProps) {
  return (
    <div className="scrollbar-hide relative flex size-full flex-col overflow-scroll">
      <Breadcrumb />
      <div className="scrollbar-hide gap-y-15 pt-30 flex w-full flex-col overflow-scroll px-10">
        <EntireSchedule data={data} />
        <EntireTodo />
      </div>
    </div>
  );
}
