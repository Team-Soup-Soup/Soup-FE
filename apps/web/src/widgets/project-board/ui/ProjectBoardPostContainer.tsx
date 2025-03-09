import React from 'react';
import { ProjectPost } from '~/features/project-board/ui';
import { Breadcrumb } from '~/shared/ui';

export default function ProjectBoardPostContainer() {
  return (
    <div className="relative flex size-full flex-col">
      <Breadcrumb />
      <ProjectPost />
    </div>
  );
}
