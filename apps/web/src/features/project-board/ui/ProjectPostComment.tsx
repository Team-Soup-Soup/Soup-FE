import React, { useState } from 'react';
import { Comment } from '~/shared/types';
import MoreIcon from '~/assets/icons/comment-more.svg';
import { cn } from '@soup/utils';

export default function ProjectPostComment({ content, createAt }: Comment) {
  const [hidden, setHidden] = useState<boolean>(true);
  return (
    <div className="relative overflow-visible">
      <MoreOptionModal hidden={hidden} />
      <div className="text-md flex w-full gap-x-8 p-2">
        <div className="size-10 rounded-[50%] bg-black" />
        <div className="flex flex-1 flex-col gap-y-1">
          <div className="flex items-center gap-x-3">
            <span>키위새</span>
            <div className="text-light flex gap-x-2 text-sm font-light">
              <span>{createAt.slice(0, 10).split('-').join('.')}</span>
              <span>{createAt.slice(11, 16)}</span>
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

const MoreOptionModal = ({ hidden }: { hidden: boolean }) => (
  <div
    className={cn(
      'border-main-board-border rounded-auth box-shadow-4 text-md z-20 flex w-36 flex-col border-[1px] bg-white px-2 py-6 font-light',
      hidden ? 'hidden' : 'absolute right-3 top-12',
    )}
  >
    <button className="hover:bg-normal-dark rounded-auth cursor-pointer p-2 transition duration-200 ease-in-out">
      답글달기
    </button>
    <button className="hover:bg-normal-dark rounded-auth cursor-pointer p-2 transition duration-200 ease-in-out">
      삭제하기
    </button>
  </div>
);
