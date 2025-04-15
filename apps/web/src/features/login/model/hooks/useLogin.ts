import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { useModal } from '~/shared/hooks';
import { ErrorWithCause } from '~/shared/api';
import { MODAL, PATH } from '~/shared/constants';
import { userAtom } from '~/shared/atoms';

import { UserInfo } from '~/features/login/types';
import { fetchUserLogin } from '~/features/login/api';
import { loginErrorAtom, ERROR_CODE } from '~/features/login/model';

export default function useLogin() {
  const { openModal } = useModal();

  const navigate = useNavigate();
  const setUserAtom = useSetAtom(userAtom);
  const setLoginAtom = useSetAtom(loginErrorAtom);

  const handleFormSubmit = async (data: UserInfo) => {
    try {
      const response = await fetchUserLogin(data);
      setUserAtom(response);
      navigate(PATH.HOME);
    } catch (error: unknown) {
      const errorWithCause = error as ErrorWithCause;
      const errorCode = errorWithCause.cause.code;
      setLoginAtom((prev) => ({
        wrongCnt: prev.wrongCnt + 1,
        wrongType: ERROR_CODE[errorCode],
      }));
      openModal(MODAL.LOGIN_FAILED);
    }
  };

  return { handleFormSubmit };
}
