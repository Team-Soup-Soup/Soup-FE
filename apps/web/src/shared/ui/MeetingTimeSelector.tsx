import React from 'react';

import { cn } from '@soup/utils';

export default function MeetingTimeSelector() {
  const HOURS = Array.from({ length: 17 }, (_, i) => `${i + 8}:00`);
  const DAYS = ['', '일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <div className="grid h-full grid-cols-8">
        {DAYS.map((day, index) => (
          <div
            key={day}
            className={cn(
              'p-2 text-center',
              index > 0 && 'bg-lock border-main-board-border border-[1px]',
              index === DAYS.length - 1 && 'rounded-tr-auth',
              index === 1 && 'rounded-tl-auth',
            )}
          >
            {day}
          </div>
        ))}
        {HOURS.map((hour) => (
          <React.Fragment key={hour}>
            <div className="flex items-start justify-start">{hour}</div>
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="border-main-board-border flex h-10 flex-col border-[1px]"
              >
                <div className="border-main-board-border/40 flex-1 border-b-[0.5px]" />
                <div className="flex-1" />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
