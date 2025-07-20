import React from 'react';

import { Checkbox } from '@soup/design-system';

export default function EntireTodo() {
  return (
    <div className="mb-15 flex h-fit w-full flex-col gap-y-3">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold">할일 리스트</p>
        <div className="mr-10 flex gap-x-6">
          <Checkbox id="whole" label="전체" />
          <Checkbox id="pm" label="기획자" />
          <Checkbox id="dev" label="개발자" />
          <Checkbox id="dev" label="발표원정대" />
        </div>
      </div>
      <GroupTodo group="기획자" />
      <GroupTodo group="개발자" />
      <GroupTodo group="발표원정대" />
    </div>
  );
}

const GroupTodo = ({ group }: { group: string }) => (
  <div className="gap-y-15 flex flex-col px-10 py-5">
    <div className="h-65 flex w-full flex-col gap-y-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-lg font-normal">{group}</span>
        <span className="text-light hover:text-dark cursor-pointer text-sm font-light">
          더보기 &gt;&gt;
        </span>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="w-100 bg-notice-section h-2 rounded-[25px]" />
        <span>100%</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TodoCard /> <TodoCard /> <TodoCard /> <TodoCard />
      </div>
    </div>
  </div>
);

const TodoCard = () => (
  <div className="border-main-board-border grid h-20 w-full grid-cols-[1fr_4fr_1fr] gap-3 rounded-[8px] border-[1px]">
    <div className="flex h-full w-fit items-center pl-3">
      <div className="w-18 bg-point flex h-8 items-center justify-center rounded-[8px] text-white">
        D-Day
      </div>
    </div>
    <div className="flex flex-col justify-center font-light">
      <span className="text-md">IA</span>
      <span className="text-light text-md">일정보드</span>
    </div>
  </div>
);
