import { BOARD_REQUEST, userPost } from '~/shared/api';
import { VotePostRequest } from '../types';
import { useMutation } from '@tanstack/react-query';

const submitVotePost = async (data: VotePostRequest) => {
  await userPost<VotePostRequest>({
    request: BOARD_REQUEST.VOTE_POST,
    data: data,
  });
};

export const useSubmitVotePost = () => {
  return useMutation({
    mutationFn: submitVotePost,
  });
};
