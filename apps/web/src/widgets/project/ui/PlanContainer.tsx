import React from 'react';

export default function PlanContainer() {
  return (
    <div className="rounded-auth border-main-board-border box-shadow-4 h-menu-height flex min-w-[400px] flex-1 flex-col border-[1px] px-6 py-4">
      <div className="mb-2 flex justify-between font-light">
        <span>일정</span>
        <span className="text-light cursor-pointer">더보기 &gt;&gt;</span>
      </div>
    </div>
  );
}
