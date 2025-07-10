import React, { type Dispatch, type SetStateAction, useState } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import type { BoardItem } from '~/shared/types';
import { BOARD, BOARD_LABEL, MODAL } from '~/shared/constants';
import { PATH } from '~/shared/constants';
import { getDate, getPath } from '~/shared/utils';
import { useModal } from '~/shared/hooks';

import { useFetchProjectBoardList } from '~/widgets/project/api';
import { CreatePostModal } from '~/features/project-board/ui';
import { Loader } from '~/assets/images';

export default function BoardContainer() {
  const [selected, setSelected] = useState<BoardItem>('01');
  return (
    <div className="h-menu-height flex min-w-[494px] flex-1 flex-col gap-y-4">
      <BoardView selected={selected} />
      <BoardButtons setSelected={setSelected} />
    </div>
  );
}

function BoardView({ selected }: { selected: BoardItem }) {
  const { projectId } = useParams();
  const { data, isLoading } = useFetchProjectBoardList({
    projectId: projectId!,
  });
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="rounded-auth border-main-board-border box-shadow-4 flex h-full flex-1 flex-col border-[1px] px-6 py-4">
      <div className="mb-4 flex items-center justify-between font-light">
        <span className="text-md">게시판</span>
        <span
          className="text-light hover:text-dark cursor-pointer"
          onClick={() => navigate(getPath(location.pathname, PATH.BOARD))}
        >
          더보기 &gt;&gt;
        </span>
      </div>
      <div className="flex size-full flex-col gap-y-[6px]">
        {data &&
          data.data.slice(0, 4).map(({ postId, category, title, createAt }) => (
            <button
              className="text-md flex h-fit w-full cursor-pointer justify-between gap-[16px] font-light focus:outline-none"
              key={postId}
              onClick={() =>
                navigate(getPath(location.pathname, `board/${postId}`))
              }
            >
              <div
                className="w-22 flex flex-shrink-0 items-center justify-center text-nowrap py-[1px]"
                style={{
                  backgroundColor: `${BOARD[category as BoardItem].color}`,
                }}
              >
                {BOARD[category as BoardItem].title}
              </div>
              <div className="w-full overflow-hidden text-ellipsis text-nowrap text-start">
                {title}
              </div>
              <div className="text-light flex">
                {getDate(createAt, 'YYYY.MM.DD')}
              </div>
            </button>
          ))}
        {data && data.count === 0 && (
          <div className="text-light grid size-full place-items-center font-light">
            게시판에 글이 없어요
          </div>
        )}
        {isLoading && (
          <div className="text-light grid size-full place-items-center font-light">
            <img src={Loader} className="h-16 w-14" />
          </div>
        )}
      </div>
      <CreatePostModal type={selected} />
    </div>
  );
}

const BoardButtons = ({
  setSelected,
}: {
  setSelected: Dispatch<SetStateAction<BoardItem>>;
}) => {
  const { openModal } = useModal();
  const handleClick = (label: BoardItem) => {
    openModal(MODAL.CREATE_POST);
    setSelected(label);
  };

  return (
    <div className="flex h-10 gap-x-2">
      {BOARD_LABEL.map((label) => (
        <BoardButton
          label={label}
          key={label}
          onClick={() => handleClick(label)}
        />
      ))}
    </div>
  );
};

const BoardButton = ({
  label,
  onClick,
}: {
  label: BoardItem;
  onClick: () => void;
}) => {
  return (
    <button
      className="rounded-auth border-main-board-border box-shadow-4 flex h-full min-w-fit flex-1 cursor-pointer justify-center gap-x-2 overflow-hidden text-nowrap border-[1px] p-2 font-light focus:outline-none"
      onClick={onClick}
    >
      <img src={BOARD[label].icon} alt={label} />
      {BOARD[label].title}
    </button>
  );
};
