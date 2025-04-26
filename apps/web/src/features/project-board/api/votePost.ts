import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userPost } from '~/shared/api';
import {
  VoteOptionRequest,
  VoteParticipationRequest,
  VotePostRequest,
} from '~/features/project-board/types';
import { useFetchProjectBoardList } from '~/widgets/project/api';
import { useFetchPostDetail } from './postDetail';
import { getPath } from '~/shared/utils';

const submitVotePost = async (data: VotePostRequest) => {
  await userPost<VotePostRequest>({
    request: BOARD_REQUEST.VOTE_POST,
    data: data,
  });
};

const submitVoteOption = async (data: VoteOptionRequest) => {
  await userPost<VoteOptionRequest>({
    request: BOARD_REQUEST.VOTE_OPTION,
    data: data,
  });
};

const submitVoteParticipation = async ({
  voteId,
  voteSeq,
}: {
  voteId: number;
  voteSeq: number;
}) => {
  await userPost<VoteParticipationRequest>({
    request: getPath(BOARD_REQUEST.VOTE_POST, `${voteId}`),
    data: { voteSeq: voteSeq },
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

export const useSubmitVoteOption = () => {
  const { postId } = useParams();
  const { refetch } = useFetchPostDetail(postId!);

  return useMutation({
    mutationFn: submitVoteOption,
    onSuccess: () => refetch(),
  });
};

export const useSubmitVoteParticipation = () => {
  return useMutation({
    mutationFn: submitVoteParticipation,
    onSuccess: () => alert('참여 완료!'),
    onError: (e) => alert(e.message),
  });
};
