import React from 'react';
import { Checkbox } from '@soup/design-system';
import { cn } from '@soup/utils';

export default function LoginOption({ className }: { className?: string }) {
  return (
    <div className={cn('flex w-full justify-between', className)}>
      <Checkbox id="rememberLogin" label="로그인 상태 유지" />
      <div className="flex gap-x-11">
        <a className="text-light hover:text-dark cursor-pointer font-light">
          아이디 찾기
        </a>
        <a className="text-light hover:text-dark cursor-pointer font-light">
          비밀번호 찾기
        </a>
      </div>
    </div>
  );
}
