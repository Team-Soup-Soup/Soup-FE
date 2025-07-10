import { useQuery } from '@tanstack/react-query';
import { REQUEST, userGet } from '~/shared/api';
import type { ShareLink } from '../types';

const fetchShareLink = async (projectId: number) => {
  const response = await userGet<ShareLink[]>({
    request: REQUEST.SHARE_LINK,
    params: {
      projectId: projectId,
    },
  });
  return response.data;
};

export const useFetchShareLink = (projectId: number) => {
  return useQuery({
    queryKey: ['shareLink', projectId],
    queryFn: () => fetchShareLink(projectId),
  });
};
