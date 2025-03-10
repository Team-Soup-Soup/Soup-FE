import React, { useState } from 'react';

import { Input, Pagination, Radio } from '@soup/design-system';

import { BOARD, BOARD_LABEL } from '~/shared/constants';
import { ProjectBoardItem } from '~/features/project-board/ui';
import { BoardContent, BoardItem } from '~/shared/types';
import { boardDataList } from '~/mocks';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPath } from '~/shared/utils';

export default function ProjectBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const data = boardDataList;
  const currentLocation = location.pathname;

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-200 mt-25 mx-auto mb-11 flex h-full flex-col md:w-[70%]">
      <div className="mb-5 flex w-full flex-col items-start gap-y-2">
        <div className="text-lg">게시판</div>
        <div className="flex w-full justify-between">
          <div className="flex gap-x-10 xl:gap-x-16">
            {BOARD_LABEL.map((label: BoardItem) => (
              <Radio
                key={BOARD[label].title}
                id={BOARD[label].title}
                label={BOARD[label].title}
                checked={selected === label}
                onChange={() => setSelected(label)}
              />
            ))}
          </div>
          <Input
            isSearch
            value={value}
            onChange={handleSearch}
            searchHandler={() =>
              navigate(getPath(currentLocation, `search?q=${value}`))
            }
          />
        </div>
      </div>
      <div className="rounded-auth bg-lock text-md mb-4 flex w-full gap-x-8 px-6 py-[10px] font-light">
        <div className="w-25 text-nowrap px-[10px] py-1 text-center">
          카테고리
        </div>
        <div className="flex-1 px-[10px] py-1 text-start">제목</div>
        <div className="w-23 px-[10px] py-1 text-center">작성자</div>
        <div className="w-23 px-[10px] py-1 text-center">날짜</div>
        <div className="w-23 px-[10px] py-1 text-center">댓글</div>
      </div>
      <div className="relative flex size-full flex-col gap-y-1">
        {data.map((data: BoardContent) => {
          if (selected === '')
            return <ProjectBoardItem key={data.postId} {...data} />;
          if (data.category === selected)
            return <ProjectBoardItem key={data.postId} {...data} />;
          else return null;
        })}

        <div className="absolute bottom-0 flex h-fit w-full items-center justify-center">
          <Pagination
            current={1}
            showItem={10}
            showPage={5}
            total={60}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
