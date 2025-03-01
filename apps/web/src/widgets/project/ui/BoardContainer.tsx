import React from 'react';

import { BoardItem } from '~/widgets/project/types';
import { BOARD, BOARD_LABEL } from '~/widgets/project/model';

export default function BoardContainer() {
  return (
    <div className="w-125 h-menu-height flex flex-col gap-y-4">
      <BoardView />
      <BoardButtons />
    </div>
  );
}

function BoardView() {
  return (
    <div className="rounded-auth border-main-board-border box-shadow-4 flex h-full flex-1 flex-col border-[1px] px-6 py-4">
      <div className="mb-2 flex justify-between font-light">
        <span>게시판</span>
        <span className="text-light cursor-pointer">더보기 &gt;&gt;</span>
      </div>
      <div className="size-full"></div>
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
