import { useQuery } from '@tanstack/react-query';
import { REQUEST, userGet } from '../api';
import type { UserInfo } from '../types';
import { setCookie } from '../utils';
import { useFetchToggleSetting } from '~/features/menu/api';

const fetchUserInfo = async () => {
  const response = await userGet<UserInfo>({
    request: REQUEST.FETCH_USER_INFO,
  });
  return response.data;
};

export const useFetchUserInfo = () => {
  const { refetch: fetchToggleSetting } = useFetchToggleSetting();

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: false,
    select: (data) => {
      setCookie('USER_ID', data.userId);
      setCookie('USER_NAME', data.name);
      setCookie('USER_PROFILE', data.profileFileData.url);
      fetchToggleSetting();
    },
  });
};
