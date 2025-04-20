import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userDelete, userPost } from '~/shared/api';
import { CommentRequestType } from '~/features/project-board/types';
import { useFetchPostDetail } from './postDetail';
import { getPath } from '~/shared/utils';

const submitPostComment = async (data: CommentRequestType) => {
  await userPost<CommentRequestType>({
    request: BOARD_REQUEST.COMMENT,
    data: data,
  });
};

const deletePostComment = async ({
  commentId,
  postId,
}: {
  commentId: number;
  postId: string;
}) => {
  await userDelete({
    request: getPath(BOARD_REQUEST.COMMENT, `${postId}`),
    params: { id: commentId },
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

export const useDeletePostComment = () => {
  const { postId } = useParams();
  const { refetch } = useFetchPostDetail(postId!);

  return useMutation({
    mutationFn: deletePostComment,
    onSuccess: () => refetch(),
  });
};
