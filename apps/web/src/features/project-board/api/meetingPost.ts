import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userPost } from '~/shared/api';
import { MeetingPostRequest } from '~/features/project-board/types';

const submitMeetingPost = async (data: MeetingPostRequest) => {
  await userPost<MeetingPostRequest>({
    request: BOARD_REQUEST.MEETING_POST,
    data: data,
  });
};

export const useSubmitMeetingPost = () => {
  return useMutation({
    mutationFn: submitMeetingPost,
  });
};
