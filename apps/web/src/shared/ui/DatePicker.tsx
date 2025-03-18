import React, { type Dispatch, type SetStateAction } from 'react';
import '~/shared/style';
import { Calendar } from '@natscale/react-calendar';
import { getDate } from '../utils';

interface DatePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <div className="box-shadow-4 rounded-auth border-main-board-border top-13 h-70 w-70 absolute left-0 z-30 border-[1px] bg-white px-4 py-4">
      <div className="h-fit">
        <p className="text-md text-center font-light">
          {getDate(date.toDateString(), 'YYYY년 M월')}
        </p>
        <Calendar value={date} onChange={(date) => setDate(date as Date)} />
      </div>
    </div>
  );
}
