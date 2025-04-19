import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { cn } from '@soup/utils';

import type { Comment, ModalItem } from '~/shared/types';
import { useModal } from '~/shared/hooks';
import { MODAL } from '~/shared/constants';
import MoreIcon from '~/assets/icons/comment-more.svg';
import { getDate } from '~/shared/utils';

interface MoreOptionModal {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectPostComment({
  content,
  createAt,
  createBy,
  createUserProfile,
}: Comment) {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="hover:bg-lock rounded-auth relative cursor-pointer overflow-visible">
      <MoreOptionModal hidden={hidden} setHidden={setHidden} />
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
          {content}
        </div>
        <div
          className="h-full cursor-pointer"
          onClick={() => {
            setHidden((prev) => !prev);
          }}
        >
          <img src={MoreIcon} alt="more-icon" className="z-10" />
        </div>
      </div>
    </div>
  );
}

const MoreOptionModal = ({ hidden, setHidden }: MoreOptionModal) => {
  const { openModal } = useModal();

  const handleModal = (key: ModalItem) => {
    openModal(key);
  };

  const handleDeleteButton = () => {
    setHidden(true);
    handleModal(MODAL.DELETE_COMMENT);
  };

  return (
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
        onClick={handleDeleteButton}
      >
        삭제하기
      </button>
    </div>
  );
};
