import React, { useState } from 'react';

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { Pagination } from '@soup/design-system';
import { ProjectBoardItem } from '~/features/project-board/ui';
import { getPath } from '~/shared/utils';
import { SearchIcon } from '~/assets/icons';
import { useFetchSearchResult } from '~/features/project-board/api';
import { BoardContent } from '~/shared/types';
import { PROJECT_BOARD_COLUMN, PROJECT_BOARD_ROW } from '../model';

export default function SearchResult() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const searchTerm = searchParams.get('q');

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const currentLocation = location.pathname.split('/search')[0];

  const { data, isLoading } = useFetchSearchResult({
    projectId: projectId!,
    page,
    row: PROJECT_BOARD_ROW,
    keyword: searchTerm!,
  });

  return (
    <div className="w-200 mt-25 mx-auto mb-11 flex h-full flex-col md:w-[70%]">
      <div className="mb-[50px] flex w-full flex-col items-start gap-y-2">
        <div className="text-lg">게시판</div>
        <div className="flex w-full items-end justify-between">
          <div className="font-light">
            <span className="text-dark text-lg">"{searchTerm}"</span>
            <span className="text-light text-md"> 에 관한 검색 결과에요.</span>
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
      <div className="mb-3 font-light">
        <span className="text-light">제목 검색 결과 </span>
        <span>{data?.count || 0}개</span>
      </div>
      <div className="relative flex size-full flex-col gap-y-1">
        {isLoading ? (
          <div className="flex size-full items-center justify-center">
            <div className="text-light">검색 중입니다...</div>
          </div>
        ) : data && data.data && data.data.length > 0 ? (
          data.data.map((data: BoardContent) => (
            <ProjectBoardItem key={data.postId} {...data} />
          ))
        ) : (
          <div className="text-light grid size-full place-items-center font-light">
            검색 결과가 없습니다.
          </div>
        )}
        {data && data.count > 0 && (
          <div className="absolute bottom-0 flex h-fit w-full items-center justify-center">
            <Pagination
              current={page}
              showItem={PROJECT_BOARD_ROW}
              showPage={PROJECT_BOARD_COLUMN}
              total={data.count}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
