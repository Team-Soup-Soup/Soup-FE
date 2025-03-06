import { Button, Input } from '@soup/design-system';
import React from 'react';
import { useParams } from 'react-router-dom';
import { boardDetailedDataList } from '~/mocks';
import { Comment, DetailedBoardContent } from '~/shared/types';
import ProjectPostComment from './ProjectPostComment';

export default function ProjectPost() {
  const { postId } = useParams();
  const post: DetailedBoardContent = boardDetailedDataList[Number(postId) - 1];
  const { content, comments } = post;

  return (
    <div className="w-200 mt-30 mb-30 mx-auto mb-11 flex h-full flex-col md:w-[70%]">
      <PostHeader {...post} />
      <div className="mb-25 text-md">{content}</div>
      <div className="flex size-full flex-col">
        <PostCommentHeader {...post} />
        <div className="flex size-full flex-col gap-y-6 overflow-scroll">
          {comments.map((comment: Comment) => (
            <ProjectPostComment {...comment} key={comment.commentId} />
          ))}
        </div>
      </div>
    </div>
  );
}

const PostHeader = ({
  category,
  title,
  createAt,
  createdBy,
}: DetailedBoardContent) => (
  <>
    <div className="mb-6 flex flex-col">
      <p className="text-light">{category}</p>
      <p className="text-lg">{title}</p>
    </div>
    <div className="flex w-full items-center justify-between">
      <div className="border-lock text-md mb-8 flex w-full items-center gap-x-4 border-b-[1px] pb-3 font-light">
        <div className="flex items-center gap-x-4">
          <div className="size-10 rounded-[50%] bg-black" />
          <span>{createdBy}</span>
        </div>
        <span className="text-light">
          {createAt.slice(0, 10).split('-').join('.')}
        </span>
        <span className="text-light">{createAt.slice(11, 16)}</span>
      </div>
    </div>
  </>
);

const PostCommentHeader = ({ comments }: DetailedBoardContent) => (
  <>
    <div className="mb-12 flex w-full flex-col gap-y-3">
      <p className="text-light text-sm font-light">댓글 {comments.length}개</p>
      <div className="flex gap-x-6">
        <Input className="flex-1" placeholder="댓글 새로 달기" />
        <Button color="sub">전송하기</Button>
      </div>
    </div>
  </>
);
