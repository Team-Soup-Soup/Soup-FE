import React from 'react';

import { Input } from '@soup/design-system';
import { cn } from '@soup/utils';

import { FORM, UserProperty } from '~/features/signup/model';
import { FormInputProps } from '../types';

export default function FormInput({
  id,
  register,
  disabled = false,
  labelClassName = '',
}: FormInputProps) {
  const formConfig = FORM[id];
  return (
    <Input
      id={id}
      label={formConfig.label}
      placeholder={formConfig.placeholder}
      labelClassName={labelClassName}
      className={cn(
        formConfig.button && 'flex-1',
        disabled && 'text-main-board-border',
      )}
      type={UserProperty[id]}
      disabled={!!disabled}
      {...register(UserProperty[id], { required: true })}
    />
  );
}
