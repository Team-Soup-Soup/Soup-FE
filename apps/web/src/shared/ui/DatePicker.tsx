import React, { useState, type Dispatch, type SetStateAction } from 'react';

import { Calendar } from '@natscale/react-calendar';

import { cn } from '@soup/utils';

import '~/shared/style';
import { getDate } from '../utils';

interface DatePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  label?: string;
  dateFormat?: string;
}

export default function DatePicker({
  date,
  setDate,
  label,
  dateFormat = 'YYYY. MM. DD',
}: DatePickerProps) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-x-6">
      {label && <span>{label}</span>}
      <span
        className={cn(
          visible && 'border-point',
          'hover:border-point border-main-board-border rounded-auth relative w-fit cursor-pointer border-[1px] bg-white px-5 py-2',
        )}
        onClick={() => setVisible((prev) => !prev)}
      >
        {getDate(date.toLocaleDateString(), dateFormat)}
        {visible && (
          <div className="box-shadow-4 rounded-auth border-main-board-border top-13 h-70 w-70 absolute left-0 z-30 border-[1px] bg-white px-4 py-4">
            <div className="h-fit">
              <p className="text-md text-center font-light">
                {getDate(date.toDateString(), 'YYYY년 MM월')}
              </p>
              <Calendar
                value={date}
                onChange={(date) => setDate(date as Date)}
              />
            </div>
          </div>
        )}
      </span>
    </div>
  );
}
