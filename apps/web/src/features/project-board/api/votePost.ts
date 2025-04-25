import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userPost } from '~/shared/api';
import { VotePostRequest } from '~/features/project-board/types';
import { useFetchProjectBoardList } from '~/widgets/project/api';

const submitVotePost = async (data: VotePostRequest) => {
  await userPost<VotePostRequest>({
    request: BOARD_REQUEST.VOTE_POST,
    data: data,
  });
};

export const useSubmitVotePost = () => {
  const { projectId } = useParams();
  const { refetch } = useFetchProjectBoardList({ projectId: projectId! });

  return useMutation({
    mutationFn: submitVotePost,
    onSuccess: () => refetch(),
  });
};
