import React from 'react';
import { Project } from '~/shared/types';
import {
  GroupBoardSection,
  ProjectHeader,
  ProjectMenuContainer,
} from '~/widgets/project/ui';

export default function ProjectContainer({ description, name }: Project) {
  return (
    <div className="scrollbar-hide h-full overflow-scroll">
      <ProjectHeader description={description} name={name} />
      <ProjectMenuContainer />
      <GroupBoardSection />
    </div>
  );
}
