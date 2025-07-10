import { REQUEST } from '~/shared/api/request';
import { get } from '~/shared/api/';
import { useQuery } from '@tanstack/react-query';

const fetchFindId = async (email: string) => {
  const response = await get({
    request: REQUEST.SEND_EMAIL_FIND_ID,
    params: { email: email },
  });
  return response.data;
};

export const useFetchFindId = (email: string) => {
  return useQuery({
    queryKey: ['findId'],
    queryFn: () => fetchFindId(email),
    enabled: false,
  });
};
