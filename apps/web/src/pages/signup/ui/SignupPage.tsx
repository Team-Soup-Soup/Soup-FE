import React from 'react';
import ArrowLeft from '~/assets/icons/chevron-left.svg';
import { SignupForm } from '~/features/signup/ui';

export default function SignupPage() {
  return (
    <div className="relative flex size-full flex-col">
      <div className="text-dark absolute left-4 top-4 flex items-center gap-x-4 font-light">
        <img
          src={ArrowLeft}
          className="size-10 cursor-pointer"
          onClick={() => window.history.back()}
        />
        회원가입
      </div>
      <SignupForm />
    </div>
  );
}
