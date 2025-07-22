import React from 'react';

import {
  RoomButtons,
  BoardContainer,
  PlanContainer,
  ShareLinkContainer,
} from '~/widgets/project/ui';

export default function ProjectMenuContainer() {
  return (
    <div className="flex h-fit w-full flex-col">
      <div className="border-lock mb-10 h-fit border-b-[2px]" />
      <div className="flex flex-wrap gap-6">
        <RoomButtons />
        <BoardContainer />
        <PlanContainer />
        <ShareLinkContainer />
      </div>
    </div>
  );
}
