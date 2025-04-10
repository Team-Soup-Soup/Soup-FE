import React from 'react';
import { SignupProvider } from '~/features/signup/model';
import { SignupForm } from '~/features/signup/ui';
import { AuthHeader } from '~/shared/ui';

export default function SignupPage() {
  return (
    <SignupProvider>
      <div className="relative flex size-full flex-col">
        <AuthHeader title="회원가입" />
        <SignupForm />
      </div>
    </SignupProvider>
  );
}
