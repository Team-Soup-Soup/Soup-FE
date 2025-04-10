import { useContext } from 'react';

import { SignupContext } from '~/features/signup/model';

export default function useSignupContext() {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error(
      'useSignupContext는 SignupProvider 안에서만 사용할 수 있어요.',
    );
  }
  return context;
}
