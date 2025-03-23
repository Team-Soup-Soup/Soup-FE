import React, { useState } from 'react';

import { cn } from '@soup/utils';

import { WEEK } from '~/shared/constants';
import { DatePicker } from '~/shared/ui';

export default function RepeatOption() {}

function RepeatOptionWeek() {
  const [selectedDay, setSelectedDay] = useState('일');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="bg-lock rounded-auth flex h-fit w-full flex-col gap-y-8 p-6">
      <div className="flex gap-x-8 px-[10px]">
        {WEEK.map((day) => (
          <span
            key={day}
            className={cn(
              day === selectedDay && 'bg-point text-white',
              'hover:bg-point cursor-pointer rounded-sm p-1 px-2 transition duration-100 hover:text-white',
            )}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-y-4">
        <DatePicker
          key="repeatOptionWeek1"
          date={startDate}
          setDate={setStartDate}
          label="시작일"
        />
        <DatePicker
          key="repeatOptionWeek2"
          date={endDate}
          setDate={setEndDate}
          label="종료일"
        />
      </div>
    </div>
  );
}

function RepeatOptionMonth() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="bg-lock rounded-auth flex h-fit w-full flex-col gap-y-8 p-6">
      <div className="flex flex-col gap-y-4">
        <DatePicker
          key="repeatOptionMonth1"
          date={date}
          setDate={setDate}
          dateFormat="DD일"
          label="반복일"
        />
        <div className="flex items-center gap-x-6">
          기간
          <div className="flex items-center gap-x-4">
            <DatePicker
              key="repeatOptionMonth2"
              date={startDate}
              setDate={setStartDate}
              dateFormat="YYYY년 MM월"
            />
            -
            <DatePicker
              key="repeatOptionMonth3"
              date={endDate}
              setDate={setEndDate}
              dateFormat="YYYY년 MM월"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RepeatOptionYear() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="bg-lock rounded-auth flex h-fit w-full flex-col gap-y-8 p-6">
      <div className="flex flex-col gap-y-4">
        <DatePicker
          key="repeatOptionYear1"
          label="반복일"
          date={date}
          setDate={setDate}
          dateFormat="MM월 DD일"
        />
        <div className="flex items-center gap-x-6">
          기간
          <div className="flex items-center gap-x-4">
            <DatePicker
              key="repeatOptionYear2"
              date={startDate}
              setDate={setStartDate}
              dateFormat="YYYY년"
            />
            -
            <DatePicker
              key="repeatOptionYear3"
              date={endDate}
              setDate={setEndDate}
              dateFormat="YYYY년"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

RepeatOption.Week = RepeatOptionWeek;
RepeatOption.Month = RepeatOptionMonth;
RepeatOption.Year = RepeatOptionYear;
