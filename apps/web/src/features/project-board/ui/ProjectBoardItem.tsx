import { cn } from '@soup/utils';
import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { BOARD } from '~/shared/constants';
import type { BoardContent } from '~/shared/types';
import { getDate, getPath } from '~/shared/utils';

export default function ProjectBoardItem({
  postId,
  category,
  title,
  createBy,
  createAt,
  commentCnt,
}: BoardContent) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'hover:bg-hover rounded-auth border-main-board-border text-md box-shadow-4 grid h-14 w-full cursor-pointer grid-cols-[1fr_8fr_1fr_1fr_1fr] items-center gap-x-8 overflow-hidden border-[1px] px-6 py-[10px] font-light',
      )}
      onClick={() =>
        navigate(getPath(location.pathname.split('/search')[0], `${postId}`))
      }
    >
      <div
        className="w-25 text-nowrap rounded-[4px] px-[10px] py-0.5 text-center"
        style={{ backgroundColor: `${BOARD[category].color}` }}
      >
        {BOARD[category].title}
      </div>
      <div className="min-w-23 overflow-hidden text-ellipsis text-nowrap px-[10px] py-1 text-start">
        {title}
      </div>
      <div className="text-light text-nowrap px-[10px] py-1 text-center text-sm">
        {createBy}
      </div>
      <div className="text-light text-nowrap px-[10px] py-1 text-center text-sm">
        {getDate(createAt, 'YYYY.MM.DD')}
      </div>
      <div className="text-light px-[10px] py-1 text-center text-sm">
        {commentCnt}
      </div>
    </div>
  );
}
