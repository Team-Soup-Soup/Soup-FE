import React from 'react';
import { FindAccountForm } from '~/features/find-account/ui';
import { AuthHeader } from '~/shared/ui';

export default function FindIdPage() {
  return (
    <div className="relative flex size-full flex-col p-16 pt-0">
      <AuthHeader title="아이디 찾기" />
      <FindAccountForm id="ID" />
    </div>
  );
}
