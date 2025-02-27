import React from 'react';

import { Button, Input } from '@soup/design-system';

export default function EmailVerification({
  handler,
}: {
  handler: () => void;
}) {
  return (
    <div className="relative mt-1 flex w-full items-end">
      <Input
        id="emailVerification"
        placeholder="인증코드를 입력해주세요"
        className="flex-1"
      />

      <Button
        color="normal"
        size="sm"
        className="ml-3 h-[39px]"
        type="button"
        onClick={handler}
      >
        인증 확인
      </Button>
    </div>
  );
}
