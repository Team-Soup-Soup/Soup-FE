import React from 'react';
import { ProjectBoard } from '~/features/project-board/ui';
import { LocationHeader } from '~/shared/ui';

export default function ProjectBoardContainer() {
  return (
    <div className="relative flex size-full flex-col">
      <LocationHeader />
      <ProjectBoard />
    </div>
  );
}
