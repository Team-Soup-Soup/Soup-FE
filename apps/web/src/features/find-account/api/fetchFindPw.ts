import { REQUEST } from '~/shared/api/request';
import { post } from '~/shared/api/';
import { useMutation } from '@tanstack/react-query';

const fetchFindPw = async (username: string, email: string) => {
  const response = await post<{ userId: string; email: string }>({
    request: REQUEST.SEND_EMAIL_FIND_PW,
    data: { userId: username, email: email },
  });
  return response.data;
};

export const useFetchFindPw = (username: string, email: string) => {
  return useMutation({
    mutationFn: () => fetchFindPw(username, email),
  });
};
