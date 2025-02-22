import React from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@soup/design-system';

import { LoginOption } from '~/features/login/ui';
import { type UserInfo } from '~/features/login/types';
import { useSubmit } from '../model';

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
      <input
        className="bg-point hover:bg-point-dark auth-button font-semibold text-white"
        type="submit"
        value="로그인 하기"
      />
    </form>
  );
}
