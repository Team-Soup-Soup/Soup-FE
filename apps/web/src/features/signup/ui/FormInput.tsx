import React from 'react';

import { Input } from '@soup/design-system';
import { cn } from '@soup/utils';

import { FORM, USER } from '~/features/signup/model';
import { FormInputProps } from '~/features/signup/types';

export default function FormInput({
  id,
  register,
  disabled = false,
  className = '',
  onChangeHandler,
}: FormInputProps) {
  const formConfig = FORM[id];
  return (
    <Input
      id={id}
      label={formConfig.label}
      placeholder={formConfig.placeholder}
      className={cn(
        formConfig.button ? 'flex-1' : 'w-full',
        disabled && 'text-main-board-border',
        className,
      )}
      type={USER[id]}
      disabled={!!disabled}
      {...register(USER[id], { required: true, onChange: onChangeHandler })}
    />
  );
}
