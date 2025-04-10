import { type ReactNode, useState } from 'react';

import { FormState } from '~/features/signup/types';
import { clickedState, SignupContext } from '~/features/signup/model';

export default function SignupProvider({ children }: { children: ReactNode }) {
  const [clicked, setClicked] = useState<FormState>(clickedState);
  const [valid, setValid] = useState<FormState>(clickedState);

  return (
    <SignupContext.Provider value={{ clicked, setClicked, valid, setValid }}>
      {children}
    </SignupContext.Provider>
  );
}
