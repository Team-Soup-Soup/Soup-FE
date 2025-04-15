import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';

import { Button, Input } from '@soup/design-system';

import { LoginOption } from '~/features/login/ui';
import { type UserInfo } from '~/features/login/types';
import { fetchUserLogin } from '~/features/login/api';
import { userAtom } from '~/shared/atoms';
import { PATH } from '~/shared/constants';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<UserInfo>();
  const navigate = useNavigate();
  const setUserAtom = useSetAtom(userAtom);

  const handleFormSubmit = async (data: UserInfo) => {
    fetchUserLogin(data).then((response) => {
      setUserAtom(response);
      navigate(PATH.HOME);
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        id="LoginUserId"
        label="아이디"
        placeholder="아이디를 입력해주세요"
        className="mb-7"
        {...register('userId', { required: '아이디를 입력하세요' })}
      />
      <Input
        id="LoginPassword"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        className="mb-3"
        {...register('password', { required: '비밀번호를 입력하세요' })}
        showPasswordButton
      />
      <LoginOption className="mb-11" />
      <Button
        size="lg"
        className="bg-point hover:bg-point-dark auth-button rounded-[10px] font-semibold text-white"
        type="submit"
      >
        로그인 하기
      </Button>
    </form>
  );
}
