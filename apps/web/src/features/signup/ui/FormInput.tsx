import React from 'react';

import { Input } from '@soup/design-system';
import { cn } from '@soup/utils';

import { FORM, UserProperty } from '~/features/signup/model';
import { FormInputProps } from '~/features/signup/types';

export default function FormInput({
  id,
  register,
  disabled = false,
  className = '',
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
      type={UserProperty[id]}
      disabled={!!disabled}
      {...register(UserProperty[id], { required: true })}
    />
  );
}
