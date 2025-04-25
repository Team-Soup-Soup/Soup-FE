import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { REQUEST, userGet } from '~/shared/api';
import { User } from '~/shared/types';

export const fetchJoinedUser = async (projectId: number) => {
  const response = await userGet<User[]>({
    request: REQUEST.FETCH_JOINED_USER_PROJECT,
    params: { projectId: projectId },
  });
  return response.data;
};

export const useFetchJoinedUser = () => {
  const { projectId } = useParams();

  return useQuery({
    queryKey: ['projectJoinedUser', projectId],
    queryFn: () => fetchJoinedUser(Number(projectId)),
    retry: 2,
    initialData: [],
  });
};
