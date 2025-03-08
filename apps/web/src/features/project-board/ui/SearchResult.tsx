import React, { useState } from 'react';

import { Input, Pagination } from '@soup/design-system';
import { boardDataList } from '~/mocks';
import { ProjectBoardItem } from '~/features/project-board/ui';
import { BoardContent } from '~/shared/types';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getPath } from '~/shared/utils';

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState<string>('');
  const searchTerm = searchParams.get('q');
  const data = boardDataList;
  const baseUrl = location.pathname.split('/search')[0];

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  /* api 연동시 현재 구현해둔 Debounce 적용하여 검색 구현 예정입니다. */

  return (
    <div className="w-200 mt-25 mx-auto mb-11 flex h-full flex-col md:w-[70%]">
      <div className="mb-[50px] flex w-full flex-col items-start gap-y-2">
        <div className="text-lg">게시판</div>
        <div className="flex w-full items-end justify-between">
          <div className="font-light">
            <span className="text-dark text-lg">"{searchTerm}"</span>
            <span className="text-light text-md"> 에 관한 검색 결과에요.</span>
          </div>
          <Input
            isSearch
            value={value}
            onChange={handleSearch}
            searchHandler={() => {
              if (value.length > 0)
                navigate(getPath(baseUrl, `search?q=${value}`));
            }}
          />
        </div>
      </div>
      <div className="mb-3 font-light">
        <span className="text-light">제목 검색 결과 </span>
        <span>10개</span>
      </div>
      <div className="relative flex size-full flex-col gap-y-1">
        {data.map((data: BoardContent) => (
          <ProjectBoardItem key={data.postId} {...data} />
        ))}
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
