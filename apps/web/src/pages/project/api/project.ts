import { REQUEST, userGet } from '~/shared/api';
import { Project } from '~/shared/types';
import { getPath } from '~/shared/utils';

export const fetchProjectInfo = async (projectId: string) => {
  const response = await userGet<Project>({
    request: getPath(REQUEST.PROJECT, projectId),
  });
  return response;
};
