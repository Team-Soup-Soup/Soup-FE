import React from 'react';
import {
  GroupBoardSection,
  ProjectHeader,
  ProjectMenuContainer,
} from '~/widgets/project/ui';

export default function ProjectContainer() {
  return (
    <div className="scrollbar-hide h-full overflow-scroll">
      <ProjectHeader />
      <ProjectMenuContainer />
      <GroupBoardSection />
    </div>
  );
}
