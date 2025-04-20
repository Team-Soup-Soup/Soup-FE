import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userPost } from '~/shared/api';
import { useFetchProjectBoardList } from '~/widgets/project/api';
import { NoticePostRequest } from '~/features/project-board/types';

const submitNoticePost = async (data: NoticePostRequest) => {
  console.log('submitNoticePost', data);
  await userPost<NoticePostRequest>({
    request: BOARD_REQUEST.NOTICE_POST,
    data: data,
  });
};
export const useSubmitNoticePost = () => {
  const { projectId } = useParams();
  const { refetch } = useFetchProjectBoardList({ projectId: projectId! });

  return useMutation<unknown, unknown, NoticePostRequest>({
    mutationFn: submitNoticePost,
    onSuccess: () => refetch(),
  });
};
