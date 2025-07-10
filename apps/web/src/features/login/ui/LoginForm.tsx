import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@soup/design-system';

import { LoginOption } from '~/features/login/ui';
import { type UserInfo } from '~/features/login/types';
import { useLogin } from '~/features/login/model';
import { cn } from '@soup/utils';

export default function LoginForm() {
  const { register, handleSubmit, watch } = useForm<UserInfo>();
  const { handleFormSubmit } = useLogin();
  const isFormValid = watch('userId') && watch('password');

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
        className="mb-[14px]"
        {...register('password', { required: '비밀번호를 입력하세요' })}
        showPasswordButton
      />
      <LoginOption className="mb-11" />
      <Button
        size="lg"
        disabled={!isFormValid}
        className={cn(
          'bg-point hover:bg-point-dark auth-button rounded-[10px] font-semibold text-white',
          !isFormValid &&
            'bg-lock text-light border-lock hover:bg-lock cursor-default',
        )}
        type="submit"
      >
        로그인 하기
      </Button>
    </form>
  );
}
