import React from 'react';
import { Input } from '@soup/design-system';
import { LoginOption } from '~/features/login/ui';

export default function LoginForm() {
  return (
    <>
      <Input
        label="아이디"
        placeholder="아이디를 입력해주세요"
        className="mb-7"
      />
      <Input
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        className="mb-3"
      />
      <LoginOption className="mb-11" />
      <button className="bg-point hover:bg-point-dark auth-button font-semibold text-white">
        로그인 하기
      </button>
    </>
  );
}
