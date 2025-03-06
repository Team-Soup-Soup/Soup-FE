import React from 'react';
import { ProjectBoard } from '~/features/project-board/ui';

export default function ProjectBoardContainer() {
  return (
    <div className="relative flex size-full flex-col">
      <ProjectBoardHeader />
      <ProjectBoard />
    </div>
  );
}

function ProjectBoardHeader() {
  return (
    <div className="absolute top-0 w-full px-8 py-5">
      <div className="text-light flex items-center gap-x-2">
        <span
          className="hover:text-dark hover:bg-main-board-border/30 cursor-pointer rounded-md p-1 px-2 transition duration-100 ease-in-out"
          onClick={() => window.history.back()}
        >
          메인보드
        </span>
        /
        <span className="hover:text-dark hover:bg-main-board-border/30 cursor-pointer rounded-md p-1 px-2 transition duration-100 ease-in-out">
          게시판
        </span>
      </div>
    </div>
  );
}
