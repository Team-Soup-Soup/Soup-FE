import React from 'react';

import {
  RoomButtons,
  MenuHeader,
  BoardContainer,
  PlanContainer,
  ShareLinkContainer,
} from '~/widgets/project/ui';

export default function ProjectMenuContainer() {
  return (
    <div className="flex h-fit w-full flex-col">
      <MenuHeader />
      <div className="flex flex-wrap gap-x-6">
        <RoomButtons />
        <BoardContainer />
        <PlanContainer />
        <ShareLinkContainer />
      </div>
    </div>
  );
}
