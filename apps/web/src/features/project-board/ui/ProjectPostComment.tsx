import React, { type Dispatch, type SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';

import { cn } from '@soup/utils';

import type { Comment } from '~/shared/types';
import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';
import MoreIcon from '~/assets/icons/comment-more.svg';
import { getDate } from '~/shared/utils';
import {
  useDeletePost,
  useDeletePostComment,
  useUpdatePostComment,
} from '~/features/project-board/api';
import { DeleteModal } from '~/shared/ui';
import { Button, Input } from '@soup/design-system';

interface MoreOptionModalProps {
  commentId: number;
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectPostComment({
  commentId,
  content,
  createAt,
  createBy,
  createUserProfile,
}: Comment) {
  const [hidden, setHidden] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);
  const [value, setValue] = useState<string>(content);
  const { mutate } = useUpdatePostComment();

  const handleUpdate = () => {
    mutate({ commentId: commentId, content: value });
    setUpdate((prev) => !prev);
  };

  return (
    <div className="hover:bg-lock rounded-auth relative cursor-pointer overflow-visible">
      <MoreOptionModal
        commentId={commentId}
        hidden={hidden}
        setHidden={setHidden}
        setUpdate={setUpdate}
      />
      <div className="text-md flex w-full gap-x-8 p-2">
        <img
          className="size-10 rounded-[50%]"
          src={
            createUserProfile === '-'
              ? '/images/user_profile.webp'
              : createUserProfile
          }
        />
        <div className="flex flex-1 flex-col gap-y-1">
          <div className="flex items-center gap-x-3">
            <span>{createBy}</span>
            <div className="text-light flex gap-x-2 text-sm font-light">
              <span>{getDate(createAt, 'YYYY.MM.DD')}</span>
              <span>{getDate(createAt, 'HH:mm')}</span>
            </div>
          </div>
          {update ? (
            <div className="flex h-14 w-full items-end gap-2">
              <Input
                id="comment-update"
                placeholder="댓글 수정하기"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mb-2 h-12 flex-1"
                inputClassName="bg-white"
              />
              <Button
                name="수정하기"
                size="sm"
                color="normal"
                className="h-12"
                onClick={handleUpdate}
              >
                수정하기
              </Button>
            </div>
          ) : (
            content
          )}
        </div>
        <div
          className="h-full cursor-pointer"
          onClick={() => setHidden((prev) => !prev)}
        >
          <img src={MoreIcon} alt="more-icon" className="z-10" />
        </div>
      </div>
    </div>
  );
}

const MoreOptionModal = ({
  commentId,
  hidden,
  setHidden,
  setUpdate,
}: MoreOptionModalProps) => {
  const { openModal } = useModal();
  const { postId } = useParams();
  const { mutate } = useDeletePostComment();
  const deletePost = useDeletePost().mutate;

  const deleteModalProp = {
    [MODAL.DELETE_COMMENT]: () => {
      mutate({ commentId: commentId, postId: postId! });
    },
    [MODAL.DELETE_POST]: () => {
      deletePost(postId!);
    },
  };

  const handleDeleteButton = () => {
    setHidden(true);
    openModal(MODAL.DELETE_COMMENT);
  };

  const handleUpdateButton = () => {
    setHidden(true);
    setUpdate((prev) => !prev);
  };

  return (
    <>
      <div
        className={cn(
          'border-main-board-border rounded-auth box-shadow-4 text-md z-20 flex w-36 flex-col border-[1px] bg-white px-2 py-6 font-light',
          hidden ? 'hidden' : 'absolute right-3 top-12',
        )}
      >
        <button className="hover:bg-normal-dark rounded-auth cursor-pointer p-2 transition duration-200 ease-in-out">
          답글달기
        </button>
        <button
          className="hover:bg-normal-dark rounded-auth cursor-pointer p-2 transition duration-200 ease-in-out"
          onClick={handleUpdateButton}
        >
          수정하기
        </button>
        <button
          className="hover:bg-normal-dark rounded-auth cursor-pointer p-2 transition duration-200 ease-in-out"
          onClick={handleDeleteButton}
        >
          삭제하기
        </button>
      </div>
      <DeleteModal deleteHandler={deleteModalProp} />
    </>
  );
};
