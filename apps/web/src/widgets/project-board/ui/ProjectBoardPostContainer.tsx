import React from 'react';
import { ProjectPost } from '~/features/project-board/ui';

export default function ProjectBoardPostContainer() {
  return (
    <div className="relative flex size-full flex-col">
      <ProjectBoardPostHeader />
      <ProjectPost />
    </div>
  );
}

function ProjectBoardPostHeader() {
  return (
    <div className="absolute top-0 w-full px-8 py-5">
      <div className="text-light flex items-center gap-x-2">
        <span className="hover:text-dark hover:bg-main-board-border/30 cursor-pointer rounded-md p-1 px-2 transition duration-100 ease-in-out">
          메인보드
        </span>
        /
        <span
          className="hover:text-dark hover:bg-main-board-border/30 cursor-pointer rounded-md p-1 px-2 transition duration-100 ease-in-out"
          onClick={() => window.history.back()}
        >
          게시판
        </span>
        /
        <span className="hover:text-dark hover:bg-main-board-border/30 cursor-pointer rounded-md p-1 px-2 transition duration-100 ease-in-out">
          게시글
        </span>
      </div>
    </div>
  );
}
