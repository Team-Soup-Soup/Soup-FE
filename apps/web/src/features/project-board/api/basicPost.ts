import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userPost } from '~/shared/api';
import { useFetchProjectBoardList } from '~/widgets/project/api';
import { BasicPostRequest } from '~/features/project-board/types';

const submitBasicPost = async (data: BasicPostRequest) => {
  await userPost<BasicPostRequest>({
    request: BOARD_REQUEST.BASIC_POST,
    data: data,
  });
};
export const useSubmitBasicPost = () => {
  const { projectId } = useParams();
  const { refetch } = useFetchProjectBoardList({ projectId: projectId! });

  return useMutation<unknown, unknown, BasicPostRequest>({
    mutationFn: submitBasicPost,
    onSuccess: () => refetch(),
  });
};
