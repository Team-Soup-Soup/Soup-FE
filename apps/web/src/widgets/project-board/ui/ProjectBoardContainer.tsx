import React from 'react';
import { ProjectBoard } from '~/features/project-board/ui';
import { Breadcrumb } from '~/shared/ui';

export default function ProjectBoardContainer() {
  return (
    <div className="relative flex size-full flex-col">
      <Breadcrumb />
      <ProjectBoard />
    </div>
  );
}
