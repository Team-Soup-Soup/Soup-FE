import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { type SignupInfo } from '~/features/signup/types';
import { USER } from '~/features/signup/model';

export type FormItem = keyof typeof USER;

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
