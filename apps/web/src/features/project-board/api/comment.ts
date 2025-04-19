import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userPost } from '~/shared/api';
import { CommentRequestType } from '~/features/project-board/types';
import { useFetchPostDetail } from './postDetail';

const submitPostComment = async (data: CommentRequestType) => {
  await userPost<CommentRequestType>({
    request: BOARD_REQUEST.COMMENT,
    data: data,
  });
};

export const useSubmitPostComment = () => {
  const { postId } = useParams();
  const { refetch } = useFetchPostDetail(postId!);

  return useMutation({
    mutationFn: submitPostComment,
    onSuccess: () => refetch(),
  });
};
