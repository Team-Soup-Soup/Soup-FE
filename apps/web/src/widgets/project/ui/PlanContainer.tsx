import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Calendar } from '@natscale/react-calendar';
import '@natscale/react-calendar/dist/main.css';
import '~/widgets/project/style';

import { DAY, PATH } from '~/shared/constants';
import { getPath } from '~/shared/utils';

export default function PlanContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="rounded-auth border-main-board-border box-shadow-4 h-menu-height mt-6 flex min-w-[450px] flex-1 flex-col border-[1px] px-6 py-4 xl:mt-0">
      <div className="mb-4 flex items-center justify-between font-light">
        <span className="text-md">일정</span>
        <span
          className="text-light hover:text-dark cursor-pointer"
          onClick={() => navigate(getPath(location.pathname, PATH.SCHEDULE))}
        >
          더보기 &gt;&gt;
        </span>
      </div>
      <div className="flex h-[80%] w-full justify-between">
        <ToDoSection />
        <CalendarSection />
      </div>
    </div>
  );
}

function ToDoSection() {
  const date = new Date().getDate();
  const day = new Date().getDay();

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-x-2">
        <span className="text-2xl font-extrabold">{date}</span>
        <span className="font-light">{DAY[day]}</span>
      </div>
      <div className="text-md mt-4 flex size-full gap-x-6 font-light">
        <div className="flex flex-col gap-y-1">
          <p className="text-light">오늘의 할일</p>
          <p>0개</p>
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-light">오늘 할일 마감</p>
          <p>0개</p>
        </div>
      </div>
      <div className="mt-6 flex size-full items-center justify-center font-light">
        <span className="text-light">오늘은 일정이 없습니다</span>
      </div>
    </div>
  );
}

function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const month = new Date().getMonth() + 1;
  return (
    <div className="flex h-full w-56 flex-col overflow-hidden md:ml-6 md:flex-1">
      <p className="text-md mb-2 pl-3 font-light md:pl-1">{month}월</p>
      <Calendar value={date} onChange={(date) => setDate(date as Date)} />
    </div>
  );
}
