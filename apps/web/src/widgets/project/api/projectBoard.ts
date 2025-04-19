import { useQuery } from '@tanstack/react-query';
import { BOARD_REQUEST, userGet } from '~/shared/api';
import { BoardContent } from '~/shared/types';

interface FetchProjectBoardListResponse {
  data: BoardContent[];
  count: number;
}

interface FetchProjectBoardListParams {
  projectId: string;
  page?: number;
  row?: number;
}

const fetchProjectBoardList = async ({
  projectId,
  page = 1,
  row = 10,
}: FetchProjectBoardListParams) => {
  const response = await userGet<FetchProjectBoardListResponse>({
    request: BOARD_REQUEST.POST,
    params: {
      projectId: Number(projectId),
      page: String(page),
      row: String(row),
    },
  });
  return response.data;
};

export const useFetchProjectBoardList = ({
  projectId,
  page = 1,
  row = 10,
}: FetchProjectBoardListParams) => {
  return useQuery<FetchProjectBoardListResponse, Error>({
    queryKey: ['projectBoardList', projectId, page, row],
    queryFn: () => fetchProjectBoardList({ projectId, page, row }),
    enabled: !!projectId,
  });
};
