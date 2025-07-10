import React from 'react';
import { Checkbox } from '@soup/design-system';
import { cn } from '@soup/utils';
import { Link } from 'react-router-dom';
import { PATH } from '~/shared/constants';

export default function LoginOption({ className }: { className?: string }) {
  return (
    <div className={cn('flex w-full justify-between', className)}>
      <Checkbox id="rememberLogin" label="로그인 상태 유지" />
      <div className="flex gap-x-[42px]">
        <Link
          to={PATH.FIND_ID}
          className="text-light hover:text-dark cursor-pointer font-extralight"
        >
          아이디 찾기
        </Link>
        <Link
          to={PATH.FIND_PW}
          className="text-light hover:text-dark cursor-pointer font-extralight"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
