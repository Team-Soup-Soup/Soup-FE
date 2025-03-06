import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { COLOR } from '~/shared/constants';
import { BoardContent, BoardItemValue } from '~/shared/types';
import { getPath } from '~/shared/utils';

// interface ProjectBoardItemProps {}

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
      className="rounded-auth border-main-board-border text-md flex h-14 w-full cursor-pointer items-center gap-x-8 border-[1px] px-6 py-[10px] font-light"
      onClick={() => navigate(getPath(location.pathname, `/${postId}`))}
    >
      <div
        className="w-25 text-nowrap px-[10px] py-1 text-center"
        style={{ backgroundColor: `${COLOR[category as BoardItemValue]}` }}
      >
        {category}
      </div>
      <div className="flex-1 text-ellipsis text-nowrap px-[10px] py-1 text-start">
        {title}
      </div>
      <div className="w-23 text-light text-nowrap px-[10px] py-1 text-center text-sm">
        {createBy}
      </div>
      <div className="w-23 text-light text-nowrap px-[10px] py-1 text-center text-sm">
        {createAt.slice(0, 10)}
      </div>
      <div className="w-23 text-light px-[10px] py-1 text-center text-sm">
        {commentCnt}
      </div>
    </div>
  );
}
