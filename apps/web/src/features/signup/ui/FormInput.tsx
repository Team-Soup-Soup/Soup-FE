import React from 'react';

import { Input } from '@soup/design-system';
import { cn } from '@soup/utils';

import { FORM, USER } from '~/features/signup/model';
import type { FormInputProps } from '~/features/signup/types';

export default function FormInput({
  id,
  register,
  disabled = false,
  className = '',
  onChangeHandler,
}: FormInputProps) {
  const { label, placeholder, button } = FORM[id];
  return (
    <Input
      id={id}
      label={label}
      placeholder={placeholder}
      className={cn(
        button ? 'flex-1' : 'w-full',
        disabled && 'text-main-board-border',
        className,
      )}
      disabled={!!disabled}
      showPasswordButton={id === 'PW'}
      {...register(USER[id], { required: true, onChange: onChangeHandler })}
    />
  );
}
