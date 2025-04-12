import React, { useState } from 'react';

import { Button, Input } from '@soup/design-system';

interface EmailVerificationProps {
  handler: (target: string) => void;
}

export default function EmailVerification({ handler }: EmailVerificationProps) {
  const [value, setValue] = useState<string>('');

  return (
    <div className="relative mt-1 flex w-full items-end">
      <Input
        id="emailVerification"
        placeholder="인증코드를 입력해주세요"
        className="flex-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button
        color="normal"
        size="sm"
        className="ml-3 h-[39px]"
        type="button"
        onClick={() => handler(value)}
      >
        인증 확인
      </Button>
    </div>
  );
}
