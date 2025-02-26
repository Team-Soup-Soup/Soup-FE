import type { FieldErrors, UseFormRegister } from 'react-hook-form';
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
  className?: string;
  errors?: boolean;
}

export interface FormUnitProps {
  id: FormItem;
  errors: FieldErrors<SignupInfo>;
  register: UseFormRegister<SignupInfo>;
}
