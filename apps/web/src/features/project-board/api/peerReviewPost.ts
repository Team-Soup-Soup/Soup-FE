import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userPost } from '~/shared/api';
import { PeerReviewPostRequest } from '~/features/project-board/types';

const submitPeerReviewPost = async (data: PeerReviewPostRequest) => {
  await userPost<PeerReviewPostRequest>({
    request: BOARD_REQUEST.PEER_REVIEW_POST,
    data: data,
  });
};

export const useSubmitPeerReviewPost = () => {
  return useMutation({
    mutationFn: submitPeerReviewPost,
  });
};
