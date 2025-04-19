import React from 'react';

import { Button, Input } from '@soup/design-system';
import { useParams } from 'react-router-dom';

import { boardDetailedDataList } from '~/mocks';
import type {
  BoardItem,
  Comment,
  DetailedBoardContent,
  ModalItem,
} from '~/shared/types';
import {
  ProjectPostComment,
  ProjectPostContent,
} from '~/features/project-board/ui';
import { useModal } from '~/shared/hooks';
import { BOARD, MODAL } from '~/shared/constants';
import { DeleteModal } from '~/shared/ui';
import { getDate } from '~/shared/utils';
import { useFetchPostDetail } from '../api';

export default function ProjectPost() {
  const { postId } = useParams();
  const { data } = useFetchPostDetail(postId!);
  const { content, comments, category } = data || boardDetailedDataList[0];

  return (
    <>
      {data && (
        <div className="w-200 mt-30 scrollbar-hide mx-auto flex h-full flex-col overflow-visible md:w-[70%]">
          <ProjectPostHeader {...data} />
          <ProjectPostContent
            category={category as BoardItem}
            content={content}
          />
          <div className="flex size-full flex-col">
            <ProjectPostCommentHeader {...data} />
            <div className="flex-1">
              <div className="flex w-full flex-1 flex-col gap-y-6 overflow-visible pb-10">
                {comments.map((comment: Comment) => (
                  <ProjectPostComment {...comment} key={comment.commentId} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <DeleteModal />
    </>
  );
}

const ProjectPostHeader = ({
  category,
  title,
  createAt,
  createBy,
}: DetailedBoardContent) => {
  const { openModal } = useModal();
  const handleModal = (key: ModalItem) => {
    openModal(key);
  };

  return (
    <>
      <div className="mb-6 flex flex-col">
        <p className="text-light">{BOARD[category].title}</p>
        <p className="text-lg">{title}</p>
      </div>
      <div className="border-lock mb-8 flex w-full items-center justify-between border-b-[1px] pb-3">
        <div className="text-md flex w-fit items-center gap-x-4 font-light">
          <div className="flex items-center gap-x-4">
            <div className="size-10 rounded-[50%] bg-black" />
            <span>{createBy}</span>
          </div>
          <span className="text-light">{getDate(createAt, 'YYYY.MM.DD')}</span>
          <span className="text-light">{getDate(createAt, 'HH:mm')}</span>
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
