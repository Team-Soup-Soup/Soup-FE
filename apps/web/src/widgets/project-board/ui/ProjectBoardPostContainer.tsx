import React from 'react';
import { ProjectPost } from '~/features/project-board/ui';
import { LocationHeader } from '~/shared/ui';

export default function ProjectBoardPostContainer() {
  return (
    <div className="relative flex size-full flex-col">
      <LocationHeader />
      <ProjectPost />
    </div>
  );
}
