import React from 'react';
import { SignupForm } from '~/features/signup/ui';
import { AuthHeader } from '~/shared/ui';

export default function SignupPage() {
  return (
    <div className="relative flex size-full flex-col">
      <AuthHeader title="회원가입" />
      <SignupForm />
    </div>
  );
}
