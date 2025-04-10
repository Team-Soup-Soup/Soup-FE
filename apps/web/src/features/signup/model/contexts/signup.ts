import { createContext } from 'react';

import type { FormState } from '~/features/signup/types';

export const SignupContext = createContext<{
  clicked: FormState;
  setClicked: React.Dispatch<React.SetStateAction<FormState>>;
  valid: FormState;
  setValid: React.Dispatch<React.SetStateAction<FormState>>;
} | null>(null);
