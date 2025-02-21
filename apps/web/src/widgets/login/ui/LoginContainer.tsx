import React from 'react';
import { LoginForm } from '~/features/login/ui';
import { SignupLink, SocialLogin } from '~/widgets/login/ui';

export default function LoginContainer() {
  return (
    <div className="relative flex size-full flex-col">
      <LoginForm />
      <SocialLogin />
      <SignupLink />
    </div>
  );
}
