import React from 'react';
import { LoginContainer } from '~/widgets/login/ui';

export default function LoginPage() {
  return (
    <div className="flex size-full flex-col p-16">
      <p className="logo mb-8 text-center">soup</p>
      <LoginContainer />
    </div>
  );
}
