import React from 'react';
import { EntireSchedule, EntireTodo } from '~/features/project-schedule/ui';
import { Breadcrumb } from '~/shared/ui';

export default function ScheduleContainer() {
  return (
    <div className="scrollbar-hide relative flex size-full flex-col overflow-scroll">
      <Breadcrumb />
      <div className="scrollbar-hide gap-y-15 pt-30 flex w-full flex-col overflow-scroll px-10">
        <EntireSchedule />
        <EntireTodo />
      </div>
    </div>
  );
}
