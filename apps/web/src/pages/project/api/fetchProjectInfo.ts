import { useQuery } from '@tanstack/react-query';
import { REQUEST, userGet } from '~/shared/api';
import { Project } from '~/shared/types';
import { getPath, setCookie } from '~/shared/utils';

const fetchProjectInfo = async (projectId: string) => {
  const response = await userGet<Project>({
    request: getPath(REQUEST.PROJECT, projectId),
  });
  return response.data;
};

export const useFetchProjectInfo = (projectId: string) => {
  return useQuery({
    queryKey: ['projectInfo', projectId],
    queryFn: () => fetchProjectInfo(projectId),
    enabled: false,
    select: (data) => {
      setCookie(`projectAuth${projectId}`, data.auth);
      return data;
    },
  });
};
