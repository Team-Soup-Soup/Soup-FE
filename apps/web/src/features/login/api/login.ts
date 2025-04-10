import { post, REQUEST } from '~/shared/api';
import { UserInfo } from '~/features/login/types';

interface UserLoginResponse {
  token: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
  };
}

export const fetchUserLogin = async (data: UserInfo) => {
  const response = await post<UserInfo, UserLoginResponse>({
    request: REQUEST.LOGIN,
    data: data,
  });
  return response.data.token;
};
