import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { type SignupInfo } from '~/features/signup/types';
import { USER } from '~/features/signup/model';
import { ChangeEvent } from 'react';

export type FormItem = keyof typeof USER;

export type FormField = {
  label: string;
  placeholder: string;
  description: string | null;
  button: string | null;
};

export type FormError = {
  ACTION_NOT_COMPLETED: string;
  AUTH_FAILURE: string;
  AUTH_EXCEPTION: string;
};

export type FormInputProps = {
  id: FormItem;
  register: UseFormRegister<SignupInfo>;
  disabled?: boolean;
  className?: string;
  errors?: boolean;
  onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type FormUnitProps = {
  id: FormItem;
  errors: FieldErrors<SignupInfo>;
  register: UseFormRegister<SignupInfo>;
  watch: UseFormWatch<SignupInfo>;
};
