import { useQuery } from '@tanstack/react-query';
import { SCHEDULE_REQUEST, userGet } from '~/shared/api';
import { FetchScheduleResponse } from '../types';

export const fetchSchedule = async (projectId: string, date: string) => {
  const response = await userGet<FetchScheduleResponse>({
    request: SCHEDULE_REQUEST.SCHEDULE,
    params: {
      projectId: projectId,
      date: date,
    },
  });
  return response.data;
};

export const useFetchSchedule = (projectId: string, date: string) => {
  return useQuery({
    queryKey: ['schedule', projectId, date],
    queryFn: () => fetchSchedule(projectId, date),
  });
};
