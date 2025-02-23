import type { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { type SignupInfo } from '~/features/signup/types';

export type FormItem = 'NAME' | 'ID' | 'EMAIL' | 'PW';

export type FormField = {
  label: string;
  placeholder: string;
  description: string | null;
  button: string | null;
};

export interface FormInputProps {
  id: FormItem;
  register: UseFormRegister<SignupInfo>;
  disabled?: boolean;
  labelClassName?: string;
}

export interface FormUnitProps extends FormInputProps {
  button?: boolean;
  watch?: UseFormWatch<SignupInfo>;
}

export interface VerificationStatus {
  isMainSubmitted: boolean;
  isSubSubmitted: boolean;
  isIdVerified: boolean;
  isEmailVerified: boolean;
}
