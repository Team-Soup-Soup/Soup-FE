export type Schedule = {
  scheduleId: number;
  startDate: string;
  endDate: string;
  title: string;
  content: string;
  color: string;
  createBy: string;
  routhinCycle: string;
  routhinValue: string;
  createAt: string;
};

export interface FetchScheduleResponse {
  month: string;
  schedules: {
    [key: string]: Schedule[];
  };
}

export type PostSchedule = Omit<
  Schedule,
  'scheduleId' | 'createAt' | 'createBy' | 'endDate' | 'startDate'
> & { endDt: string; startDt: string; projectId: number };
