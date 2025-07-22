import { ErrorWithCause, post, REQUEST } from '~/shared/api';
import { UserInfo } from '~/features/login/types';
import { useMutation } from '@tanstack/react-query';
import { useFetchUserInfo, useModal } from '~/shared/hooks';
import { useSetAtom } from 'jotai';
import { getCookie, setCookie } from '~/shared/utils';
import { useNavigate } from 'react-router-dom';
import { ERROR_CODE, loginErrorAtom } from '../model';
import { MODAL, PATH } from '~/shared/constants';
import { useFetchProjectJoin } from '~/features/project/api';

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

export const useFetchUserLogin = () => {
  const { refetch: fetchUserInfo } = useFetchUserInfo();
  const { refetch: fetchProjectJoin } = useFetchProjectJoin();

  const navigate = useNavigate();
  const setLoginAtom = useSetAtom(loginErrorAtom);
  const { openModal } = useModal();

  return useMutation({
    mutationFn: (data: UserInfo) => fetchUserLogin(data),
    onSuccess: (data) => {
      setCookie('ACCESS_TOKEN', data.accessToken);
      setCookie('REFRESH_TOKEN', data.refreshToken);
      fetchUserInfo();

      if (getCookie('invitation')) {
        fetchProjectJoin();
      } else {
        navigate(PATH.HOME);
      }
    },
    onError: (error) => {
      const errorWithCause = error as ErrorWithCause;
      const errorCode = errorWithCause.cause.code;
      setLoginAtom((prev) => ({
        wrongCnt: prev.wrongCnt + 1,
        wrongType: ERROR_CODE[errorCode],
      }));
      openModal(MODAL.LOGIN_FAILED);
    },
  });
};
