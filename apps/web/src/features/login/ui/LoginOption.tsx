import React from 'react';
import { Checkbox } from '@soup/design-system';
import { cn } from '@soup/utils';
import { Link } from 'react-router-dom';

export default function LoginOption({ className }: { className?: string }) {
  return (
    <div className={cn('flex w-full justify-between', className)}>
      <Checkbox id="rememberLogin" label="로그인 상태 유지" />
      <div className="flex gap-x-11">
        <Link
          to=""
          className="text-light hover:text-dark cursor-pointer font-light"
        >
          아이디 찾기
        </Link>
        <Link
          to=""
          className="text-light hover:text-dark cursor-pointer font-light"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
