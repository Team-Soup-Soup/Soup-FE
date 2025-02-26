import React from 'react';

import { cn } from '@soup/utils';
import { FORM, UserProperty } from '../model';
import { formState, FormUnitProps, SignupInfoProp } from '../types';
import FormInput from './FormInput';
import { Button } from '@soup/design-system';

interface ButtonedUnitProps extends FormUnitProps {
  valid: formState;
  handler: () => void;
  isFormValid: (key: SignupInfoProp) => boolean;
}

export default function FormUnitWithButton({
  id,
  errors,
  valid,
  register,
  handler,
  isFormValid,
}: ButtonedUnitProps) {
  const formId = UserProperty[id] as 'username' | 'email';
  return (
    <div className="relative flex w-full items-end">
      <p
        className={cn(
          'font-light, absolute left-14 top-[1px] text-sm',
          valid[formId] ? 'text-point' : 'text-important',
        )}
      >
        {errors[UserProperty[id]]
          ? errors[UserProperty[id]]?.message
          : valid[formId] && '*인증 완료'}
      </p>
      <FormInput id={id} register={register} />
      <Button
        color="normal"
        size="sm"
        className="ml-3 h-[39px]"
        locked={!isFormValid(UserProperty[id])}
        type="button"
        onClick={handler}
      >
        {FORM[id].button}
      </Button>
    </div>
  );
}
