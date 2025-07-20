import { useQuery } from '@tanstack/react-query';
import { BOARD_REQUEST, userGet } from '~/shared/api';
import type { BoardContent } from '~/shared/types';

interface FetchProjectBoardListResponse {
  data: BoardContent[];
  count: number;
}

interface FetchProjectBoardListParams {
  projectId: string;
  page?: number;
  row?: number;
  keyword: string;
}

const fetchSearchResult = async ({
  keyword,
  projectId,
  page,
  row,
}: FetchProjectBoardListParams) => {
  const response = await userGet<FetchProjectBoardListResponse>({
    request: BOARD_REQUEST.POST,
    params: {
      word: keyword,
      projectId: Number(projectId),
      page: String(page),
      row: String(row),
    },
  });
  return response.data;
};

export const useFetchSearchResult = ({
  keyword,
  projectId,
  page,
  row,
}: FetchProjectBoardListParams) => {
  return useQuery<FetchProjectBoardListResponse, Error>({
    queryKey: ['searchResult', keyword],
    queryFn: () => fetchSearchResult({ keyword, projectId, page, row }),
  });
};
