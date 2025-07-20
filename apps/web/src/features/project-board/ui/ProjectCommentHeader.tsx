import React from 'react';

import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Input } from '@soup/design-system';

import { Button } from '~/shared/ui';
import { DetailedBoardContent } from '~/shared/types';
import { useSubmitPostComment } from '~/features/project-board/api';
import { CommentRequestType } from '~/features/project-board/types';

export default function ProjectPostCommentHeader({
  comments,
}: DetailedBoardContent) {
  const { mutate } = useSubmitPostComment();
  const { postId } = useParams();
  const { register, handleSubmit, reset } = useForm<CommentRequestType>({
    defaultValues: {
      postId: Number(postId),
      content: '',
      commentParentId: 0,
    },
  });

  const handleCommentSubmit = (data: CommentRequestType) => {
    mutate(data);
    reset();
  };

  return (
    <div className="mb-12 flex w-full flex-col gap-y-3">
      <p className="text-light text-sm font-light">댓글 {comments.length}개</p>
      <form
        className="flex items-end gap-x-6"
        onSubmit={handleSubmit(handleCommentSubmit)}
      >
        <Input
          id="comment"
          className="flex-1"
          placeholder="댓글 새로 달기"
          {...register('content', { required: true })}
        />
        <Button status="sub" className="h-[46px]" type="submit">
          전송하기
        </Button>
      </form>
    </div>
  );
}
