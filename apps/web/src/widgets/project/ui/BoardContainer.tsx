import React from 'react';

import comments from '~/mocks/board.json';
import { BoardItem } from '~/widgets/project/types';
import { BOARD, BOARD_LABEL, COLOR } from '~/widgets/project/model';

export default function BoardContainer() {
  return (
    <div className="w-125 h-menu-height flex flex-col gap-y-4">
      <BoardView />
      <BoardButtons />
    </div>
  );
}

function BoardView() {
  const data = comments;
  return (
    <div className="rounded-auth border-main-board-border box-shadow-4 flex h-full flex-1 flex-col border-[1px] px-6 py-4">
      <div className="mb-4 flex items-center justify-between font-light">
        <span className="text-md">게시판</span>
        <span className="text-light cursor-pointer">더보기 &gt;&gt;</span>
      </div>
      <div className="flex size-full flex-col gap-y-[6px]">
        {data.slice(0, 4).map(({ postId, category, title, createAt }) => (
          <div
            className="text-md flex h-fit w-full justify-between gap-x-4 font-light"
            key={postId}
          >
            <div
              className="flex w-44 items-center justify-center text-nowrap py-[1px]"
              style={{ backgroundColor: `${COLOR[category]}` }}
            >
              {category}
            </div>
            <div className="w-full text-ellipsis text-nowrap">{title}</div>
            <div className="text-light flex">
              {createAt.slice(0, 10).split('-').join('.')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoardButtons() {
  return (
    <div className="flex h-10 gap-x-2">
      {BOARD_LABEL.map((label) => (
        <BoardButton label={label} key={label} />
      ))}
    </div>
  );
}

function BoardButton({ label }: { label: BoardItem }) {
  return (
    <button className="rounded-auth border-main-board-border box-shadow-4 flex h-full cursor-pointer gap-x-2 text-nowrap border-[1px] p-2 font-light">
      <img src={BOARD[label].icon} alt={label} />
      {BOARD[label].title}
    </button>
  );
}
