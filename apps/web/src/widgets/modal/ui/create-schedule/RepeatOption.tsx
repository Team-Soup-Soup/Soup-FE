import React, { useState } from 'react';

import { cn } from '@soup/utils';

import { WEEK } from '~/shared/constants';
import { DatePicker } from '~/shared/ui';
import { getDate } from '~/shared/utils';

export default function RepeatOption() {}

function RepeatOptionWeek() {
  const [visible, setVisible] = useState<{ start: boolean; end: boolean }>({
    start: false,
    end: false,
  });
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
        <div className="flex items-center gap-x-6">
          시작일
          <span
            className={cn(
              visible.start && 'border-point',
              'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
            )}
            onClick={() =>
              setVisible((prev) => ({ end: false, start: !prev.start }))
            }
          >
            {getDate(startDate.toLocaleDateString(), 'YYYY. MM. DD')}
            {visible.start && (
              <DatePicker date={startDate} setDate={setStartDate} />
            )}
          </span>
        </div>
        <div className="flex items-center gap-x-6">
          종료일
          <span
            className={cn(
              visible.end && 'border-point',
              'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
            )}
            onClick={() =>
              setVisible((prev) => ({ start: false, end: !prev.end }))
            }
          >
            {getDate(endDate.toLocaleDateString(), 'YYYY. MM. DD')}
            {visible.end && <DatePicker date={endDate} setDate={setEndDate} />}
          </span>
        </div>
      </div>
    </div>
  );
}

function RepeatOptionMonth() {
  const [visible, setVisible] = useState<{ start: boolean; end: boolean }>({
    start: false,
    end: false,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="bg-lock rounded-auth flex h-fit w-full flex-col gap-y-8 p-6">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-6">
          반복일
          <span
            className={cn(
              visible.start && 'border-point',
              'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
            )}
            onClick={() =>
              setVisible((prev) => ({ end: false, start: !prev.start }))
            }
          >
            {getDate(startDate.toLocaleDateString(), 'DD일')}
            {visible.start && (
              <DatePicker date={startDate} setDate={setStartDate} />
            )}
          </span>
        </div>
        <div className="flex items-center gap-x-6">
          기간
          <div className="flex items-center gap-x-4">
            <span
              className={cn(
                visible.end && 'border-point',
                'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
              )}
              onClick={() =>
                setVisible((prev) => ({ start: false, end: !prev.end }))
              }
            >
              {getDate(endDate.toLocaleDateString(), 'YYYY년 MM월')}
              {visible.end && (
                <DatePicker date={endDate} setDate={setEndDate} />
              )}
            </span>
            -
            <span
              className={cn(
                visible.end && 'border-point',
                'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
              )}
              onClick={() =>
                setVisible((prev) => ({ start: false, end: !prev.end }))
              }
            >
              {getDate(endDate.toLocaleDateString(), 'YYYY년 MM월')}
              {visible.end && (
                <DatePicker date={endDate} setDate={setEndDate} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RepeatOptionYear() {
  const [visible, setVisible] = useState<{ start: boolean; end: boolean }>({
    start: false,
    end: false,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="bg-lock rounded-auth flex h-fit w-full flex-col gap-y-8 p-6">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-6">
          시작일
          <span
            className={cn(
              visible.start && 'border-point',
              'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
            )}
            onClick={() =>
              setVisible((prev) => ({ end: false, start: !prev.start }))
            }
          >
            {getDate(startDate.toLocaleDateString(), 'MM월 DD일')}
            {visible.start && (
              <DatePicker date={startDate} setDate={setStartDate} />
            )}
          </span>
        </div>
        <div className="flex items-center gap-x-6">
          기간
          <div className="flex items-center gap-x-4">
            <span
              className={cn(
                visible.end && 'border-point',
                'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
              )}
              onClick={() =>
                setVisible((prev) => ({ start: false, end: !prev.end }))
              }
            >
              {getDate(endDate.toLocaleDateString(), 'YYYY년')}
              {visible.end && (
                <DatePicker date={endDate} setDate={setEndDate} />
              )}
            </span>
            -
            <span
              className={cn(
                visible.end && 'border-point',
                'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
              )}
              onClick={() =>
                setVisible((prev) => ({ start: false, end: !prev.end }))
              }
            >
              {getDate(endDate.toLocaleDateString(), 'YYYY년')}
              {visible.end && (
                <DatePicker date={endDate} setDate={setEndDate} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

RepeatOption.Week = RepeatOptionWeek;
RepeatOption.Month = RepeatOptionMonth;
RepeatOption.Year = RepeatOptionYear;
