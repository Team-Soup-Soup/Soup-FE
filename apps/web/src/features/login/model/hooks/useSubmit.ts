import type { UserInfo } from '~/features/login/types';
import { fetchUserLogin } from '~/features/login/api';

export const useSubmit = async (data: UserInfo) => {
  const response = await fetchUserLogin(data);
  const { accessToken, refreshToken } = response;
  alert(`success. accessToken: ${accessToken}, refreshToken: ${refreshToken}`);
};
