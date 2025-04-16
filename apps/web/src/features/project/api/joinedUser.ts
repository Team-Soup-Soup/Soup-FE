import { REQUEST, userGet } from '~/shared/api';
import { User } from '~/shared/types';

export const fetchJoinedUser = async (projectId: number) => {
  const response = await userGet<User[]>({
    request: REQUEST.FETCH_JOINED_USER_PROJECT,
    params: { id: projectId },
  });
  return response.data;
};
