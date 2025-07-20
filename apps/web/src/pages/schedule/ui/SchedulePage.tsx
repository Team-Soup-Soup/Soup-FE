import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ScheduleContainer } from '~/widgets/project-schedule/ui';

export default function SchedulePage() {
  const data = useLoaderData();
  return (
    <div className="size-full">
      <ScheduleContainer data={data} />
    </div>
  );
}
