import React from 'react';

import { useParams } from 'react-router-dom';

import { boardDetailedDataList } from '~/mocks';
import type {
  BoardItem,
  Comment,
  DetailedBoardContent,
  ModalItem,
} from '~/shared/types';
import { useModal } from '~/shared/hooks';
import { BOARD, MODAL } from '~/shared/constants';
import { getDate } from '~/shared/utils';

import { useFetchPostDetail } from '~/features/project-board/api';
import {
  ProjectPostComment,
  ProjectPostContent,
  ProjectCommentHeader,
} from '~/features/project-board/ui';

export default function ProjectPost() {
  const { postId } = useParams();
  const { data } = useFetchPostDetail(postId!);
  const { content, comments, category } = data || boardDetailedDataList[0];

  console.log(
    `postId: ${postId}\ncomment\n${comments.map((comment) => comment.content).join('\n')}`,
  ); /**페이지별 댓글 데이터가 공유되는 것 같아 참고 코드 작성해 두었습니다. 서버 쪽 오류로 추정, 오류 해결 시 삭제 예정 */

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
            <ProjectCommentHeader {...data} />
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
    </>
  );
}

const ProjectPostHeader = ({
  category,
  title,
  createAt,
  createBy,
  createUserProfile,
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
            <img
              className="size-10 rounded-[50%]"
              src={
                createUserProfile === '-' || createUserProfile === undefined
                  ? '/images/user_profile.webp'
                  : createUserProfile
              }
            />
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
