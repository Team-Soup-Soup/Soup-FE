import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input } from '@soup/design-system';

import { LoginOption } from '~/features/login/ui';
import { type UserInfo } from '~/features/login/types';
import { useSubmit } from '~/features/login/model';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<UserInfo>();

  return (
    <form onSubmit={handleSubmit(useSubmit)}>
      <Input
        label="아이디"
        placeholder="아이디를 입력해주세요"
        className="mb-7"
        {...register('username', { required: '아이디를 입력하세요' })}
      />
      <Input
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        className="mb-3"
        {...register('password', { required: '비밀번호를 입력하세요' })}
      />
      <LoginOption className="mb-11" />
      <Button
        size="lg"
        className="bg-point hover:bg-point-dark auth-button font-semibold text-white"
        type="submit"
      >
        로그인 하기
      </Button>
    </form>
  );
}
