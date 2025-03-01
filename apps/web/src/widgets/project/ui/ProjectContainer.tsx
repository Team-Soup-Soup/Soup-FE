import React from 'react';
import {
  GroupBoardContainer,
  ProjectHeader,
  ProjectMenuContainer,
} from '~/widgets/project/ui';

export default function ProjectContainer() {
  return (
    <div className="scrollbar-hide h-full overflow-scroll">
      <ProjectHeader />
      <ProjectMenuContainer />
      <GroupBoardContainer />
    </div>
  );
}
