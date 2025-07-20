import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Pagination, Radio } from '@soup/design-system';

import { useFetchProjectBoardList } from '~/widgets/project/api';

import { BOARD, BOARD_LABEL } from '~/shared/constants';
import { BoardContent, BoardItem } from '~/shared/types';
import { getPath } from '~/shared/utils';

import { ProjectBoardItem } from '~/features/project-board/ui';
import {
  PROJECT_BOARD_COLUMN,
  PROJECT_BOARD_ROW,
} from '~/features/project-board/model';
import { SearchIcon } from '~/assets/icons';

export default function ProjectBoard() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const { data } = useFetchProjectBoardList({
    projectId: projectId!,
    page,
    row: PROJECT_BOARD_ROW,
  });

  const location = useLocation();
  const currentLocation = location.pathname;

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleRadioChange = (label: string) => {
    setSelected((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  return (
    <div className="w-200 mt-25 mx-auto mb-11 flex h-full flex-col md:w-[70%]">
      <div className="mb-5 flex w-full flex-col items-start gap-y-2">
        <div className="text-lg">게시판</div>
        <div className="flex w-full justify-between">
          <div className="flex sm:gap-x-4 lg:gap-x-6 xl:gap-x-16">
            {BOARD_LABEL.map((label: BoardItem) => (
              <Radio
                key={BOARD[label].title}
                id={BOARD[label].title}
                label={BOARD[label].title}
                checked={selected.includes(label)}
                onChange={() => handleRadioChange(label)}
                multiple={true}
              />
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(getPath(currentLocation, `search?q=${value}`));
            }}
            className="group relative"
          >
            <input
              value={value}
              onChange={handleSearch}
              type="text"
              placeholder="검색어를 입력하세요"
              className="border-main-board-border group-focus:border-point focus:border-point size-full h-full w-full rounded-[10px] border p-[8px] pl-[38px] font-light focus:outline-none"
            />
            <SearchIcon
              width={20}
              height={20}
              color="currentColor"
              className="text-point absolute left-3 top-1/2 -translate-y-1/2 transform"
            />
          </form>
        </div>
      </div>
      <ProjectBoardHeader />
      <div className="relative flex size-full flex-col gap-y-1">
        {data &&
          data.data.map((data: BoardContent) => {
            if (selected.length === 0)
              return <ProjectBoardItem key={data.postId} {...data} />;
            if (selected.includes(data.category))
              return <ProjectBoardItem key={data.postId} {...data} />;
          })}
        {data && data.count === 0 && (
          <div className="text-light grid size-full place-items-center font-light">
            게시판에 글이 없어요
          </div>
        )}
        <div className="absolute bottom-0 flex h-fit w-full items-center justify-center bg-white">
          {data && data.count !== 0 && (
            <Pagination
              current={page}
              showItem={PROJECT_BOARD_ROW}
              showPage={PROJECT_BOARD_COLUMN}
              total={data?.count}
              onChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const ProjectBoardHeader = () => (
  <div className="rounded-auth bg-lock h-13 mb-4 grid w-full flex-shrink-0 grid-cols-[1fr_8fr_1fr_1fr_1fr] gap-x-8 overflow-hidden px-6 font-light">
    <div className="w-25 flex items-center text-nowrap px-[10px] text-center">
      카테고리
    </div>
    <div className="min-w-23 flex items-center px-[10px] text-start">제목</div>
    <div className="flex items-center text-nowrap px-[10px] text-center">
      작성자
    </div>
    <div className="flex items-center text-nowrap px-[10px] text-center">
      날짜
    </div>
    <div className="flex items-center text-nowrap px-[10px] text-center">
      댓글
    </div>
  </div>
);
