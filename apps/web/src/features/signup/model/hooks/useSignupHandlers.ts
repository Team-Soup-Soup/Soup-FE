// useSignupHandlers.ts
import React, { useState } from 'react';

import { UseFormClearErrors, UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ERROR, USER } from '~/features/signup/model';
import { FormState, SignupInfo } from '~/features/signup/types';
import { PATH } from '~/shared/constants';
import {
  fetchEmailCode,
  fetchEmailCodeValidation,
  fetchIdValidation,
  fetchUserJoin,
} from '~/features/signup/api';
import { AxiosError } from 'axios';

interface SignupHandlerProps {
  setClicked: React.Dispatch<React.SetStateAction<FormState>>;
  setValid: React.Dispatch<React.SetStateAction<FormState>>;
  clearErrors: UseFormClearErrors<SignupInfo>;
  setError: UseFormSetError<SignupInfo>;
}

export default function useSignupHandlers({
  setClicked,
  setValid,
  clearErrors,
  setError,
}: SignupHandlerProps) {
  const navigate = useNavigate();
  const [authId, setAuthId] = useState<number | undefined>(undefined);

  const handleUsernameValidation = async (target: string) => {
    setClicked((prev) => ({
      ...prev,
      [USER.ID]: true,
    }));
    try {
      const isValid = await fetchIdValidation(target);
      setValid((prev) => ({ ...prev, [USER.ID]: isValid }));
      if (isValid) clearErrors(USER.ID);
      else setError(USER.ID, { message: ERROR.ID.AUTH_FAILURE });
    } catch {
      setError(USER.ID, {
        message: ERROR.ID.AUTH_EXCEPTION,
      });
    }
  };

  const handleEmailValidation = async (email: string) => {
    setClicked((prev) => ({
      ...prev,
      [USER.EMAIL]: true,
    }));
    const { authId } = await fetchEmailCode(email);
    setAuthId(authId);
  };

  const handleEmailCodeValidation = async (authCode: string) => {
    try {
      const isValid = await fetchEmailCodeValidation(authId!, authCode);
      setValid((prev) => ({ ...prev, [USER.EMAIL]: isValid }));
      if (isValid) clearErrors(USER.EMAIL);
      else setError(USER.EMAIL, { message: ERROR.EMAIL.AUTH_FAILURE });
    } catch {
      setError(USER.EMAIL, {
        message: ERROR.EMAIL.AUTH_EXCEPTION,
      });
    }
  };

  const handleFormSubmit = async (data: SignupInfo) => {
    try {
      const resCode = await fetchUserJoin({ ...data, authId: authId! });
      if (resCode === 200) navigate(PATH.LOGIN);
    } catch (error) {
      const { message } = error as AxiosError;
      alert(message);
    }
  };

  return {
    handleUsernameValidation,
    handleEmailValidation,
    handleEmailCodeValidation,
    handleFormSubmit,
  };
}
