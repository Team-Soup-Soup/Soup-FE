import { useParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userPost } from '~/shared/api';
import { useFetchProjectBoardList } from '~/widgets/project/api';
import { PeerReviewPostRequest } from '~/features/project-board/types';

const submitPeerReviewPost = async (data: PeerReviewPostRequest) => {
  await userPost<PeerReviewPostRequest>({
    request: BOARD_REQUEST.PEER_REVIEW_POST,
    data: data,
  });
};

export const useSubmitPeerReviewPost = () => {
  const { projectId } = useParams();
  const { refetch } = useFetchProjectBoardList({ projectId: projectId! });

  return useMutation<unknown, unknown, PeerReviewPostRequest>({
    mutationFn: submitPeerReviewPost,
    onSuccess: () => refetch(),
  });
};
