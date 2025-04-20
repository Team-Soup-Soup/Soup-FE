import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { BOARD_REQUEST, userDelete, userPost, userPut } from '~/shared/api';
import {
  CommentRequestType,
  CommentUpdateRequestType,
} from '~/features/project-board/types';
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

const updatePostComment = async (data: CommentUpdateRequestType) => {
  await userPut<CommentUpdateRequestType>({
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

export const useDeletePostComment = () => {
  const { postId } = useParams();
  const { refetch } = useFetchPostDetail(postId!);

  return useMutation({
    mutationFn: deletePostComment,
    onSuccess: () => refetch(),
  });
};

export const useUpdatePostComment = () => {
  const { postId } = useParams();
  const { refetch } = useFetchPostDetail(postId!);

  return useMutation({
    mutationFn: updatePostComment,
    onSuccess: () => refetch(),
  });
};
