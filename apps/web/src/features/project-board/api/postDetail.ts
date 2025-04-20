import { useQuery } from '@tanstack/react-query';
import { BOARD_REQUEST, userGet } from '~/shared/api';
import { DetailedBoardContent } from '~/shared/types';
import { getPath } from '~/shared/utils';

const fetchPostDetail = async (postId: string) => {
  const response = await userGet<DetailedBoardContent>({
    request: getPath(BOARD_REQUEST.POST, postId),
    params: {
      id: Number(postId),
    },
  });
  return response.data;
};

export const useFetchPostDetail = (postId: string) => {
  return useQuery<DetailedBoardContent, Error>({
    queryKey: ['postDetail', postId],
    queryFn: () => fetchPostDetail(postId),
    enabled: !!postId,
  });
};
