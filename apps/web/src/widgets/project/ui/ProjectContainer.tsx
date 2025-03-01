import React from 'react';
import {
  GroupBoardContainer,
  ProjectHeader,
  ProjectMenu,
} from '~/widgets/project/ui';

export default function ProjectContainer() {
  return (
    <div className="h-full overflow-scroll">
      <ProjectHeader />
      <ProjectMenu />
      <GroupBoardContainer />
    </div>
  );
}
