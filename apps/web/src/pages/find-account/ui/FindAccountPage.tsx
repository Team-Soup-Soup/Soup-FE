import React from 'react';
import { FindAccountForm } from '~/features/find-account/ui';
import { AuthHeader } from '~/shared/ui';

export default function FindAccountPage({ id }: { id: 'ID' | 'PW' }) {
  return (
    <div className="relative flex size-full flex-col p-16 pt-0">
      <AuthHeader title={id === 'ID' ? '아이디 찾기' : '비밀번호 찾기'} />
      <FindAccountForm id={id} />
    </div>
  );
}
