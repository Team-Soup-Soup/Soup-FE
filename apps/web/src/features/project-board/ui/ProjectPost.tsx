import React from 'react';

import { Button, Input } from '@soup/design-system';
import { useParams } from 'react-router-dom';

import { boardDetailedDataList } from '~/mocks';
import type { Comment, DetailedBoardContent, ModalItem } from '~/shared/types';
import { ProjectPostComment } from '~/features/project-board/ui';
import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';
import { DeleteModal } from '~/widgets/modal/ui';

export default function ProjectPost() {
  const { postId } = useParams();
  const post: DetailedBoardContent = boardDetailedDataList[Number(postId) - 1];
  const { content, comments } = post;

  return (
    <>
      <div className="w-200 mt-30 mb-30 mx-auto mb-11 flex h-full flex-col overflow-hidden md:w-[70%]">
        <ProjectPostHeader {...post} />
        <div className="mb-25 text-md">{content}</div>
        <div className="flex size-full flex-col">
          <ProjectPostCommentHeader {...post} />
          <div className="h- scrollbar-hide flex size-full flex-1 flex-col gap-y-6 overflow-scroll">
            {comments.map((comment: Comment) => (
              <ProjectPostComment {...comment} key={comment.commentId} />
            ))}
          </div>
        </div>
      </div>
      <DeleteModal />
    </>
  );
}

const ProjectPostHeader = ({
  category,
  title,
  createAt,
  createdBy,
}: DetailedBoardContent) => {
  const { openModal } = useModal();
  const handleModal = (key: ModalItem) => {
    openModal(key);
  };

  return (
    <>
      <div className="mb-6 flex flex-col">
        <p className="text-light">{category}</p>
        <p className="text-lg">{title}</p>
      </div>
      <div className="border-lock mb-8 flex w-full items-center justify-between border-b-[1px] pb-3">
        <div className="text-md flex w-fit items-center gap-x-4 font-light">
          <div className="flex items-center gap-x-4">
            <div className="size-10 rounded-[50%] bg-black" />
            <span>{createdBy}</span>
          </div>
          <span className="text-light">
            {createAt.slice(0, 10).split('-').join('.')}
          </span>
          <span className="text-light">{createAt.slice(11, 16)}</span>
        </div>
        <span
          className="text-light hover:text-dark w-fit cursor-pointer text-nowrap text-sm"
          onClick={() => handleModal(MODAL.DELETE_POST)}
        >
          삭제
        </span>
      </div>
    </>
  );
};

const ProjectPostCommentHeader = ({ comments }: DetailedBoardContent) => (
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
