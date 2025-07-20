import { useMutation } from '@tanstack/react-query';
import { SCHEDULE_REQUEST, userPost } from '~/shared/api';
import { PostSchedule } from '~/shared/types';

const submitNewSchedule = async (schedule: PostSchedule) => {
  const response = await userPost({
    request: SCHEDULE_REQUEST.SCHEDULE,
    data: schedule,
  });
  return response.data;
};

export const useSubmitNewSchedule = () => {
  return useMutation({
    mutationFn: submitNewSchedule,
  });
};
